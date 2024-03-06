import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import { useAuthContext } from "../../../context/AuthContext";

import { signupApi } from "../../../services/auth/signup";

import { ApiError, ApiResult } from "../../../interfaces/api";
import { ILoginBody, IUser } from "../../../interfaces/auth";

export const useSignup = () => {
	const { setAuth } = useAuthContext();

	return useMutation<ApiResult<IUser>, AxiosError<ApiError>, { body: ILoginBody }>({
		mutationFn: async ({ body }) => {
			const data = await signupApi(body);
			setAuth(data.data);

			return data;
		},
	});
};
