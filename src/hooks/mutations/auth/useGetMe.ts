import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import { useAuthContext } from "../../../context/AuthContext";

import { getMeApi } from "../../../services/auth/getMe";

import { ApiError, ApiResult } from "../../../interfaces/api";
import { IUser } from "../../../interfaces/auth";

export const useGetMe = () => {
	const { setAuth } = useAuthContext();

	return useMutation<ApiResult<IUser>, AxiosError<ApiError>>({
		mutationFn: async () => {
			const data = await getMeApi();

			const user = data.data;

			setAuth(user);
			return data;
		},
	});
};
