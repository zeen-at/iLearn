import React, { useEffect, useState } from "react";
import NavBar from "../../components/navBar/navBar";
import SubNavbar from "../../components/SubNavbar/SubNavbar";
import "./TutorCoursePage.css";
import { apiGet } from "../../utils/api/axios";
import { Link, useParams } from "react-router-dom";
import Rating from "../../components/Rating/Rating";
import { BiArrowBack } from "react-icons/bi";

interface Course {
	id: string;
	title: string;
	description: string;
	course_image: string;
	pricing: number;
	rating: number;
}

const TutorCoursesPage: React.FC = () => {
	const [details, setDetails] = useState<Course[]>([]);

	const { tutorId } = useParams();

	useEffect(() => {
		async function getData() {
			const { data } = await apiGet(`/users/tutors/${tutorId}/course`);
			setDetails(data.courses);
		}
		void getData();
	}, []);
	return (
		<>
			<div className="contentPage">
				<NavBar />
				<SubNavbar name="" welcome="" />
				<p>
					<Link to="/all-tutors" className="coursesPage-icon">
						<BiArrowBack style={{ color: "black" }} /> Back
					</Link>
				</p>

				<div className="parent-course-container">
					{details.length > 0 ? (
						details.map((course: any, index: number) => {
							return (
								<div key={course.id} className="allCourses_Cards">
									<div className="all_courses_card">
										<div className="all_courses_details">
											<Link
												to={`/coursedetail/${course.id}`}
												style={{ textDecoration: "none", color: "black" }}
											>
												<div key={course.id} className="all_coursesHeader-img">
													<img
														className="all_courses-Img"
														src={course.course_image}
														alt="course_logo"
													/>
												</div>
												<div className="all_courses_features">
													<h2>
														{course.title} by {course?.tutor?.name}
													</h2>
													<p>{course.description}</p>
													<p className="">Price: {course.pricing}</p>
													<div className="all_coursesRating">
														<p>
															<Rating
																rating={Number(course.rating)}
																image={""}
																color={"#ffb400"}
															/>
														</p>
													</div>
												</div>
											</Link>
										</div>
									</div>
								</div>
							);
						})
					) : (
						<p> No courses yet </p>
					)}
				</div>
			</div>
		</>
	);
};

export default TutorCoursesPage;
