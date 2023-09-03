import React, { Fragment, ChangeEvent, useState, useRef } from "react";
import "../VerifyPage/Verify.css";
import logo from "../../assets/logo.png";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const baseUrl = import.meta.env.VITE_SERVER_URL as string;
const VerifyPage = () => {
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const interestRef = useRef<HTMLSelectElement>(null);
	const userTypeRef = useRef<HTMLSelectElement>(null);
	const [error, setError] = useState("");
	const [show, setShow] = useState(false);
	const validate = (
		email: string = "",
		password: string = "",
		interest: string = "",
		userType: string = ""
	) => {
		if (userType.length === 0) return setError("Please select a user type");
		else if (email.length === 0) return setError("Please Enter your email");
		else if (password.length < 8)
			return setError("Password character cannot be less than 8");
		else if (interest.length === 0)
			return setError("Please Select an area of Interest");
	};
	const display = () => {
		setShow(!show);
	};
	const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
		try {
			event.preventDefault();
			validate(
				emailRef.current?.value,
				passwordRef.current?.value,
				interestRef.current?.value,
				userTypeRef.current?.value
			);
			const data = {
				email: emailRef.current?.value,
				password: passwordRef.current?.value,
				areaOfInterest: interestRef.current?.value,
				userType: userTypeRef.current?.value,
			};
			console.log(emailRef.current?.value);
			await axios.post(`${baseUrl}/users/signup`, data).then((res) => {
				console.log(res.data.message);
				const signature = res.data.signature;
				toast.success(res.data.message);
				window.alert(res.data.message);
				localStorage.setItem("signature", signature);
				setTimeout(() => {
					window.location.href = "/login";
				}, 1000);
			});
		} catch (err: any) {
			toast.error(err.response.data.Error);
		}
	};
	return (
		<Fragment>
			<div className="formContainer">
				<div className="logo">
					<div>
						<img src={logo} alt="Logo" />
					</div>
					<div>
						<h2>iLearn</h2>
					</div>
				</div>
				<div>
					<div className="formBody">
						<div className="formHead">
							<h2>Verify your account to connect with students</h2>
						</div>
						<form onSubmit={handleSubmit} className="verify_form">
							<div className="verify_formLabel">
								<label>OTP</label>
								<input
									type="number"
									name="otp"
									placeholder="Enter your otp"
									pattern="\d{1}"
								/>
							</div>
							<button type="submit" className="signUp-button">
								Verify Me
							</button>
						</form>
					</div>
				</div>
			</div>
		</Fragment>
	);
};
export default VerifyPage;
