import axios, { AxiosError, AxiosResponse } from "axios";

export const apiInstance = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true,
});

const handleSuccessResponse = (response: AxiosResponse) => {
	return response;
};

const handleErrorResponse = (error: AxiosError) => {
	return Promise.reject(error);
};

apiInstance.interceptors.response.use(handleSuccessResponse, handleErrorResponse);
