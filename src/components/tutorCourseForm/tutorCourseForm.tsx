import React, { useState } from "react";
// import { Style } from 'util';

interface FormProps {
	onSubmit: (course: {
		image: string;
		name: string;
		tutor: string;
		price: number;
	}) => void;
}
const Style = {
	form: {
		display: "flex",
		flexDirection: "column",
		width: "50%",
		maxWidth: "500px",
		margin: "0 auto",
		padding: "0px",
		border: "1px solid #ccc",
		borderRadius: "5px",
		backgroundColor: "green",
	},
};
const Form: React.FC<FormProps> = ({ onSubmit }) => {
	const [image, setImage] = useState("");
	const [name, setName] = useState("");
	const [tutor, setTutor] = useState("");
	const [price, setPrice] = useState(0);
	const [isEdit, setEdit] = useState(false);
	const [editCourse, setEditCourse] = useState({
		image: "",
		name: "",
		tutor: "",
		price: 0,
	});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onSubmit({ image, name, tutor, price });
		setImage("");
		setName("");
		setTutor("");
		setPrice(0);
	};

	const handleEdit = (course: {
		image: string;
		name: string;
		tutor: string;
		price: number;
	}) => {
		setEdit(true);
		setEditCourse(course);
		setImage(course.image);
		setName(course.name);
		setTutor(course.tutor);
		setPrice(course.price);
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label>Image:</label>
				<input
					type="text"
					value={image}
					onChange={(e) => setImage(e.target.value)}
				/>
			</div>
			<div style={{}}>
				<label>Name:</label>
				<input
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</div>
			<div>
				<label>Tutor:</label>
				<input
					type="text"
					value={tutor}
					onChange={(e) => setTutor(e.target.value)}
				/>
			</div>
			<div>
				<label>Price:</label>
				<input
					type="number"
					value={price}
					onChange={(e) => setPrice(parseInt(e.target.value))}
				/>
			</div>
			<button type="submit">{isEdit ? "Update course" : "Add course"}</button>
		</form>
	);
};

export default Form;
