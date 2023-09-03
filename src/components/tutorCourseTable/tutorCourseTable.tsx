import React, { useState } from "react";
import { useSelector } from "react-redux";

interface TableProps {
	onEdit: (course: {
		image: string;
		name: string;
		tutor: string;
		price: number;
	}) => void;
	onDelete: (courseId: string) => void;
}

const Table: React.FC<TableProps> = ({ onEdit, onDelete }) => {
	const courses = useSelector((state: any) => state.courses);
	const [currentPage, setCurrentPage] = useState(1);
	const [coursesPerPage] = useState(5);

	// Logic for displaying current courses
	const indexOfLastCourse = currentPage * coursesPerPage;
	const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
	const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

	const handleEdit = (course: {
		image: string;
		name: string;
		tutor: string;
		price: number;
	}) => {
		onEdit(course);
	};

	const handleDelete = (courseId: string) => {
		onDelete(courseId);
	};

	// Logic for displaying page numbers
	const pageNumbers: number[] = [];
	for (let i = 1; i <= Math.ceil(courses.length / coursesPerPage); i++) {
		pageNumbers.push(i);
	}

	const handlePageChange = (pageNumber: number) => {
		setCurrentPage(pageNumber);
	};

	return (
		<div>
			<table>
				<thead>
					<tr>
						<th>Image</th>
						<th>Name</th>
						<th>Tutor</th>
						<th>Price</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{currentCourses.map(
						(course: {
							id?: any;
							image: any;
							name: any;
							tutor: any;
							price: any;
						}) => (
							<tr key={course.id}>
								<td>{course.image}</td>
								<td>{course.name}</td>
								<td>{course.tutor}</td>
								<td>{course.price}</td>
								<td>
									<button onClick={() => handleEdit(course)}>Edit</button>
									<button onClick={() => handleDelete(course.id)}>
										Delete
									</button>
								</td>
							</tr>
						)
					)}
				</tbody>
			</table>
			<div className="pagination">
				{pageNumbers.map((number) => (
					<span
						key={number}
						className={currentPage === number ? "active" : ""}
						onClick={() => handlePageChange(number)}
					>
						{number}
					</span>
				))}
			</div>
		</div>
	);
};

export default Table;
