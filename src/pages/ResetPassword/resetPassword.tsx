import "./resetPassword.css";
import React, { useState } from "react";
import Group from "../../assets/Group.svg";
// import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const baseUrl = import.meta.env.VITE_SERVER_URL as string;

const ResetPassword = () => {
	const [createForm, setCreateForm] = useState({});
	const submitDetails = (e: any) => {
		e.preventDefault();
		const { name, value } = e.target;
		setCreateForm({
			...createForm,
			[name]: value,
		});
	};

	const fetchLink = async () => {
		try {
			const response = await axios.post(
				`${baseUrl}/users/forgot-password`,
				createForm
			);
			toast.success(response.data.message);
		} catch (error: any) {
			console.log(error);
			if (error.response?.data?.Error === "Internal server Error") {
				toast.error("Something went wrong, please hang on");
			} else {
				toast.error(error.response?.data?.Error || "Something went wrong");
			}
		}
	};

	return (
		<div className="overallDiv">
			{" "}
			<div className="resetPassword">
				{" "}
				<Link to="/">
				<div className="tutor-buddy">
					{" "}
					<img src={Group} /> <h3 className="learn">iLearn</h3>{" "}
				</div>{" "}
				</Link>
				<div className="form-con">
					{" "}
					<div className="form-box">
						{" "}
						<div className="contain">
							{" "}
							<h4>Forgot Password?</h4>{" "}
							<p className="ppp">
								Send a link to your email to resend password
							</p>{" "}
						</div>{" "}
						<form>
							{" "}
							<div className="form-group">
								{" "}
								<label htmlFor="email">Email</label> <br />{" "}
								<input
									type="email"
									className="form-control"
									id="email"
									name="email"
									onChange={submitDetails}
									placeholder="Enter email"
								/>{" "}
							</div>{" "}
							<button
								type="submit"
								onClick={async () => await fetchLink()}
								className="btn-primary"
							>
								{" "}
								<Link to="" className="btn">
									{" "}
									Send Reset Link{" "}
								</Link>{" "}
							</button>{" "}
							<p>
								{" "}
								Already have an account?{" "}
								<span className="login">
									{" "}
									<Link to="/login">Login</Link>{" "}
								</span>{" "}
							</p>{" "}
						</form>{" "}
					</div>{" "}
				</div>{" "}
			</div>{" "}
		</div>
	);
};

export default ResetPassword;
