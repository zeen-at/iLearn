/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useState, useEffect, useContext } from "react";
import FeaturedTutors from "../FeaturedTutors/FeaturedTutors";
import RecommendedCourses from "../RecommendedCourses/RecommendedCourses";
import SubNavbar from "../SubNavbar/SubNavbar";
import NavBar from "../navBar/navBar";
import "./Dashboard.css";
import TutorHome from "../TutorHome/TutorHome";
import LoadingIcons from "react-loading-icons";
import { apiGet } from "../../utils/api/axios";
import { User } from "../../utils/Interfaces/index.dto";
import { useAuth } from "../../useContext";
// import Profile from "../profileDetails/profile";

const Dashboard = () => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<Boolean>(true);


  const getDashboard = () => {
    if (user?.userType === "Student") {
      return (
        <div className="container">
          <FeaturedTutors />
          <RecommendedCourses />
        </div>
      );
    }
    if (user?.userType === "Tutor") {
      return (
        <>
          <TutorHome tutor={user} tutorProps={setUser} />
        </>
      );
    }
  };

  const setNavbarText = () => {
    if (user?.userType === "Student") {
      return {
        username: user?.name || "John Doe",
        welcomeText: "welcome",
      };
    } else {
      return {
        username: undefined,
        welcomeText: undefined,
      };
    }
  };

  // <Profile id= {}/>

  useEffect(() => {
    const loggedInUser = async () => {
      const { data } = await apiGet("/users/profile");
      setUser(data.userDetails);
      setLoading(false);
    };

    void loggedInUser();
  }, []);
  return (
    <div>
      <NavBar />
      <SubNavbar
        name={setNavbarText().username}
        welcome={setNavbarText().welcomeText}
      />
      {loading ? (
        <LoadingIcons.Rings
          stroke="#fd29593d"
          strokeOpacity={1}
          height={500}
          width={1400}
        />
      ) : (
        <>{getDashboard()}</>
      )}
    </div>
  );
};

export default Dashboard;
