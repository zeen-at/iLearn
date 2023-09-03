import  { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import "./student.css";
import { apiGet } from "../../utils/api/axios";
import NavBar from "../navBar/navBar";
import ProgressBar from "../ProgressBar/ProgressBars";

const StudentHistoryPage = () => {
  const [courses, setCourses] = useState<any>([]);
 
   useEffect(() => {
    const getHistory = async () => {
      try {
        const { data } = await apiGet("/users/students/courses");
        console.log(data);
        setCourses(data.courses);
      } catch (error) {
        console.log(error);
      }
    };
    getHistory();
  }, []);

  return (
    <>
      <div>
        <NavBar />
        <div className="header">
          <div className="all-courses-header">
            <h2 className="all_courses_heading">My Courses</h2>
          </div>
        </div>
        <div className="all-courses-container">
          {courses.map((course: any, index: number) => {
            return (
              <div>
                <div key={index} className="all-courses-card-container">
                  <div className="">
                    <div className="all-courses-pro">
                      <Link className="Link" to={`/paid-courses/${course.courseId}`}>
                        <img
                          src={course.course.course_image}
                          alt=""
                          className="all-img-courses-container"
                        />
                      </Link>
                      <div className="card-details">
                        <div className="subj">
                          <div className="subje">
                            <Link
                              className="Link"
                              to={`/paid-courses/${course.courseId}`}
                            >
                              <h3>
                                <b>
                                  <h3 className="courses-titles">
                                    {course.course.title}
                                  </h3>
                                  <br />
                                </b>
                              </h3>
                            </Link>
                          </div>
                          <div>
                            <Link to={`/tutorRating/${course.tutorId}`}>
                              <button className="rate-btn-turo" type="submit">
                                {" "}
                                Rate Tutor
                              </button>
                            </Link>
                            <Link to={`/rate-course/${course.courseId}`}>
                              {" "}
                              <button id="rate-course-btn" type="submit">
                                {" "}
                                Rate Course
                              </button>
                            </Link>
                          </div>
                        </div>
                        
                        <div className="student-details">
                          <ProgressBar myProp={course.progress} />
                          <h3 className="courses-description">
                            {course.progress}%
                          </h3>
                          <p className="progress-bar-name">Your progress</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default StudentHistoryPage;
