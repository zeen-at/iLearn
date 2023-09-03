/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { createContext, useState } from "react";
import { apiGet, apiPost } from "../utils/api/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { User } from "../utils/Interfaces/index.dto";
import { AxiosResponse } from "axios";

export interface LoginData {
	email: string;
	password: string;
}
export interface GlobalStateInterface {
	LoginConfig: (data: LoginData) => Promise<void>;
	checkIsPaid: (id: string) => Promise<void>;
	user: User | undefined;
	loading: Boolean;
	error: null | String;
	loggedInUser: () => Promise<void>;
	setLoading: React.Dispatch<React.SetStateAction<Boolean>> | any;
	areasOfInterests: string[];
	isPaid: Boolean;
	setIsPaid: React.Dispatch<React.SetStateAction<Boolean>> | any;
	setAreasOfInterests: React.Dispatch<React.SetStateAction<string[]>>;
}
export const dataContext = createContext<GlobalStateInterface | null>(null);

const DataProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User>();
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<String | null>(null);
	const [areasOfInterests, setAreasOfInterests] = useState<string[]>([]);
	const [isPaid, setIsPaid] = useState<boolean>(false);
	/** ==============Login======= **/
	const LoginConfig: (data: LoginData) => Promise<void> = async (
		data: LoginData
	) => {
		try {
			const response: AxiosResponse<any, any> = await apiPost(
				"/users/login",
				data
			);
			const signature: string = response.data.signature;

			localStorage.setItem("signature", signature);
			localStorage.setItem("user", response.data.areaOfInterest || "backend");
			localStorage.setItem("userType", response.data.userType);
			if (response.status === 200) {
				setLoading(false);
				window.location.href = "/dashboard";
			}
		} catch (err: any) {
			setLoading(false);
			if (err.response?.data?.Error === "Internal server Error") {
				toast.error("Something went wrong, please hang on");
			} else {
				toast.error(err.response?.data?.Error || "Something went wrong");
			}
		}
	};

	// method should be placed into actions
	const loggedInUser = async () => {
		const { data } = await apiGet("/users/profile");
		setUser(data.userDetails);
		setLoading(false);
	};

	const checkIsPaid = async (id: string) => {
		try {
			const response = await apiGet(`/users/student/courses/${id}`);
			if (response.data.message === "course found") {
				setIsPaid(true);
			}
		} catch (error) {
			//   console.log(error);
		}
	};

	return (
		<dataContext.Provider
			value={{
				LoginConfig,
				loggedInUser,
				setLoading,
				user,
				loading,
				error,
				areasOfInterests,
				setAreasOfInterests,
				isPaid,
				setIsPaid,
				checkIsPaid,
			}}
		>
			{children}
		</dataContext.Provider>
	);
};

export const useAuth = () => {
	const context = React.useContext(dataContext) as GlobalStateInterface;
	if (context === undefined) {
		throw new Error("useAuth must be used within the auth provider");
	}
	return context;
};

export default DataProvider;
