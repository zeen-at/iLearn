import React, { useEffect, useState } from "react";
import NavBar from "../../components/navBar/navBar";
import star from "../../assets/star.png";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";
import coloredStar from "../../assets/colored-star.png";
import "./AllTutor.css";
import { title } from "process";
import { apiGet } from "../../utils/api/axios";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "antd";
import { any } from "prop-types";
import Ellipse from "../../assets/images/Ellipse 4.png";
import Rating from "../Rating/Rating";
import avatar from "../../assets/tutorAvatar.jpg";
import { TutorModel } from "../../pages/courseDetails/interface";
import LoadingIcons from "react-loading-icons";
import { Modal } from "react-responsive-modal";
import Profile from "../profileDetails/profile";

const AllTutor = () => {
	// const [readMore, setReadMore] = useState(6);
	// const [openModal, setOpenModal] = useState(false);
	// const [show, setShow] = useState(false);
	const [tutors, setTutor] = useState<TutorModel[]>([]);
	const [oneTutor, setOneTutor] = useState({});
	const [keyword, setKeyword] = useState("");
	const [firstNos, setFirstNos] = useState(6);
	const [checkkeyword, setCheckKeyword] = useState(true);
	const [loading, setLoading] = useState<Boolean>(true);

	const [profile, setProfile] = useState(false);
	// const [profileProps, setProfileProps] = useState("");

	const onOpenProfile = () => setProfile(true);
	const onCloseProfile = () => setProfile(false);

	const navigate = useNavigate();
	const getAllTutor = async () => {
		try {
			const response = await apiGet("/users/all-tutors");
			if (response.status === 200) {
				setLoading(false);
				setTutor(response.data.findTutor);
				setSearchSubmitted(false);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getAllTutor();
	}, [checkkeyword]);

	const [searchSubmitted, setSearchSubmitted] = useState(false);

	const submitSearch = async () => {
		try {
			const response = await apiGet(`/users/all-tutors?query=${keyword}`);
			setTutor(response.data.findTutor);
			setSearchSubmitted(true);
			navigate(`/all-tutors/${keyword}`);
		} catch (error) {
			console.log(error);
		}
	};

	const handleKeypress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			submitSearch();
		}
	};

	const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
		setKeyword(e.currentTarget.value);
		submitSearch();
		if (keyword === "") {
			getAllTutor();
		}
	};
	return (
		<div>
			{loading ? (
				<LoadingIcons.Rings
					width={1400}
					height={700}
					strokeOpacity={1}
					stroke="#fd29593d"
				/>
			) : (
				<>
					<NavBar />

					<div className="allTutorsContainer">
						<div className="allTutors-header">
							<h1 className="all_tutorsHeading">All Tutors</h1>
							<div className="allTutor-inputField">
								<input
									className="unique_all_courses_search"
									type="text"
									value={keyword}
									placeholder="Search"
									onChange={handleChange}
									onKeyPress={(e) => handleKeypress(e)}
								/>
							</div>
						</div>
						<div className="allTutors-body">
							<h1 className="header-our-tutor">Our Tutors</h1>
							<div className="allTutors-cardContainer">
								{tutors.slice(0, firstNos).map((tutor, index) => (
									<div className="allTutors-card" key={index}>
										<div className="allTutor-img">
											<div className="all-tutorsImgContainer">
											<img
											className="all-tutorsImgBody"
												src={tutor.image ? tutor.image : avatar}
												alt="tutor.img"
											/>
											</div>
											<div className="allTutors-subBody">
												<div className="tutor-name-heading">
													<h3>{tutor.name}</h3>
												</div>
												<div className="tutor-name-heading">
													<h3>{tutor.email}</h3>
												</div>
												<div>
													<Rating
														rating={Number(tutor.rating)}
														image={""}
														color={""}
													/>
												</div>
												<Link to={`/tutorCourse/${tutor.id}`}>
													<div>
														<button type="submit">See courses</button>
													</div>
												</Link>
												<Link to={`/all-tutors/${tutor.id}`}>
													<div>
														<button className="tutors_ModalBtn" onClick={onOpenProfile} type="submit">
															Book Session
														</button>
													</div>
												</Link>
											</div>
										</div>
									</div>
								))}
							</div>
							<Modal open={profile} onClose={onCloseProfile}>
								<Profile onClick={onCloseProfile} />
							</Modal>
							{firstNos == 6 ? (
								<button
									className="seemoretutors"
									onClick={() => setFirstNos(100)}
								>
									see more
								</button>
							) : (
								<button
									className="seemoretutors"
									onClick={() => setFirstNos(6)}
								>
									see less
								</button>
							)}
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default AllTutor;
