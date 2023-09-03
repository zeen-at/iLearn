import { useState, useEffect } from "react";
import "./courseDetail.css";
import Rating from "../../components/Rating/Rating";
import { useNavigate, useParams } from "react-router-dom";
import { apiGet } from "../../utils/api/axios";
import { CourseModel } from "./interface";
import MakePayment from "../../components/Payments/MakePayment";
import { useAuth } from "../../useContext";
import LoaderRings from "../../components/Loader/LoaderRings";
interface Ratings {
	id: string;
	description: string;
	ratingValue: number;
}

const CourseDetail = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const [course, setCourse] = useState<CourseModel>();
	const [ratings, setRatings] = useState<Ratings[]>([]);

	const { user, loggedInUser, isPaid } = useAuth();

	// const [email, setEmail] = useState(user?.email);
	const params = useParams();
	useEffect(() => {
		const getCourseDetail = async () => {
			const { data } = await apiGet(`/courses/get-course/${params.id}`);
			setCourse(data.course);
			course?.rating;
			setRatings(data.course.course_ratings);
		};
		getCourseDetail();
		loggedInUser();
	}, []);

	const navigate = useNavigate();
	const goBack = () => {
		navigate(-1);
	};

	const makePayment = () => {
		setModalOpen(true);
	};

	return user == null || course == null ? (
		<LoaderRings />
	) : (
		<>
			<button className="cd-rate_course_arrowButton" onClick={goBack}>
				&#8249; Go Back
			</button>

			<div className="heading-border">
				<h1 className="cd-heading"> About the course</h1>
			</div>
			<div className="cd-container">
				<div
					className="cd-course-container"
					style={{
						backgroundImage: `url(
              ${course.course_image}
              )`,
					}}
				>
					<div className="course-overlay">
						<div className="course--container__content">
							<h2 className="cd-title">{course.title}</h2>
							<p className="cd-p">{course.description}</p>
							<div className="cd-rating">
								<Rating rating={course.rating} image={""} color={""} />
							</div>
							<p>
								Updated{" "}
								{course && new Date(course.createdAt).toLocaleString("en-NG")}
							</p>

							<h4>{`₦${Number(course.pricing).toLocaleString()}`}</h4>
						</div>
					</div>
				</div>

				<div className="cd-tutor-container">
					<h2 className="cd-tutor-title">About the Tutor</h2>
					<div className="cd-tutor-profile">
						<div className="tutor--image__container">
							<img
								className="tutor--image"
								src={course.tutor.image}
								alt="tutor"
							/>
						</div>
						<div className="cd-name-courses">
							<span className="cd-tutor-name">{course.tutor.name}</span>
							<span className="course-no">
								{course.tutorCoursesCount} Courses
							</span>
						</div>
					</div>
					<p className="cd-about-tutor">{course.description}</p>
				</div>

				<div className="cd-time-container">
					<div className="ratings-container">
						<p className="cd-ratings">Ratings</p>
						{ratings.length > 0 ? (
							ratings.map((rating) => (
								<>
									<hr />
									<div className="rating-body">
										<p className="rating-heading">Awesome Tutor</p>
										<p>{rating.description}</p>
									</div>
								</>
							))
						) : (
							<>
								<hr />
								<div className="rating-body">
									<p>This course has no rating yet </p>
								</div>
							</>
						)}
					</div>
				</div>
				<div className="cd-buttons">
					{isPaid === false ? (
						<button className="cal-button" onClick={makePayment}>
							Pay Now
						</button>
					) : (
						<button className="cal-button" disabled>
							Paid
						</button>
					)}

					<MakePayment
						course={course}
						openModal={modalOpen}
						closeModal={() => setModalOpen(false)}
						email={user.email}
					/>
				</div>
			</div>
		</>
	);
};
export default CourseDetail;
