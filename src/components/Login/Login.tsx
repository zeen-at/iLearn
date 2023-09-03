/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { Fragment, ChangeEvent, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../signUp/signUp.css";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import logo from "../../assets/logo.png";
import { useAuth } from "../../useContext/index";
import LoadingIcons from "react-loading-icons";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../../utils/firebaseAuth/firebase";
import axios from "axios";

const baseUrl: string = import.meta.env.VITE_SERVER_URL;

interface formFieldType {
	email: string;
	password: string;
}
const formField: formFieldType = {
	email: "",
	password: "",
};
function LoginForm() {
	const navigate = useNavigate();
	const [inputField, setInputField] = useState(formField);
	const [passWordError, setPassWordError] = useState("");
	const [isPassword, setIsPassword] = useState(false);
	const [emailError, setEmailError] = useState("");
	const [isEmail, setIsEmail] = useState(false);

	const firebaseAuth = getAuth(app);
	const provider = new GoogleAuthProvider();

	const signInWithGoogle = async (): Promise<void> => {
		await signInWithPopup(firebaseAuth, provider)
			.then((userCred) => {
				console.log(userCred);
				if (userCred !== undefined) {
					firebaseAuth.onAuthStateChanged((userCred) => {
						if (userCred !== undefined) {
							void userCred?.getIdToken().then((token) => {
								axios
									.get(`${baseUrl}/users/googleLogin`, {
										headers: { Authorization: `Bearer ${token}` },
									})
									.then((res) => {
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

	const { LoginConfig, loading, setLoading } = useAuth() as any;

	const handleInputChange = (
		event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
	) => {
		setEmailError("");
		setPassWordError("");
		const { name, value } = event.target;
		setInputField({ ...inputField, [name]: value });
	};
	const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (inputField.email === "" || !inputField.email.includes("@")) {
			setIsEmail(true);
			return setEmailError("Please provide a valid email");
		} else if (inputField.password.length < 8) {
			setIsPassword(true);
			return setPassWordError("Password should not be less than 8 characters");
		} else {
			setLoading(true);
			LoginConfig(inputField);
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
							<h2> iLearn </h2>
						</div>
					</div>
				</Link>
				<div>
					<div className="formBody">
						<div className="formHead">
							<h3>Login </h3>
						</div>

						{/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
						<form onSubmit={handleSubmit} className="formInputs">
							<div className="formLabel">
								<label>Email</label>
								<input
									type="email"
									name="email"
									value={inputField.email}
									onChange={handleInputChange}
									placeholder="Enter your email"
									className="signUp-input"
								/>
							</div>
							{isEmail && emailError.length > 0 && (
								<div className="errorMsg">{emailError}</div>
							)}
							<div className="formLabel">
								<label>Password</label>
								<input
									type="password"
									name="password"
									value={inputField.password}
									onChange={handleInputChange}
									placeholder="Enter your password..."
									className="signUp-input"
								/>
							</div>
							{isPassword && passWordError.length > 0 && (
								<div className="errorMsg">{passWordError}</div>
							)}
							<h5 id="forgot">
								<Link to="/reset-password" className="forgot-link">
									Forgot password?
								</Link>
							</h5>

							<button type="submit" className="signUp-button">
								Login
							</button>

							{/* false */}
							{loading && (
								<div className="login_loading">
									<LoadingIcons.Oval
										stroke="black"
										strokeOpacity={1}
										height={45}
										width={511}
									/>
								</div>
							)}
							<div className="login-formAlt">
								Don't have an account?
								<Link to="/sign-up" className="login-link">
									Create
								</Link>
							</div>
						</form>

						<div className="socialIcons">
							{/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
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
			</div>
		</Fragment>
	);
}

export default LoginForm;
