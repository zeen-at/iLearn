/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { lazy, useEffect, useState } from "react";
import "../profileDetails/profile.css";
// import Ellipse4 from "../../assets/images/Ellipse 4.svg";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";
import { useParams } from "react-router-dom";
import { apiGet } from "../../utils/api/axios";
import TutorAvailability from "../Availability/ShowAvailabilty";
import { Modal } from "react-responsive-modal";
// import { Tutor } from "../../utils/Interfaces/index.dto";
import { toast } from "react-toastify";

const Profile = ({ onClick }) => {
	const [tutor, setTutor] = useState<any>({});
	const [modalIsOpen, setIsOpen] = useState(false);
	const params = useParams();

	function openModal() {
		setIsOpen(true);
	}
	function closeModal() {
		setIsOpen(false);
		onClick();
	}
	useEffect(() => {
		const fetch = async () => {
			const { data } = await apiGet(`/users/atutordetail/${params.id}`);
			console.log(data);
			setTutor(data.message);
		};
		void fetch();
	}, [params.id]);
	return (
		<>
			<body className="profile-body">
				<div className="profile-container">
					<div className="profile-head">
						<h2>Tutor Profile</h2>
						<h2>
							<button type="submit"></button>
						</h2>
					</div>
					<hr />
					<div className="profile-tutor">
						<img src={tutor?.image} alt="avatar" className="tutorAvatar" />
						<div className="profile-tutor-details">
							<h2>{tutor?.name}</h2>
							<p>
								{" "}
								<AiOutlineSafetyCertificate className="certify-icon" />{" "}
								Certified Tutor
							</p>
							<p>
								{" "}
								<CiLocationOn /> {tutor?.email}
							</p>
						</div>
					</div>
					<div className="profile-about">
						<h3>About</h3>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat
							quia id eum doloribus, unde aliquam. Magni, ratione. Magni vero
							animi id atque assumenda laudantium deserunt quam quisquam nam.
							Nostrum, culpa?
						</p>
					</div>
					<div className="profile-expertise">
						<h3>Expertise</h3>
						<div>
							<ul className="profile-expertise-list">
								<li>{tutor?.areaOfInterest}</li>
							</ul>
						</div>
					</div>
					<div className="availabilityButton">
						<button type="submit" onClick={openModal}>
							Availability
						</button>
						<Modal open={modalIsOpen} onClose={closeModal}>
							<TutorAvailability
								id={params?.id}
								tutor={tutor}
								title={"Book session"}
							/>
						</Modal>
					</div>
				</div>
			</body>
		</>
	);
};
export default Profile;
