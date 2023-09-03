import React, { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import { apiGet, apiPutFormData } from "../../utils/api/axios";
import CreateCourse from "../../components/tutorCreateCourseModal/createCourse";
import { Modal } from "react-responsive-modal";
import { TutorModel } from "../courseDetails/interface";
import { AiOutlineCamera } from "react-icons/ai";
import NavBar from "../../components/navBar/navBar";
import "./UserProfile.css";
import AreasOfInterest from "../../components/areasOfInterest/AreasOfInterest";
import { toast } from "react-toastify";
import unknownavatar from "../../assets/unknownavatar.webp";
import LoadingIcons from "react-loading-icons";
import { useAuth } from "../../useContext";

const UserProfile = () => {
  const [user, setUser] = useState<TutorModel>();
  const [areaOfInterests, setAreaOfInterests] = useState(false);
  const [upModalIsOpen, setUpModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(false)
  const [interests, setInterests] = useState<string[]>([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [about, setAbout] = useState("");
  const [image, setImage] = useState({});
  const [updated, setUpdated] = useState("");

  const {areasOfInterests, setAreasOfInterests} = useAuth()

  const params = useParams();

  const navigate = useNavigate();

  const handleSubmitEditedProfile = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setLoading(true)
    const { data } = await apiPutFormData("/users/edit-profile", {
      name: name ? name : user?.name,
      location: location ? location : user?.location,
      about: about ? about : user?.about,
      expertise: interests,
      image,
    });
   
    if (data) {
      setLoading(false)
      toast.success(data.message);
      setUpdated(data.message);
    } else {
      toast.error("There was an error, please try again");
    }
    setName("");
    setLocation("");
    setAbout("");
    navigate(`/dashboard/${user?.id}`)
  };

  const handleSubmitStudentEditedProfile = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setLoading(true)
    const { data } = await apiPutFormData("/users/edit-profile", {
      name: name ? name : user?.name,
      areaOfInterest: interests,
      image,
    });

    if (data) {
      setLoading(false)
      toast.success(data.message);
      setUpdated(data.message);
    } else {
      toast.error("There was an error, please try again");
    }
    setName("");
    setEmail("");
    navigate(`/dashboard/${user?.id}`)
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.files![0]);
  };

  useEffect(() => {
    setLoading(false);
    const fecthUser = async () => {
      const { data } = await apiGet(`/users/atutordetail/${params.userid}`);
      setUser(data.message);
    };
    fecthUser();
  }, [updated]);

  

  const handleChange = () => {
    setUpModalIsOpen(true);
    setAreaOfInterests(false);
  };

  const upGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      {user && user.userType === "Tutor" ? (
        <div className="up-parent-containing-div">
          <NavBar />
          <div className="up-button-back">
            <button
              type="button"
              onClick={upGoBack}
              className="up-back-direction"
            >
              <FiArrowLeft /> Back
            </button>
          </div>

          <div className="up-second-container">
            <form onSubmit={handleSubmitEditedProfile}>
              <div className="up-pictureAndName">
                <img
                  src={user.image ? user.image : unknownavatar}
                  alt="profile"
                />

                <div className="iconimagewrapper">
                  <div className="imageforupload">
                    <AiOutlineCamera className="up-camera-icon" />
                  </div>
                  <input className="updateFile" type="file" onChange={(e) => handleFile(e)} />
                </div>

                <p className="up-name">
                  {user.name ? user.name : "Please update name"}
                </p>
              </div>

              <div className="up-profile">
                <h3 className="up-heading">Profile</h3>
              </div>

              <div className="up-formContainer">
                <div>
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={user.name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div>
                  <label>Location</label>
                  <input
                    type="text"
                    defaultValue={user.location}
                    name="location"
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <div>
                  <label>About</label>
                  <input
                    name="about"
                    defaultValue={user.about}
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </div>
                <div>
                  <label>Area of Interest</label>
                  <div>
                    <AreasOfInterest
                      interests={areasOfInterests}
                      setInterests={setAreasOfInterests}
                    />
                  </div>
                  <div className="up-add-area-of-interest">
                    <button type="button" onClick={() => handleChange()}>
                      <HiOutlinePlusCircle /> Add
                    </button>
                  </div>
                </div>
                <div className="up-submitButton">
                  <button type="submit">Save</button>
                  {loading && (
								<div className="up-login_loading">
									<LoadingIcons.Oval
										stroke="black"
										strokeOpacity={1}
										height={15}
										width={198}
									/>
								</div>
							)}
                </div>
              </div>
            </form>
            <Modal
              open={upModalIsOpen}
              onClose={() => setUpModalIsOpen(false)}
              center
            >
              <CreateCourse
                closeThisModal={setUpModalIsOpen}
                setAreaOfInterests={setAreaOfInterests}
              />
            </Modal>
          </div>
        </div>
      ) : user && user.userType === "Student" ? (
        <div className="up-parent-containing-div">
          <NavBar />
          <div className="up-button-back">
            <button
              type="button"
              onClick={upGoBack}
              className="up-back-direction"
            >
              <FiArrowLeft /> Back
            </button>
          </div>

          <div className="up-second-container">
            <form onSubmit={handleSubmitStudentEditedProfile}>
              <div className="up-pictureAndName">
                <img
                  src={user.image ? user.image : unknownavatar}
                  alt="profile"
                />
                <div className="iconimagewrapper">
                  <div className="imageforupload">
                    <AiOutlineCamera className="up-camera-icon" />
                  </div>
                  <input className="updateFile" type="file" onChange={(e) => handleFile(e)} />
                </div>

                <p className="up-name">{user.name}</p>
              </div>

              <div className="up-profile">
                <h3 className="up-heading">Profile</h3>
              </div>

              <div className="up-formContainer">
                <div>
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={user.name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label>Area of Interest</label>
                  <div>
                    <AreasOfInterest
                      interests={areasOfInterests}
                      setInterests={setAreasOfInterests}
                    />
                  </div>
                  <div className="up-add-area-of-interest">
                    <button type="button" onClick={() => handleChange()}>
                      <HiOutlinePlusCircle /> Add
                    </button>
                  </div>
                </div>
                <div className="up-submitButton">
                  <button type="submit">Save</button>
                  {loading && (
								<div className="up-login_loading">
									<LoadingIcons.Oval
										stroke="black"
										strokeOpacity={1}
										height={45}
										width={398}
									/>
								</div>
							)}
                </div>
              </div>
            </form>
            <Modal
              open={upModalIsOpen}
              onClose={() => setUpModalIsOpen(false)}
              center
            >
              <CreateCourse
                closeThisModal={setUpModalIsOpen}
                setAreaOfInterests={setAreaOfInterests}
              />
            </Modal>
          </div>
        </div>
      ) : (
        <LoadingIcons.Rings
          stroke="#fd29593d"
          strokeOpacity={1}
          height={500}
          width={1400}
        />
      )}
    </>
  );
};

export default UserProfile;
