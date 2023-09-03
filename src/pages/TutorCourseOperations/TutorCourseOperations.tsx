import React, { ChangeEvent, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiPost, apiGet, apiUpdate } from "../../utils/api/axios";
import { User, UploadFile, Course } from "../../utils/Interfaces/index.dto";
import LoadingIcons from "react-loading-icons";
import FileUploaded from "../TutorCourseOperations/FileUploader";
import { FileUploads } from "../../components/TutorHome/TutorHome";
import "./tutorCourseOperations.css";
export interface CourseDetails {
	id?: string;
	title?: string;
	description?: string;
	category?: string;
	pricing?: string;
	image?: string;
	material?: string;
}
export const courseDetails: CourseDetails = {
	id: "",
	title: "",
	description: "",
	category: "",
	pricing: "",
	image: "",
	material: "",
};

const CourseManagement = ({
	tutor,
	course,
	tutorProps,
	onCloseProfile,
	show,
	courseMaterial,
	isEdit,
	setCourse,
	setIsEdit,
}: // selectedImage,
{
	tutor?: User;
	tutorProps?: any;
	course?: Course;
	courses?: CourseDetails | any;
	onCloseProfile: () => void;
	show?: Boolean;
	courseMaterial?: FileUploads;
	isEdit?: Boolean;
	setCourse?: any;
	setIsEdit?: any;
}) => {
	const [loading, setLoading] = useState<Boolean>(false);
	const [courses, setCourses] = useState<CourseDetails | any>(course);
	const [selectedImage, setSelectedImage] = useState<UploadFile[] | null>(null);
	const [selectedMaterial, setSelectedMaterial] = useState<
		UploadFile[] | null
	>();
	const [editImage, setEditImage] = useState<UploadFile[]>();
	const [editMaterial, setEditMaterial] = useState<UploadFile[]>();
	const [isTitle, setIsTitle] = useState<Boolean>(false);
	const [isDescription, setIsDescription] = useState<Boolean>(false);
	const [isCategory, setIsCategory] = useState<Boolean>(false);
	const [isPricing, setIsPricing] = useState<Boolean>(false);
	const [titleError, setTitleError] = useState("");
	const [descriptionError, setDescriptionError] = useState("");
	const [categoryError, setCategoryError] = useState("");
	const [pricingError, setPricingError] = useState("");
	const [imageError, setImageError] = useState<String>("");
	const [isImage, setImage] = useState<Boolean>(false);
	const [pdfError, setPdfError] = useState<String>("");
	const [isPdf, setPdf] = useState<Boolean>(false);
	const [isEditImage, setIsEditImage] = useState<Boolean>(false);
	const [isEditPdf, setIsEditPdf] = useState<Boolean>(false);

	const ref = useRef<HTMLInputElement>(null);
	const submitForm = async (e: any) => {
		e.preventDefault();
		if (courses.title === "") {
			setIsTitle(true);
			return setTitleError("Title cannot be empty");
		} else if (courses.description === "") {
			setIsDescription(true);
			return setDescriptionError("Description cannot be empty");
		} else if (
			courses.pricing === "" ||
			Number(courses.pricing) <= 0 ||
			isNaN(courses.pricing)
		) {
			setIsPricing(true);
			return setPricingError(
				"This field is required and must be a positive number"
			);
		} else if (courses.category === "") {
			setIsCategory(true);
			return setCategoryError("Category cannot be empty");
		} else if (isImage === true || isPdf === true) {
			return null;
		} else if (selectedImage === null) {
			setImage(true);
			return setImageError("Image field is required");
		} else if (selectedMaterial === undefined) {
			setPdf(true);
			return setPdfError("Course material is required");
		} else {
			setLoading(true);
			const formData = new FormData();
			formData.append("title", courses.title);
			formData.append("description", courses.description);
			formData.append("category", courses.category);
			formData.append("pricing", courses.pricing);
			formData.append("course_image", selectedImage as any);
			formData.append("course_material", selectedMaterial as any);
			try {
				const response = await apiPost("/courses/createCourse", formData);
				if (response.status === 200) {
					toast.success("File uploaded successfully");
					const { data } = await apiGet("/users/profile");

					tutorProps((previous: any) => (previous = data.userDetails));
					setCourses((previous: CourseDetails) => (previous = courseDetails));
					setLoading(false);
					onCloseProfile();
				} else if (response.status === 500) {
					setLoading(false);
				}
			} catch (error: any) {
				setLoading(false);
				toast.error(error.response.data.Error);
			}
		}
	};

	const submitEditedForm = async (e: any) => {
		e.preventDefault();
		if (
			courses.pricing === "" ||
			Number(courses.pricing) <= 0 ||
			isNaN(courses.pricing)
		) {
			setIsPricing(true);
			return setPricingError(
				"This field is required and must be a positive number"
			);
		} else if (isEditImage === true || isEditPdf === true) {
			return null;
		} else {
			setLoading(true);
			const formData = new FormData();
			formData.append("title", courses.title);
			formData.append("description", courses.description);
			formData.append("category", courses.category);
			formData.append("pricing", courses.pricing);
			formData.append("course_image", editImage as any);
			formData.append("course_material", editMaterial as any);
			try {
				const response = await apiUpdate(
					`/courses/updateCourse/${courses.id}`,
					formData
				);
				if (response.status === 200) {
					toast.success("Course updated successfully");
					const { data } = await apiGet("/users/profile");
					console.log("userdetails is ", data.userDetails);

					tutorProps((previous: any) => (previous = data.userDetails));
					setCourse((previous: CourseDetails) => (previous = courseDetails));
					setLoading(false);
					onCloseProfile();
				} else if (response.status === 500) {
					setLoading(false);
				}
			} catch (error: any) {
				setLoading(false);
				toast.error(error.response.data.Error);
			}
		}
	};

	const handleChange = (
		event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | any
	) => {
		event.preventDefault();
		const { name, value } = event.target;
		setCourses({ ...courses, [name]: value });
		setIsTitle(false);
		setIsDescription(false);
		setIsPricing(false);
		setIsCategory(false);
	};
	useEffect(() => {
		function handleClickOutside(
			event:
				| ChangeEvent<HTMLInputElement>
				| ChangeEvent<HTMLSelectElement>
				| any
		) {
			if (ref.current != null && !ref.current.contains(event.target)) {
				setCourse(courseDetails);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref]);

	return (
		<>
			{loading ? (
				<LoadingIcons.Rings
					stroke="#fd29593d"
					strokeOpacity={1}
					height={500}
					width={780}
				/>
			) : (
				<div className="tutor_formContainer" ref={ref}>
					<form className="crudForm">
						<label>Course Title</label>
						<input
							type="text"
							value={courses?.title}
							name="title"
							onChange={handleChange}
							className="tutorCourse-searchInput"
							required
							placeholder="Enter your course title"
						/>
						{isTitle === true ? (
							<div className="tutorError">{titleError}</div>
						) : null}
						<label>Description</label>
						<textarea
							value={courses?.description}
							name="description"
							onChange={handleChange}
							className="tutorCourse-searchInput"
							placeholder="Enter your course description"
						/>
						{isDescription === true ? (
							<div className="tutorError">{descriptionError}</div>
						) : null}
						<label>
							{" "}
							Price(<span>&#x20A6;</span>)
						</label>

						<input
							type="text"
							value={courses?.pricing}
							name="pricing"
							onChange={handleChange}
							className="tutorCourse-searchInput"
							placeholder="Enter your price here"
						/>
						{isPricing === true ? (
							<div className="tutorError">{pricingError}</div>
						) : null}
						<label> Category</label>
						<input
							type="text"
							value={courses?.category}
							name="category"
							onChange={handleChange}
							className="tutorCourse-searchInput"
							placeholder="Enter your category here"
						/>
						{isCategory === true ? (
							<div className="tutorError">{categoryError}</div>
						) : null}
						{/* For add course */}
						{isEdit !== true ? (
							<FileUploaded
								selectedImage={selectedImage}
								selectedMaterial={selectedMaterial}
								setSelectedImage={setSelectedImage}
								setSelectedMaterial={setSelectedMaterial}
								show={show}
								courseMaterial={courseMaterial}
								submitForm={submitForm}
								imageError={imageError}
								setImageError={setImageError}
								isPdf={isPdf}
								setPdf={setPdf}
								pdfError={pdfError}
								setPdfError={setPdfError}
								isImage={isImage}
								setImage={setImage}
							/>
						) : (
							<>
								<div>
									<div className="tutorImageContainer">
										<img
											className="tutorImageJpg"
											src={courses.course_image}
											alt="image"
										/>
									</div>

									<label style={{ cursor: "pointer", display: "flex" }}>
										<input
											// style={{ display: "none" }}
											className="tutorCourse-searchInput"
											type="file"
											onChange={(
												e:
													| ChangeEvent<HTMLInputElement>
													| ChangeEvent<HTMLSelectElement>
													| any
											) => {
												const file = e.target.files[0];
												const supportedImageFormats = [
													"image/jpeg",
													"image/jpg",
													"image/png",
												];
												if (file !== undefined && file.size > 5242880) {
													setIsEditImage(true);
													setImageError("File size cannot exceed 5MB");
												} else if (
													file !== undefined &&
													!supportedImageFormats.includes(file.type)
												) {
													setIsEditImage(true);
													setImageError(
														"unsupported file format, *jpeg, *jpg, and *png only"
													);
												} else {
													setImageError("");
													setIsEditImage(false);
													setEditImage(e.target.files[0]);
												}
											}}
											name="course_image"
										/>
									</label>
									{isEditImage && <p style={{ color: "red" }}>{imageError}</p>}
									{/* Change Image */}
								</div>
								<div>
									<p>{courses.course_material}</p>
									<label style={{ cursor: "pointer" }}>
										<input
											// style={{ display: "none" }}
											className="tutorCourse-searchInput"

											type="file"
											onChange={(
												e:
													| ChangeEvent<HTMLInputElement>
													| ChangeEvent<HTMLSelectElement>
													| any
											) => {
												const file = e.target.files[0];
												if (file !== undefined && file.size > 16971520) {
													setIsEditPdf(true);
													setPdfError("File size cannot exceed 16MB");
												} else if (
													file !== undefined &&
													!["application/pdf"].includes(file.type)
												) {
													setIsEditPdf(true);
													setPdfError("unsupported file format, *pdf only");
												} else {
													setEditMaterial(e.target.files[0]);
													setIsEditPdf(false);
												}
											}}
											name="course_image"
										/>
										{isEditPdf && <p style={{ color: "red" }}>{pdfError}</p>}

										{/* Change Material */}
									</label>
								</div>
								<button
									type="submit"
									onClick={submitEditedForm}
									className="submitButton"
								>
									Submit
								</button>
							</>
						)}
					</form>
				</div>
			)}
		</>
	);
};
export default CourseManagement;
