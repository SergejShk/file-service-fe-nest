import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import { updateFileApi } from "../../../services/files/updateFile";

import { ApiError, ApiResult } from "../../../interfaces/api";
import { IFileApi, IFileUpdateBody } from "../../../interfaces/files";

export const useUpdateFile = () => {
	return useMutation<ApiResult<IFileApi>, AxiosError<ApiError>, IFileUpdateBody>({
		mutationFn: async (body) => {
			const data = await updateFileApi(body);

			return data;
		},
	});
};
