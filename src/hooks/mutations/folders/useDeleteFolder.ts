import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import { deleteFolderApi } from "../../../services/folders/deleteFolder";

import { ApiError, ApiResult } from "../../../interfaces/api";

export const useDeleteFolder = () => {
	return useMutation<ApiResult<boolean>, AxiosError<ApiError>, number>({
		mutationFn: async (body) => {
			const data = await deleteFolderApi(body);

			return data;
		},
	});
};
