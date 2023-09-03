import React, { Fragment } from "react";
import "./SubNavbar.css";
import searchIcon from "../../assets/searchIcon.svg";

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type Props = {
  name: string | undefined;
  welcome: string | undefined;
};

const SubNavbar = (props: Props) => {
  return (
    <Fragment>
      <div className="parent-container">
        <div className="welcome-box">
          <h3 className="welcome">{props.welcome}</h3>
          <h1 className="student-name">{props.name}</h1>
        </div>
        <div className="input-box">
          <img className="search-icon" src={searchIcon} alt="search-icon" />
          <input
            type="text"
            placeholder="Search"
            className="input-type-search"
          />
        </div>
      </div>
    </Fragment>
  );
};

export default SubNavbar;
