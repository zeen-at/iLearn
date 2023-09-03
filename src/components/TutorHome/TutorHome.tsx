/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useState } from "react";
import { apiDelete, apiGet } from "../../utils/api/axios";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import CreateAvailability from "../../components/Availability/CreateAvailability";
import TutorAvailability from "../../components/Availability/ShowAvailabilty";
import { Modal } from "react-responsive-modal";
import avatar from "../../assets/avatar.jpeg";
import TutorCreateForm, {
	CourseDetails,
	courseDetails,
} from "../../pages/TutorCourseOperations/TutorCourseOperations";
import Card from "../Cards/course";
import Button from "../Button/Button";
import "./TutorHome.css";
import { User, Course } from "../../utils/Interfaces/index.dto";
import LoadingIcons from "react-loading-icons";
import { toast } from "react-toastify";
import TutorNotification from "../../pages/TutorPage/TutorPage";
import ReviewTutor from "../../components/ReviewTutor/ReviewTutor";

export interface FileUploads {
	image: string;
	material: string;
}
const TutorHeader = ({
	tutor,
	tutorProps,
}: {
	tutor: User;
	tutorProps: any;
}) => {
	const [available, setAvailability] = useState(false);
	const [loading, setLoading] = useState<Boolean>(false);
	const [course, setCourse] = useState<CourseDetails | any>(courseDetails);
	const [show, setShow] = useState<Boolean>(false);
	const [fileMaterials, setFileMaterials] = useState<FileUploads | any>({
		image: "",
		material: "",
	});
	const [isEdit, setIsEdit] = useState<Boolean>(false);

	const onOpenAvailability = () => setAvailability(true);
	const onCloseAvailability = () => setAvailability(false);
	const [profile, setProfile] = useState(false);
	const onOpenProfile = () => setProfile(true);
	const onCloseProfile = () => {
		setProfile(false);
	};

	const handleEditedClick = (course: Course) => {
		setIsEdit(true);
		onOpenProfile();
		setCourse(course);
		//  setCourses((previous: any) => (previous = course));
	};
	const handleDeletedClick = async (id: string) => {
		setLoading(true);
		try {
			const response = await apiDelete(`/courses/deleteCourse/${id}`);
			if (response.status === 204) {
				toast.success("Successfully deleted course");
				const { data } = await apiGet("/users/profile");
				tutorProps(data.userDetails);
				setLoading(false);
			}
		} catch (error: any) {
			toast.error(error.response.data);
		}
	};

	return (
		<>
			{loading ? (
				<LoadingIcons.Rings
					stroke="#fd29593d"
					strokeOpacity={1}
					height={500}
					width={1400}
				/>
			) : (
				<div className="tutorMainContainer">
					<div className="tutorHeader">
						<div className="tutorHeader-img">
							<img
								className="tutor-Img"
								src={tutor.image !== "" ? tutor.image : avatar}
								alt={tutor.image}
							/>
						</div>

						<div className="tutorHeader-title">
							<h2>{tutor.name}</h2>
							<p>{tutor.email}</p>
						</div>
					</div>

					<div className="tab-Container">
						<Tabs>
							<TabList>
								<Tab className={"react-tabs__tab"}>Overview</Tab>
								{/* <Link to= '../tutor-course-operations'> <Tab  className={'react-tabs__tab'}>Courses</Tab></Link> */}
								<Tab className={"react-tabs__tab"}>Courses</Tab>

								<Tab className={"react-tabs__tab"}>Reviews</Tab>
								<Tab className={"react-tabs__tab"}>Bookings</Tab>
							</TabList>
							<div>
								<TabPanel>
									<div className="tutor-overview__container">
										<div className="tutor-overview-details">
											<p>
												{tutor.about
													? tutor.about
													: "Kindly add description to your profile"}
											</p>
										</div>
										<div className="tutor-overview-schedule"></div>
										<div className="create-avail">
											<TutorAvailability
												id={tutor.id}
												tutor={tutor}
												title={"Set Availability"}
												onClick={onOpenAvailability}
											/>
										</div>
									</div>
								</TabPanel>
								<TabPanel>
									{/* Link to TutorCourseOperations page */}
									{/* <Link to="/tutor-course-operations"> */}
									<div className="tutorHome_addContainer">
										<Button
											type="submit"
											onClick={() => {
												onOpenProfile();
												setIsEdit(false);
											}}
											title={"Add Course"}
											className={"tutorHome_addButton"}
										/>
									</div>
									<Modal open={profile} onClose={onCloseProfile}>
										<TutorCreateForm
											tutor={tutor}
											tutorProps={tutorProps}
											course={course}
											onCloseProfile={onCloseProfile}
											show={show}
											isEdit={isEdit}
											courseMaterial={fileMaterials}
											setCourse={setCourse}
											setIsEdit={setIsEdit}
										/>
									</Modal>
									{/* </Link> */}
									<div className="tutor_home_courseCard">
										{tutor?.courses.length > 0 ? (
											tutor?.courses.map((course) => {
												return (
													<div
														className="tutor_home_singleCard"
														key={course.id}
													>
														<Card
															onClick={onOpenProfile}
															onClose={onCloseProfile}
															open={profile}
															course={course}
															tutor={tutor}
															handleDeletedClick={handleDeletedClick}
															handleEditedClick={() =>
																handleEditedClick(course)
															}
														/>
													</div>
												);
											})
										) : (
											<h4>
												You have no courses yet, click on the Add Course button
												to add a course.
											</h4>
										)}
									</div>
								</TabPanel>
								<TabPanel>
									<div className="review-class">
										<ReviewTutor tutorId={tutor.id} />
									</div>
								</TabPanel>
								<TabPanel>
									<TutorNotification />
								</TabPanel>
							</div>
						</Tabs>
					</div>
					<div>
						<Modal open={available} onClose={onCloseAvailability}>
							<CreateAvailability closeModal={onCloseAvailability} />
						</Modal>
					</div>
				</div>
			)}
		</>
	);
};

export default TutorHeader;
