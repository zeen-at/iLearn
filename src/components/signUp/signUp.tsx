/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { Fragment, ChangeEvent, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../signUp/signUp.css";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import logo from "../../assets/logo.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiPost } from "../../utils/api/axios";
import LoadingIcons from "react-loading-icons";
import { useAuth } from "../../useContext";
import axios from "axios";
import { app } from "../../utils/firebaseAuth/firebase";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const googleLoginUrl: string = import.meta.env.VITE_SERVER_URL;

interface formFieldType {
	userType: string;
	email: string;
	password: string;
	areaOfInterest: string[];
	name: string;
}
const formField: formFieldType = {
	name: "",
	userType: "",
	email: "",
	password: "",
	areaOfInterest: [],
};

function SignUpForm() {
	const firebaseAuth = getAuth(app);
	const provider = new GoogleAuthProvider();

	const signInWithGoogle = async (): Promise<void> => {
		await signInWithPopup(firebaseAuth, provider)
			.then((userCred) => {
				console.log(userCred);
				if (userCred !== undefined) {
					firebaseAuth.onAuthStateChanged((userCred) => {
						if (userCred !== undefined) {
							// console.log(userCred);
							void userCred?.getIdToken().then((token) => {
								axios
									.get(`${googleLoginUrl}/users/googleLogin`, {
										headers: { Authorization: `Bearer ${token}` },
									})
									.then((res) => {
										console.log("res.data is ", res.data);
										localStorage.setItem("signature", res.data.signature);
										localStorage.setItem(
											"user",
											res.data.user.areaOfInterest || "backend"
										);
										localStorage.setItem("userType", res.data.user.userType);
									})
									.then((e) => navigate(`/dashboard`, { replace: true }))
									.catch((e) => e);
								// localStorage.setItem("signature", token);
							});
						} else {
							navigate("/login");
						}
					});
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const [formError, setFormError] = useState({});
	const [nameError, setNameError] = useState("");
	const [userTypeError, setUserTypeError] = useState("");
	const [emailError, setEmailError] = useState("");
	const [passWordError, setPassWordError] = useState("");

	const [interestError, setInterestError] = useState("");

	const [isSubmit, setIsSubmit] = useState(false);
	const [show, setShow] = useState(false);
	const [formDetails, setFormDetails] = useState(formField);
	const [isName, setIsName] = useState(false);
	const [isUsertype, setIsUsertype] = useState(false);
	const [isEmail, setIsEmail] = useState(false);
	const [isPassword, setIsPassword] = useState(false);
	const [isAreaOfInterest, setIsAreaOfInterest] = useState(false);
	const [AreaOfInterest, setAreaOfInterests] = useState<string[]>([]);
	const [interest, setInterest] = useState("");

	const navigate = useNavigate();

	const handleChange = (
		event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
	) => {
		event.preventDefault();
		setNameError("");
		setUserTypeError("");
		setEmailError("");
		setPassWordError("");
		const { name, value } = event.target;
		setFormDetails({ ...formDetails, [name]: value });
	};
	const handleArea = (
		event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
	) => {
		const { value } = event.target;
		setInterestError("");
		setInterest(event.target.value);
		setIsAreaOfInterest(false);
		setAreaOfInterests([interest]);
	};

	const { loading, setLoading } = useAuth() as any;
	const handleLogin = () => {
		// setLoading(true);
	};

	const { name, userType, email, password, areaOfInterest } = formDetails;

	useEffect(() => {
		if (Object.keys(formError).length === 0 && isSubmit) {
			console.log(formDetails);
		}
	}, [formError]);

	const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
		event.preventDefault();

		formDetails.areaOfInterest = [interest];

		if (formDetails.name === "") {
			setIsName(true);
			return setNameError("Name field is required");
		} else if (formDetails.userType === "") {
			setIsUsertype(true);
			return setUserTypeError("Usertype is required");
		} else if (formDetails.email === "" || !formDetails.email.includes("@")) {
			setIsEmail(true);
			return setEmailError("Please provide a valid email");
		} else if (
			formDetails.password.length < 8 ||
			formDetails.password.match(/^[a-zA-Z][0-9]$/) !== null
		) {
			setIsPassword(true);
			return setPassWordError(
				"Password should be alphanumeric & not less than 8 characters"
			);
		} else if (interest.length === 0) {
			setIsAreaOfInterest(true);
			setAreaOfInterests([]);
			return setInterestError("Area of interest is required");
		} else {
			setLoading(true);
			try {
				// areaArray = [];
				const response = await apiPost(`/users/signup`, formDetails);
				if (response.status === 201) {
					setLoading(false);
					toast.success(response.data.message);
				}
				setIsSubmit(true);
				setAreaOfInterests([]);
				// areaArray = [];
			} catch (err: any) {
				// areaArray = [];
				setAreaOfInterests([]);
				console.log(err);
				setLoading(false);
				if (err.response?.data?.Error === "Internal server Error") {
					toast.error("Something went wrong, please hang on");
				} else {
					toast.error(err.response?.data?.Error || "Something went wrong");
				}
			}
		}
	};
	useEffect(() => {
		setLoading(false);
	}, []);
	return (
		<Fragment>
			<div className="formContainer">
				<Link to="/">
					<div className="logo">
						<div>
							<img src={logo} alt="Logo" />
						</div>
						<div>
							<h2>iLearn</h2>
						</div>
					</div>
				</Link>
				<div className="signUpContainer">
					<div className="formBody">
						<div className="formHead">
							<h2>Create an account </h2>
							<p>Create an account to connect with students</p>
						</div>
						<form onSubmit={handleSubmit} className="formInputs">
							<div className="formLabel">
								<label>
									Full Name<span className="astericks">*</span>
								</label>
								<input
									type="text"
									name="name"
									value={name}
									onChange={handleChange}
									placeholder="Enter your name"
									className="signUp-input"
								/>
							</div>
							{isName && nameError.length > 0 && (
								<div className="errorMsg">{nameError}</div>
							)}
							<div>
								<label className="formLabel" id="userType">
									User Type
								</label>
								<span className="astericks">*</span>
								<select
									id="userType"
									name="userType"
									value={userType}
									onChange={handleChange}
									className="signUp-select"
								>
									<option value="">Select</option>
									<option value="Tutor">Tutor</option>
									<option value="Student">Student</option>
								</select>
							</div>
							{isUsertype && userTypeError.length > 0 && (
								<div className="errorMsg">{userTypeError}</div>
							)}

							<div className="formLabel">
								<label>Email</label>
								<span className="astericks">*</span>
								<input
									type="email"
									name="email"
									value={email}
									onChange={handleChange}
									placeholder="Enter your email"
									className="signUp-input"
								/>
							</div>
							{isEmail && emailError.length > 0 && (
								<div className="errorMsg">{emailError}</div>
							)}

							<div className="formLabel">
								<label>Password</label>
								<span className="astericks">*</span>

								<input
									type="password"
									name="password"
									value={password}
									onChange={handleChange}
									placeholder="alphanumeric and not less than 8 characters.."
									className="signUp-input"
								/>
							</div>
							{isPassword && passWordError.length > 0 && (
								<div className="errorMsg">{passWordError}</div>
							)}

							<div className="formLabel">
								<label id="interest">Area of Interest</label>
								<span className="astericks">*</span>

								<select
									id="interest"
									name="areaOfInterest"
									value={interest}
									onChange={handleArea}
									className="signUp-select"
								>
									<option value="">Select</option>
									<option value="Mathematics">Mathematics</option>
									<option value="Physics">Physics</option>
									<option value="Coding">Coding</option>
									<option value="Graphics Design">Graphics design</option>
									<option value="Video Editing">Video Editing</option>
									<option value="Chemistry">Chemistry</option>
									{/* <option value="digital">Digital Marketing</option> */}
								</select>
							</div>
							{isAreaOfInterest && interestError.length > 0 && (
								<div className="errorMsg">{interestError}</div>
							)}

							<button
								type="submit"
								className="signUp-button"
								onClick={handleLogin}
							>
								Sign Up
							</button>
							{loading && (
								<div className="signup_loading">
									<LoadingIcons.Oval
										stroke="black"
										strokeOpacity={1}
										height={45}
										width={491}
									/>
								</div>
							)}
							<div className="formAlt">
								Already have an account?
								<Link to="/login" className="login-link">
									Login
								</Link>
							</div>
						</form>
					</div>
					<div className="socialIcons">
						<button type="button" onClick={signInWithGoogle}>
							<FcGoogle />
						</button>

						<a href={`${import.meta.env.VITE_SERVER_URL}/facebook`}>
							<button className="fbBtn">
								<FaFacebook />
							</button>
						</a>
					</div>
				</div>
			</div>
		</Fragment>
	);
}
export default SignUpForm;

// const localStorageItems = {
// 	signature: res.data.signature,
// 	areaOfInterest: res.data.areaOfInterest,
// 	userType: res.data.userType
// }
