import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import { deleteFileApi } from "../../../services/files/deleteFile";

import { ApiError, ApiResult } from "../../../interfaces/api";

export const useDeleteFile = () => {
	return useMutation<ApiResult<boolean>, AxiosError<ApiError>, number>({
		mutationFn: async (id) => {
			const data = await deleteFileApi(id);

			return data;
		},
	});
};
