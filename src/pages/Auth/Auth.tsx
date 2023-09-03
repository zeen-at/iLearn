import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Auth = () => {
	const queryParams = new URLSearchParams(window.location.search);
	const navigate = useNavigate();
	const token = queryParams.get("token") as string;
	const [message, setMessage] = useState<string>(
		"checking verification status...."
	);

	const getUserProfile = async () => {
		try {
			const response = await axios.get(
				`${import.meta.env.VITE_SERVER_URL as string}/users/profile`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			console.log(response);
			localStorage.setItem("signature", token);
			localStorage.setItem("user", "backend");
			localStorage.setItem("userType", response.data.userDetails.userType);
			navigate("/dashboard");
		} catch (error) {
			console.log(error);
			setMessage("you could not not be verified to log in");
		}
	};
	useEffect(() => {
		void getUserProfile();
	});
	return <div>{message}</div>;
};

export default Auth;
