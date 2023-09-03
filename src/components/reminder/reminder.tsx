import React from "react";
import woman from "../../assets/woman.svg";
import { Link } from "react-router-dom";
import "./reminder.css";
import NavBar from "../navBar/navBar";
const ReminderPage = () => {
	return (
		<>
			<NavBar />
			<div className="reminder-container">
				<div className="reminderBody">
					<div className="reminder-header">
						<p className="firstChild">
							Improve and measure your skills with study reminder
						</p>
						<p className="secondChild">
							Set reminder in your application and save time automation
							tracking.
						</p>
					</div>
					<div className="reminder-image-container">
						<img className="reminder-image" src={woman} alt="woman-calendar" />
					</div>
					<div className="btn">
						<Link to="/calender" className="btn-link">
							Set Reminder
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default ReminderPage;
