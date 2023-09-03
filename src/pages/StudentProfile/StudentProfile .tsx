import React, { useEffect, useState } from "react";
import NavBar from "../../components/navBar/navBar";
import "./studentProfile.css";
import { FiLogOut } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import avatar from "../../assets/avatar.jpeg";
import { apiGet } from "../../utils/api/axios";

interface ProfileD {
	name: string;
	image: string;
	id: string;
}

const logout = () => {
	localStorage.clear();
};

const StudentProfile = () => {
	const [user, setUser] = useState<ProfileD>({
		name: "",
		image: "",
		id: "",
	});

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const { data } = await apiGet(`/users/profile`);
				console.log(data.userDetails);
				setUser(data.userDetails);
			} catch (error) {
				console.log(error);
			}
		};

		fetchUser();
	}, []);

	return (
		<div className="studentProfile__parent">
			<NavBar />
			<div className="studentProfile-card">
				<div className="studentProfile-border">
					<div className="studentProfile-detailsbox">
						<img src={user.image === "" ? avatar : user.image} alt="Image" />
						<p>{user.name === "" ? "user Name" : user.name} </p>
					</div>
					<div className="studentProfile-links">
						<div className="student-profile__link-div">
							<CgProfile
								style={{
									width: "25px",
									height: "25px",
								}}
							/>
							<Link
								to={`/userprofile/${user.id}`}
								className="studentProfile-link"
							>
								{" "}
								Edit profile
							</Link>
						</div>

						<div className="student-profile__link-div">
							<RiLockPasswordLine
								style={{
									width: "25px",
									height: "25px",
								}}
							/>
							<Link to="/users/resetpassword" className="studentProfile-link">
								{" "}
								Change password
							</Link>
						</div>

						<div className="student-profile__link-div">
							<FiLogOut
								style={{
									width: "25px",
									height: "25px",
								}}
							/>

							<Link
								to="/login"
								onClick={logout}
								className="studentProfile-link"
							>
								{" "}
								Logout
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default StudentProfile;
