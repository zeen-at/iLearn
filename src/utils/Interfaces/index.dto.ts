export interface PayLoad {
	email: string;
	password: string;
	interest: string;
	usertype: string;
}
export interface Courses {
	id: string;
	name: string;
	email: string;
	areaOfInterest: string;
	password: string;
	courses: [
		{
			"course-title": string;
			"course-id": number;
			"course-image_url": string;
			"course-rating": number;
		}
	];
}

export interface Course {
	id: string;
	courseId: string;
	title: string;
	description: string;
	rating: number;
	tutorId: string;
	pricing: string;
	category: string;
	course_image: string;
	course_material: string;
}
export interface User {
	id: string;
	email: string;
	name: string;
	verified: boolean;
	areaOfInterest: string;
	userType: string;
	image: string;
	rating: number;
	createdAt: Date;
	updatedAt: Date;
	about: string;
	courses: Course[];
}

export interface Tutor {
	id: string;
	email: string;
	name: string;
	verified: boolean;
	areaOfInterest: string;
	userType: string;
	image: string;
	rating: number;
	createdAt: Date;
	updatedAt: Date;
	about: string;
	courses: Course[];
}

// create interface for tutor to create, update and delete courses

export interface UserCourse {
	id: string;
	name: string;
	email: string;
	areaOfInterest: string;

	courses: [
		{
			course_image: "string";
			course_name: "string";
			tutor_name: "string";
			course_price: "string";
		}
	];
}
export interface TutorCourses {
	id: string;
	title?: string;
	description?: string;
	course_image?: string;
	tutorId?: string;
	pricing?: string;
	category?: string;
	course_material?: string;
	rating?: number;
	createdAt?: string;
	updatedAt?: string;
	tutor?: {
		id?: string;
		email?: string;
		password?: string;
		name?: string;
		verified?: boolean;
		salt?: string;
		areaOfInterest?: string;
		userType?: string;
		image?: string;
		rating?: number;
		createdAt?: string;
		updatedAt?: string;
	};
}
export const courseDetails = {
	id: "",
	title: "",
	description: "",
	course_image: "",
	tutorId: "",
	pricing: "",
	category: "",
	course_material: "",
	rating: "",
	createdAt: "",
	updatedAt: "",
	tutor: {
		id: "",
		email: "",
		password: "",
		name: "",
		verified: "",
		salt: "",
		areaOfInterest: "",
		userType: "",
		image: "",
		rating: "",
		createdAt: "",
		updatedAt: "",
	},
};
export interface Buttons {
	type?: "submit" | "reset" | "button";
	onClick?: () => void;
	title?: string;
	className?: string;
}
export interface CourseProps {
	course: Course;
	tutor?: Tutor;
	handleEditedClick: (course: Course) => Promise<void>;
	handleDeletedClick: (id: string) => Promise<void>;
}
export interface UploadFile<T = any> {
	uid: string;
	size?: number;
	name: string;
	fileName?: string;
	lastModified?: number;
	lastModifiedDate?: Date;
	url?: string;
	percent?: number;
	thumbUrl?: string;
	crossOrigin?: React.ImgHTMLAttributes<HTMLImageElement>["crossOrigin"];
	response?: T;
	error?: any;
	linkProps?: any;
	type?: string;
	xhr?: T;
	preview?: string;
}

