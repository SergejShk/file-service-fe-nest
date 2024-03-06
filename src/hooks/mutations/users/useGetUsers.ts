import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";

import { getAllUsersApi } from "../../../services/users/getAllUsers";

import { ApiError, ApiResult } from "../../../interfaces/api";
import { IUser } from "../../../interfaces/auth";

export const useGetUsers = () => {
	return useQuery<ApiResult<IUser[]> | null, AxiosError<ApiError>>({
		queryKey: [],
		queryFn: async () => {
			return await getAllUsersApi();
		},
	});
};
