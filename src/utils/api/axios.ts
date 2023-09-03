import axios from "axios";
const baseUrl: string = import.meta.env.VITE_SERVER_URL;

export const apiGet = async (path: string) => {
	const config = {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("signature") as string}`,
		},
	};
	const result = await axios.get(`${baseUrl}${path}`, config);
	return result;
};

export const apiPost = async (path: string, body = {}) => {
	const config = {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("signature") as string}`,
		},
	};
	return await axios.post(`${baseUrl}${path}`, body, config);
};
export const apiUpdate = async (path: string, body: {}) => {
	const config = {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("signature") as string}`,
		},
	};
	// console.log(path, body);

	return await axios.patch(`${baseUrl}${path}`, body, config);
};

export const apiPut = async (path: string, body = {}, auth = true) => {
	const config = {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("signature") as string}`,
		},
	};
	return await axios.put(`${baseUrl}${path}`, body, config);
};

export const apiPutFormData = async (path: string, body = {}, auth = true) => {
	const config = {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("signature") as string}`,
			"Content-Type": "multipart/form-data",
		},
	};
	return await axios.put(`${baseUrl}${path}`, body, config);
};
export const apiDelete = async (path: string, auth = true) => {
	const config = {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("signature") as string}`,
		},
	};
	return await axios.delete(`${baseUrl}${path}`, config);
};
