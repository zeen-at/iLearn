import React, { useEffect, useState } from "react";
import "./RecommendedCourses.css";
import { Link } from "react-router-dom";
import { apiGet } from "../../utils/api/axios";
import { whiteStar } from "../../assets/index";
import { Button } from "antd";
import StudentCourse from "../Cards/course";
import Rating from "../Rating/Rating";
import { Course, TutorCourses } from "../../utils/Interfaces/index.dto";

const RecommendedCourses = () => {
  const category: string | null = localStorage.getItem("user");
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await apiGet(
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          `/users/recommended/${category}`
        );
        console.log(data);

        setCourses(data.recommendedCourse);
      } catch (error) {
        console.log(error);
      }
    };
    void fetchCourses();
  }, []);

  return (
    <>
      <div className="recommended-section">
        <div className="recommended-courses-bar">
          <h4 id="head_rec">Recommended Courses</h4>
          <p>
            <Link to="/all-courses" className="see-all-courses">
              See all
            </Link>
          </p>
        </div>

        <div className="parent-course-container">
          {courses.length === 0 ? (
            <p>No Courses found</p>
          ) : (
            courses.map((course: TutorCourses, index: number) => {
              return (
                <div key={course.id} className="allCourses_Cards">
                  <div className="all_courses_card">
                    {/* {course.course.slice(0, 6).map((c: any, index: number) => ( */}
                    <Link
                      to={`/coursedetail/${course.id}`}
                      className="all_coursesLink"
                    >
                      <div className="all_courses_details">
                        <div key={course.id} className="all_coursesHeader-img">
                          <img
                            className="all_courses-Img"
                            src={course.course_image}
                            alt="course_logo"
                          />
                        </div>
                        <div className="all_courses_features">
                          <h4>{course.title}</h4>
                          <p>{course?.tutor?.name}</p>
                          <h4>₦{Number(course.pricing).toLocaleString()}</h4>
                          <div className="all_coursesRating">
                            <p>
                              <Rating
                                rating={Number(course.rating)}
                                image={""}
                                color={"#ffb400"}
                              />
                            </p>
                            <span>({index})</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default RecommendedCourses;

// "/coursedetail/:id"
