import "./resetPassword.css";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as qs from "query-string";
import Group from "../../assets/Group.svg";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const baseUrl = import.meta.env.VITE_SERVER_URL as string;

const SetNewPassword = () => {
	const [createForm, setCreateForm] = useState({});

	const queryParams = new URLSearchParams(window.location.search);
	const userId = queryParams.get("userId") as string;
	const token = queryParams.get("token") as string;

	const submitDetails = (e: any) => {
		e.preventDefault();
		const { name, value } = e.target;
		setCreateForm({
			...createForm,
			[name]: value,
		});
	};
	const fetchLink = async (e: any) => {
		try {
			e.preventDefault();
			const response = await axios.post(
				`${baseUrl}/users/resetpassword/${userId}/${token}`,
				createForm
			);
			if (response.status === 200) {
				toast.success(response.data.message);
				setTimeout(() => {
					window.location.href = "/login";
				}, 1000);
			}
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
				<div className="form-cont">
					{" "}
					<div className="form-box">
						{" "}
						<div className="contain">
							{" "}
							<h4>Reset Password</h4> <p>Please choose a new password</p>{" "}
						</div>{" "}
						<form>
							{" "}
							<div>
								{" "}
								<label htmlFor="email">
									New Password<span className="astericks">*</span>
								</label>{" "}
								<br />{" "}
								<input
									type="password"
									className="form-control2"
									name="password"
									onChange={submitDetails}
									placeholder="Enter a new password"
								/>{" "}
							</div>{" "}
							<div>
								{" "}
								<label htmlFor="email">
									Confirm Password<span className="astericks">*</span>
								</label>{" "}
								<br />{" "}
								<input
									type="password"
									className="form-control2"
									name="confirm_password"
									onChange={submitDetails}
									placeholder="Confirm your password"
								/>{" "}
							</div>{" "}
							<button type="submit" className="btn-primary" onClick={fetchLink}>
								{" "}
								<Link to="" className="btn">
									{" "}
									Change Password{" "}
								</Link>{" "}
							</button>{" "}
						</form>{" "}
					</div>{" "}
				</div>{" "}
			</div>{" "}
		</div>
	);
};

export default SetNewPassword;
