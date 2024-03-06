import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import { useAuthContext } from "../../../context/AuthContext";

import { loginApi } from "../../../services/auth/login";

import { ApiError, ApiResult } from "../../../interfaces/api";
import { ILoginBody, IUser } from "../../../interfaces/auth";

export const useLogin = () => {
	const { setAuth } = useAuthContext();

	return useMutation<ApiResult<IUser>, AxiosError<ApiError>, { body: ILoginBody }>({
		mutationFn: async ({ body }) => {
			const data = await loginApi(body);
			setAuth(data.data);

			return data;
		},
	});
};
