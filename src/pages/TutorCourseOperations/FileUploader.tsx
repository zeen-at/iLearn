import React, { ChangeEvent, useRef, useState } from "react";

const FileUploader = ({
	selectedImage,
	selectedMaterial,
	setSelectedImage,
	setSelectedMaterial,
	show,
	courseMaterial,
	submitForm,
	imageError,
	setImageError,
	isPdf,
	setPdf,
	pdfError,
	setPdfError,
	isImage,
	setImage,
}: any) => {
	const fileInput = useRef<HTMLInputElement>(null);
	const handleImageChange = (
		e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | any
	) => {
		const file = e.target.files[0];
		const supportedImageFormats = ["image/jpeg", "image/jpg", "image/png"];
		if (file !== undefined && file.size > 5242880) {
			setImage(true);
			setImageError("File size cannot exceed 5MB");
		} else if (
			file !== undefined &&
			!supportedImageFormats.includes(file.type)
		) {
			setImage(true);
			setImageError("unsupported file format");
		} else {
			setSelectedImage(e.target.files[0]);
			setImage(false);
		}
	};
	const handlePdfChange = (
		e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | any
	) => {
		const file = e.target.files[0];
		if (file !== undefined && file.size > 16971520) {
			setPdf(true);
			setPdfError("File size cannot exceed 16MB");
		} else if (file !== undefined && !["application/pdf"].includes(file.type)) {
			setPdf(true);
			setPdfError("unsupported file format");
		} else {
			setSelectedMaterial(e.target.files[0]);
			setPdf(false);
		}
	};

	return (
		<div className="file-uploader">
			<div className="imgContainer-tutor">
				<label>Upload course Image (*jpg *jpeg *png)</label>
				<input
					type="file"
					onChange={handleImageChange}
					className="tutorCourse-searchInput"

					// value={selectedImage}
					name="course_image"
				/>
				{isImage && <p style={{ color: "red" }}>{imageError}</p>}
			</div>
			<div className="imgContainer-tutor">
				<label>Upload course material (*pdf)</label>
				<input
					type="file"
					onChange={handlePdfChange}
					className="tutorCourse-searchInput"

					// value={selectedMaterial}
					name="course_material"
				/>
				{isPdf && <p style={{ color: "red" }}>{pdfError}</p>}
			</div>
			<button type="submit" onClick={submitForm} className="submitButton">
				Submit
			</button>
		</div>
	);
};

export default FileUploader;
