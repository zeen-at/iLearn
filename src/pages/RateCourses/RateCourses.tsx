import { useState, BaseSyntheticEvent, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import NavBar from "../../components/navBar/navBar";
import StarRatingComponent from "react-star-rating-component";
import "./RateCourses.css";
import { apiGet, apiPost } from "../../utils/api/axios";
import { toast } from "react-toastify";
import { FaChevronLeft } from "react-icons/fa";
import { courseDetails, Courses } from "../../utils/Interfaces/index.dto";



const RateCourses = () => {
	
	const [initialStar, setInitialStar] = useState(1);
	const [halfStar, setHalfStar] = useState(0)
	const [initialComment, setInitialComment] = useState({ comment: "" });
	const [courses, setCourse] = useState(courseDetails);

	const { courseId } = useParams();
	const navigate = useNavigate()

	const fetchCourseDetails = async () => {
		try {
			const response = await apiGet(`/courses/get-course/${courseId}`);
			setCourse(response.data.course);
		} catch (error: any) {
			toast.error(error);
		}
	};
	const clickedStar = (next: number, prev: number, name: string) => {
		setInitialStar((previous) => {
			return next;
		});
	};
	const selectHalfIcon = (next: number, prev: number, name: string) => {
		setHalfStar((previous) => {
			return prev+(0.5)
		})
	};

	const getInputValues = (event: BaseSyntheticEvent) => {
		event.preventDefault();
		const { name, value } = event.target;
		setInitialComment({ ...initialComment, [name]: value });
	};
	const submitDetails = async () => {
		try {
			const data = {
				ratingValue: initialStar,
				description: initialComment.comment,
			};
			setInitialComment({ comment: "" });
			setInitialStar((prev)=>prev=1)
			const res = await apiPost(`/courses/rate-courses/${courseId}`, data);
			navigate('/history-page')
			toast.success(res.data.message);
		} catch (error: any) {
			toast.error(error.response.data.message);
		}
	};
	useEffect(() => {
		void fetchCourseDetails();
	}, []);
	return (
		<>
			<NavBar />
			<div className="rate_course_container">
				<div className="rate_course_subNavbar">
				<Link className="back" to={"/history-page"}>
						<p>
							{" "}
							<span id="icon">
								<FaChevronLeft />
							</span>
							&nbsp; Back
						</p>
					</Link>
					<div className="rate_course_right">
						<h1>Rate Course</h1>
					</div>
				</div>
				<hr className="rate_course_line" />
				<div className="rate_course_body">
					<div className="rate_course_firstContainer">
						
							<div className="rate_course_titleDesc">
								<div className="rate_course_logo">
									<img
										className="rate_course_image"
										src={courses.course_image}
									/>
								</div>
								<div className="rate_course-subheading">
									<h6 className="rate_course_titleAndName">
										{courses.title} by {courses.tutor?.name}
									</h6>
									<span>{courses.description}</span>
								</div>
							</div>

						
					</div>
					<div className="rate_course_starContainer">
						<h3>Rate Course</h3>
						<StarRatingComponent
						renderStarIcon={() => <span className="rate_course_starComponent">★</span>}
							name="star"
							value={initialStar}
							onStarClick={clickedStar}
							editing={true}
						/>
					</div>
					<div className="rate_course_comment">
						<span>Comment</span>
						<textarea
							className="rate_course_textArea"
							name="comment"
							onChange={getInputValues}
							value={initialComment.comment}
							placeholder="Write your comment..."
						/>
						<button className="rate_course_sendButton" onClick={submitDetails}>
							Send
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default RateCourses;
