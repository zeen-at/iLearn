import React, { useEffect, useState } from "react";
import { apiGet, apiPost } from "../../utils/api/axios";
import StarRating from "../../components/StarRating/StarRating";
import "./RatingTutor.css";
import NavBar from "../../components/navBar/navBar";
import { Link, useParams, useNavigate } from "react-router-dom";

import { FaChevronLeft, FaRegEnvelope } from "react-icons/fa";
import { toast } from "react-toastify";

interface FormData {
	ratingValue: number;
	description: string;
}

const Card: React.FC = () => {
	const [formData, setFormData] = useState<FormData>({
		ratingValue: 0,
		description: "",
	});

	const [tutorDetails, setTutorDetails] = useState<any>({});
	const navigate = useNavigate()
	const { tutorId } = useParams();

	const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setFormData({ ...formData, [event.target.name]: event.target.value });
	};

	const handleSubmit = async () => {
	
		try {
			setFormData({ ratingValue: 0, description: "" });
			const postComment = await apiPost(
				`/users/tutors/${tutorId}/rate`,
				formData)
				navigate('/history-page');
			toast.success(postComment.data.message);
		} catch (error: any) {
			toast.error(error.response.data.message);
		}


	};

	useEffect(() => {
		const fetch = async () => {
			
			try {
				const response = await apiGet(`/users/atutordetail/${tutorId}`);
				setTutorDetails(response.data.message);
			} catch (error) {
				console.log(error);
			}
		};
		void fetch();
	}, []);

	const handleStarRatingClick = (rating: number) => {
		setFormData({ ...formData, ratingValue: rating });
	};

	return (
		<>
			<NavBar />
			<div className="tutorContainer">
				<div className="lineup">
					<Link className="back" to="/history-page">
						<p>
							{" "}
							<span id="icon">
								<FaChevronLeft />
							</span>
							&nbsp; Back
						</p>
					</Link>
					<h1 id="tutor">Rate Tutor</h1>
				</div>
				<hr />
				<div className="card">
					<div className="card-content">
						<img
							src={tutorDetails.image}
							width={80}
							height={80}
							alt="Tutor Picture"
							id="imageAvatar"
						/>
						<div id="tutorName">
							<h3>{tutorDetails.name}</h3>
							<p>
								<FaRegEnvelope />
								&nbsp;{tutorDetails.email}
							</p>
						</div>
					</div>
					<div className="card-footer">
						<StarRating
							onClick={handleStarRatingClick}
						/>
						<label id="page">Comment</label>
						<textarea
							name="description"
							className="ratingTextarea"
							rows={10}
							cols={60}
							onChange={handleChange}
							value={formData.description}
						/>
						<div className="submit-container">
							<button
								type="submit"
								className="submit-button"
								onClick={handleSubmit}
							>
								Submit
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default Card;


