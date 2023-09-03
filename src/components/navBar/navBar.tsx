import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./navBar.css";
import { FaBars } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Notification from "../NotificationModal/Notification";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import ProfileModal from "../ProfileModal/ProfileModal";
import { useAuth } from "../../useContext";
import logo from "../../assets/logo.png";
import profilePic from "../../assets/profilepic.svg";

const NavBar = () => {
  const [Mobile, setMobile] = useState(false);
  const [notificationModal, setNotificationModal] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { user, loggedInUser } = useAuth();

  useEffect(() => {
    loggedInUser();
  }, []);

  const onOpenModal = () => {
    setNotificationModal(true);
  };

  const onCloseModal = () => setNotificationModal(false);

  const toggleModal = () => {
    setNotificationModal(!notificationModal);
  };

  const togglePopup = () => {
    setShowModal(!showModal);
  };
  const logout = () => {
    localStorage.clear();
  };
  const getSignature = localStorage.getItem("signature");

  return (
    <nav className="navbar">
      <div className="logotext">
        <img src={logo} />
        <h3>iLearn</h3>
      </div>

      <ul
        className={Mobile ? "nav-links-mobile" : "navlinks"}
        onClick={() => setMobile(false)}
      >
        {getSignature === null ? (
          <>
            <Link to={"/tutors"} className="nav-link">
              <li className="navbarUlList"> Tutors</li>
            </Link>

            <Link to={"/about"} className="nav-link">
              <li className="navbarUlList"> About Us</li>
            </Link>

            <Link to={"/login"} className="nav-link">
              <li className="navbarUlList"> Login</li>
            </Link>

            <Link to={"/getstarted"} className="nav-link">
              <li className="navbarUlList"> Get Started</li>
            </Link>
          </>
        ) : (
          <>
            <Link to={"/dashboard"} className="nav-link">
              <li className="navbarUlList"> Dashboard</li>
            </Link>

            <Link to={"/reminder"} className="nav-link">
              <li className="navbarUlList"> Reminder</li>
            </Link>
            <li className="navbarUlList">
              <button onClick={toggleModal}>Notification</button>
              <Modal
                open={notificationModal}
                onClose={onCloseModal}
                showCloseIcon={false}
                classNames={{ modal: "customModal" }}
                styles={{
                  overlay: { display: "none" },
                  closeButton: { display: "none" },
                  closeIcon: { display: "none" },
                }}
              >
                <Notification />
              </Modal>
            </li>
          </>
        )}
        <li className="navbarUlList">
          <button onClick={togglePopup}>
            {showModal && (
              <ProfileModal
                userName={user!.name}
                userEmail={user!.email}
                userPicture={user!.image}
                user={user}
              />
            )}
            <img
              src={user != null && user.image ? user.image : profilePic}
              className="profilepic"
            />
          </button>
        </li>
      </ul>

      <button className="mobile-menu-icon" onClick={() => setMobile(!Mobile)}>
        {Mobile ? <ImCross /> : <FaBars />}
      </button>
    </nav>
  );
};

export default NavBar;
