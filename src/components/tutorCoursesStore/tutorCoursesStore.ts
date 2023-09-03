import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Course {
	id: string;
	image: string;
	name: string;
	tutor: string;
	price: number;
}

interface CoursesState {
	courses: Course[];
}

const initialState: CoursesState = {
	courses: [],
};

const coursesSlice = createSlice({
	name: "courses",
	initialState,
	reducers: {
		addCourse: (state, action: PayloadAction<Course>) => {
			state.courses.push(action.payload);
		},
		updateTutorCourse: (state, action: PayloadAction<Course>) => {
			const index = state.courses.findIndex((c) => c.id === action.payload.id);
			state.courses[index] = action.payload;
		},
		deleteTutorCourse: (state, action: PayloadAction<string>) => {
			state.courses = state.courses.filter((c) => c.id !== action.payload);
		},
	},
});

export const { addCourse, updateTutorCourse, deleteTutorCourse } =
	coursesSlice.actions;

export default coursesSlice.reducer;
