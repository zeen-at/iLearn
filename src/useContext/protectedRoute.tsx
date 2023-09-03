/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useState, useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { Location } from "history";

interface Props {
	children: React.ReactNode;
}

interface LocationState {
	from: {
		pathname: string;
	};
}

const getPreviousRoute = (location: Location): string => {
	const state = location.state as LocationState;
	return state?.from?.pathname || "/";
};

export const ProtectedRoute: React.FC<Props> = ({ children }) => {
	const location = useLocation();
	const [redirectUrl, setRedirectUrl] = useState("");

	useEffect(() => {
		const isAuthenticated = localStorage.getItem("signature");
		const userType = localStorage.getItem("userType");

		if (
			isAuthenticated?.length !== 0 &&
			(userType === "Tutor" || userType === "Student")
		) {
			setRedirectUrl("");
			return;
		}

		setRedirectUrl(getPreviousRoute(location));
	}, [location]);

	if (redirectUrl) {
		return <Navigate to={{ pathname: redirectUrl }} />;
	}
	return <React.Fragment>{children}</React.Fragment>;
};

export const ProtectedRouteTutor: React.FC<Props> = ({ children }) => {
	const location = useLocation();
	const [redirectUrl, setRedirectUrl] = useState("");

	useEffect(() => {
		const isAuthenticated = localStorage.getItem("signature");
		const userType = localStorage.getItem("userType");

		if (isAuthenticated?.length !== 0 && userType === "Tutor") {
			setRedirectUrl("");
			return;
		}

		setRedirectUrl(getPreviousRoute(location));
	}, [location]);

	if (redirectUrl) {
		return <Navigate to={{ pathname: redirectUrl }} />;
	}
	return <React.Fragment>{children}</React.Fragment>;
};

export const ProtectedRouteStudent: React.FC<Props> = ({ children }) => {
	const location = useLocation();
	const [redirectUrl, setRedirectUrl] = useState("");

	useEffect(() => {
		const isAuthenticated = localStorage.getItem("signature");
		const userType = localStorage.getItem("userType");

		if (isAuthenticated?.length !== 0 && userType === "Student") {
			setRedirectUrl("");
			return;
		}

		setRedirectUrl(getPreviousRoute(location));
	}, [location]);

	if (redirectUrl) {
		return <Navigate to={{ pathname: redirectUrl }} />;
	}
	return <React.Fragment>{children}</React.Fragment>;
};
