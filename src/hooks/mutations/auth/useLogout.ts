import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import { initialState, useAuthContext } from "../../../context/AuthContext";

import { logOutApi } from "../../../services/auth/logout";

import { ApiError, ApiResult } from "../../../interfaces/api";

export const useLogOut = () => {
	const { setAuth } = useAuthContext();

	return useMutation<ApiResult<object>, AxiosError<ApiError>>({
		mutationFn: async () => {
			const data = await logOutApi();

			setAuth(initialState);
			return data;
		},
	});
};
