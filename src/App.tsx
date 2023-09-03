import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import StudentHistoryPage from "./components/studentHistoryPage/studentHistoryPage";
import SignUpForm from "./components/signUp/signUp";
import LoginForm from "./components/Login/Login";
import { ToastContainer } from "react-toastify";
import LandingPage from "./pages/LandingPage/LandingPage";
import NavBar from "./components/navBar/navBar";
import Contact from "./pages/Contact/Contact";
import ResetPassword from "./pages/ResetPassword/resetPassword";
import SetNewPassword from "./pages/ResetPassword/setNewPassword";
import AllTutor from "./components/AllTutorComponent/AllTutor";
import Profile from "./components/profileDetails/profile";
import AllCoursesPage from "./pages/AllCourses/AllCourses";
import VerifyPage from "./pages/VerifyPage/Verify";
import Reminder from "./components/reminder/reminder";
import Calender from "./components/calender/calender";
import SavedReminder from "./components/savedReminder/savedReminder";
import CourseDetail from "./pages/courseDetails/courseDetail";
import Dashboard from "./components/Dashboard/Dashboard";
import PaymentSummaryPage from "./pages/paymentSummary/paymentSummary";
import RateCourses from "./pages/RateCourses/RateCourses";
import TutorRating from "./pages/RateTutor/RatingTutor";
import PaidCourses from "./pages/PaidCourses/PaidCourses";
import Auth from "./pages/Auth/Auth";
import NotFound from "./pages/NotFound/NotFound";
// import Dataprovider from "./useContext/index";
// import TutorCoursesPage from "./pages/TutorCoursesPage/TutorCoursesPage";
import {
	ProtectedRoute,
	ProtectedRouteTutor,
	ProtectedRouteStudent,
} from "../src/useContext/protectedRoute";
import DataProvider from "./useContext/index";
import StudentProfile from "./pages/StudentProfile/StudentProfile ";
import TutorNotification from "./pages/TutorPage/TutorPage";
import TutorCoursesPage from "./pages/TutorCoursePage/TutorCoursePage";
import UserProfile from "./pages/userprofile/UserProfile";
import Footer from "./components/Footer/Footer";

function App() {
	return (
		<React.Fragment>
			<DataProvider>
				<ToastContainer />
				<Router>
					{/* <NavBar/> */}
					<Routes>
						<Route path="/" element={<LandingPage />} />
						<Route path="/navbar" element={<NavBar />} />
						<Route path="/coursedetail/:id" element={<CourseDetail />} />
						<Route path="/contact_us" element={<Contact />} />
						<Route path="/sign-up" element={<SignUpForm />} />
						<Route path="/login" element={<LoginForm />} />
						<Route path="/reset-password" element={<ResetPassword />} />
						<Route path="/auth/social/:token?" element={<Auth />} />

						<Route path="/users/resetpassword" element={<SetNewPassword />} />
						<Route
							path="/tutor-profile"
							element={
								<ProtectedRouteTutor>
									<Profile onClick={undefined} />
								</ProtectedRouteTutor>
							}
						/>
						<Route
							path="/dashboard/:id?"
							element={
								<ProtectedRoute>
									<Dashboard />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/history-page"
							element={
								<ProtectedRouteStudent>
									<StudentHistoryPage />
								</ProtectedRouteStudent>
							}
						/>
						<Route
							path="/all-tutors/:id?"
							element={
								<ProtectedRoute>
									<AllTutor />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/all-courses"
							element={
								<ProtectedRoute>
									<AllCoursesPage />
								</ProtectedRoute>
							}
						/>
						<Route path="/verify" element={<VerifyPage />} />
						<Route
							path="/reminder"
							element={
								<ProtectedRoute>
									<Reminder />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/calender"
							element={
								<ProtectedRoute>
									<Calender />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/savedReminder"
							element={
								<ProtectedRoute>
									<SavedReminder />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/rate-course/:courseId"
							element={
								<ProtectedRouteStudent>
									<RateCourses />
								</ProtectedRouteStudent>
							}
						/>
						<Route
							path="/tutorRating/:tutorId"
							element={
								<ProtectedRouteStudent>
									<TutorRating />
								</ProtectedRouteStudent>
							}
						/>
						<Route
							path="/Payment-Summary"
							element={
								<ProtectedRouteStudent>
									<PaymentSummaryPage title={""} price={""} imageUrl={""} />
								</ProtectedRouteStudent>
							}
						/>
						<Route
							path="/paid-courses/:id"
							element={
								<ProtectedRouteStudent>
									<PaidCourses />
								</ProtectedRouteStudent>
							}
						/>
						<Route
							path="/paid-courses/:id"
							element={
								<ProtectedRouteStudent>
									<PaidCourses />
								</ProtectedRouteStudent>
							}
						/>

						<Route
							path="/bookings"
							element={
								<ProtectedRouteTutor>
									<TutorNotification />
								</ProtectedRouteTutor>
							}
						/>
						<Route path="/paid-courses/:id" element={<PaidCourses />} />
						<Route path="/bookings" element={<TutorNotification />} />
						<Route path="*" element={<NotFound />} />
						<Route path="/studentProfile" element={<StudentProfile />} />
						<Route
							path="/tutorCourse/:tutorId"
							element={<TutorCoursesPage />}
						/>
						<Route
							path="/studentProfile"
							element={
								<ProtectedRouteStudent>
									<StudentProfile />
								</ProtectedRouteStudent>
							}
						/>
						<Route
							path="/userprofile/:userid"
							element={
								<ProtectedRoute>
									<UserProfile />
								</ProtectedRoute>
							}
						/>
					</Routes>
				</Router>
				<Footer />
			</DataProvider>
		</React.Fragment>
	);
}

export default App;
