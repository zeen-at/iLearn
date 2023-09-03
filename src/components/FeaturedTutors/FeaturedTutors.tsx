import React, { useEffect, useState } from "react";
import "./FeaturedTutors.css";
import { Link } from "react-router-dom";
import { apiGet } from "../../utils/api/axios";
import Profile from "../profileDetails/profile";
import { Modal } from "react-responsive-modal";
import Rating from "../Rating/Rating";
import { User } from "../../utils/Interfaces/index.dto";

const FeaturedTutors = () => {
	const [tutors, setTutors] = useState([]);
	const [profile, setProfile] = useState(false);
	// const [profileProps, setProfileProps] = useState("");

	const onOpenProfile = () => setProfile(true);
	const onCloseProfile = () => setProfile(false);
	useEffect(() => {
		const fetch = async () => {
			// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
			try {
				const response = await apiGet(`/users/feature-tutors?page=0&limit=10`);
				setTutors(response.data.tutorSorted);
			} catch (error) {
				console.log(error);
			}
		};
		void fetch();
	}, []);
	return (
		<>
			<div className="all_container">
				<div className="tutors-bar">
					<h4>Featured Tutors</h4>
					<p>
						<Link to="/all-tutors" className="see-all-tutors">
							See all
						</Link>
					</p>
				</div>
				<div className="tutor-details">
					{tutors.map((el: User) => {
						return (
							<div key={el.id} className="img-name">
								<Link to={`/dashboard/${el.id}`}>
									<button type="submit" onClick={onOpenProfile}>
										<div className="images">
											<img src={el.image} alt="" className="featured_image" />
										</div>
										<p className="names">{el.name}</p>
										<div className="cd-rating">
											<Rating
												rating={Number(el.rating)}
												image={""}
												color={""}
											/>
										</div>
									</button>
								</Link>
							</div>
						);
					})}
				</div>

				<Modal open={profile} onClose={onCloseProfile}>
					<Profile onClick={onCloseProfile} />
				</Modal>
			</div>
		</>
	);
};
export default FeaturedTutors;
