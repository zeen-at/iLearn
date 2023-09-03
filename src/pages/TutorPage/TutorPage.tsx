import { useState, useEffect } from "react";
import "./tutorPage.css";
import avatar from "../../assets/avatar.jpeg";

import { apiGet } from "../../utils/api/axios";

interface Student {
	name: string;
	email: string;
	image: string;
}
interface AvailableTime {
	availableTime: string[];
	availableDate: Date;
}
interface Request {
	id: string;
	pickedTime: string;
	availabilityId: string;
	student: Student;
	availableTime: AvailableTime;
}

const TutorNotification: React.FC = () => {
	const [notifications, setNotifications] = useState<Request[]>([]);

	const getNotification = async () => {
		try {
			const { data } = await apiGet(`/users/tutors/bookings`);
			setNotifications(data.bookings);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getNotification();
	}, []);

	new Date().toLocaleString("en-NG");
	return (
		<>
			<div className="tutor_container">
				<div className="tutor_notifications">
					{notifications.length !== 0 ? (
						notifications.map((request: Request) => (
							<div className="tutor_notification" key={request.id}>
								<div className="tutor_NotImgContainer">
									<img
										className="tutor_NotImgBody"
										src={request.student.image}
									></img>
								</div>
								<div className="tutor_title">
									<h2>Student Name: {request.student.name}</h2>
									<p className="date-time">Email: {request.student.email}</p>
									<p className="tutor_start_date">
										Selected Date:{" "}
										{
											new Date(request.availableTime.availableDate)
												.toLocaleString("en-NG")
												.split(",")[0]
										}
									</p>
									<p className="date-time">
										Selected Time: {request.pickedTime}
									</p>
								</div>
							</div>
						))
					) : (
						<h4>You have no bookings yet</h4>
					)}
				</div>
			</div>
		</>
	);
};

export default TutorNotification;
