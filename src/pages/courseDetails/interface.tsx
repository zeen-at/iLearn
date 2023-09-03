export interface CourseModel {
  id: string;
  title: string;
  description: string;
  course_image: string;
  tutorId: string;
  pricing: string;
  category: string;
  course_material: string;
  rating: number;
  createdAt: Date;
  updatedAt: string;
  tutor: TutorModel;
  tutorCoursesCount: number;
}

export interface TutorModel {
  id: string;
  email: string;
  password: string;
  name: string;
  verified: string;
  salt: string;
  areaOfInterest: string;
  userType: string;
  image: string;
  rating: string;
  createdAt: string;
  updatedAt: string;
  location: string;
  about: string;
}

// export const initialTutorState = {
//     id: '',
//     email: '',
//     password: '',
//     name: '',
//     verified: '',
//     salt: '',
//     areaOfInterest: '',
//     userType: '',
//     image: '',
//     rating: '',
//     createdAt: '',
//     updatedAt: '',
//   }

// export const initialCourseState = {
//   id: '',
//   title: '',
//   description: '',
//   course_image: '',
//   tutorId: '',
//   pricing: '',
//   category: '',
//   course_material: '',
//   rating: '',
//   createdAt: '',
//   updatedAt: '',
//   tutor: initialTutorState
// }
