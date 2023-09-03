import React from "react";
import Modal from "../Modal/Modal";
import "./ProfileModal.css";
// import ellipse from "../../assets/ellipse.svg";
import avatar from "../../assets/avatar.jpeg";
import { BiCategory } from "react-icons/bi";
import { RiAccountCircleLine } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { GrBook } from "react-icons/gr";
import { Link } from "react-router-dom";
import studentHistoryPage from "../studentHistoryPage/studentHistoryPage";
import { User } from "../../utils/Interfaces/index.dto";

interface Props {
	userName: string;
	userEmail: string;
	userPicture: string;
	user: any;
}
const logout = () => {
	localStorage.clear();
};

const ProfileModal: React.FC<Props> = ({
	userName,
	userEmail,
	userPicture,
	user,
}) => {
	return (
		<div className="profile-modal-container">
			<Modal>
				<div className="profile-modal">
					<div className="profile-profile">
						<img
							src={userPicture === "" ? avatar : userPicture}
							alt=""
							className="modal-profile-pic"
						/>
						<div className="profile-name">
							<p className="user-name">{userName}</p>
							<p className="user-email">{userEmail}</p>
						</div>
					</div>
					<div className="profile-line"></div>
					<div className="list">
						<ul>
							<li>
								<div className="category">
									<BiCategory className="bicategory" />
									<Link to={"/category"} className="categories">
										<li>Category</li>
									</Link>
								</div>
							</li>
							<li>
								<div className="mycourses-div">
									{user.userType === "Student" ? (
										<>
											<GrBook className="book-logo" />
											<Link
												to={"/history-page"}
												className="mycourses"
												onClick={studentHistoryPage}
											>
												<li>My Courses</li>
											</Link>
										</>
									) : null}
								</div>
							</li>
							<div className="group">
								<li>
									<div className="account-div">
										<RiAccountCircleLine className="account-logo" />
										<Link to={"/studentProfile"} className="account">
											<li>Account</li>
										</Link>
									</div>
								</li>
								<li>
									<div className="logout-div">
										<FiLogOut className="logout-logo" />
										<Link to={"/login"} className="logout" onClick={logout}>
											<li> Logout</li>
										</Link>
									</div>
								</li>
							</div>
						</ul>
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default ProfileModal;
