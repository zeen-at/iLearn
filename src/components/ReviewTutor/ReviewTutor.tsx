import React, { useEffect, useState } from "react";
import { apiGet } from "../../utils/api/axios";
import Rating from "../Rating/Rating";
import "./ReviewTutor.css";
import studentImage from "../../assets/avatar.jpeg";

interface ReviewTutorProps {
	tutorId: any;
}

const ReviewTutor: React.FC<ReviewTutorProps> = ({ tutorId }) => {
	const [review, setReview] = useState([]);

	const getReview = async () => {
		try {
			const response = await apiGet(`/users/tutors/${tutorId}/review`);
			setReview(response.data.tutorReviewInfo);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		void getReview();
	}, []);

	return (
		<>
			{review.length > 0 ? (
				review.map((data: any) => {
					return (
						<div className="tutor-review" key={data.id}>
							<div className="tutor-review-block" key={data.id}>
								<img
									src={
										data.student.image !== null
											? data.student.image
											: studentImage
									}
									alt=""
								/>
								<div className="tutor-review-write">
									<h3>{data.student.name}</h3>
									<Rating
										rating={data.ratingValue}
										color="#FD2959
"
										image=""
									/>
								</div>
							</div>
							<p>{data.description}</p>
						</div>
					);
				})
			) : (
				<h4>No Reviews yet</h4>
			)}
		</>
	);
};
export default ReviewTutor;
