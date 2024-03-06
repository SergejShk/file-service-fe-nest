import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import { createFileApi } from "../../../services/files/createFile";

import { ApiError, ApiResult } from "../../../interfaces/api";
import { IFileApi, INewFileBody } from "../../../interfaces/files";

export const useNewFile = () => {
	return useMutation<ApiResult<IFileApi>, AxiosError<ApiError>, INewFileBody>({
		mutationFn: async (body) => {
			const data = await createFileApi(body);

			return data;
		},
	});
};
