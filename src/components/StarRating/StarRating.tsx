import React, { useState } from "react";
import "./StarRating.css";

interface StarProps {
	selected: boolean;
	onClick: () => void;
}

const Star: React.FC<StarProps> = ({ selected, onClick }) => {
	return (
		<span onClick={onClick} className={`star ${selected ? "selected" : ""}`}>
			{selected ? "★" : "☆"}
		</span>
	);
};

interface StarRatingProps {
	onClick: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ onClick }) => {
	const [rating, setRating] = useState(0);

	const handleClick = (newRating: number) => {
		setRating(newRating);
		onClick(newRating);
	};

	return (
		<div>
			{[1, 2, 3, 4, 5].map((star) => {
				const selected = rating >= star;
				return (
					<Star
						key={star}
						selected={selected}
						onClick={() => handleClick(star)}
					/>
				);
			})}
		</div>
	);
};

export default StarRating;
