import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import { updateFileEditorsApi } from "../../../services/files/updateEditors";

import { ApiError, ApiResult } from "../../../interfaces/api";
import { IFileApi, IUpdateFileEditorsBody } from "../../../interfaces/files";

export const useUpdateFileEditors = () => {
	return useMutation<ApiResult<IFileApi>, AxiosError<ApiError>, IUpdateFileEditorsBody>({
		mutationFn: async (body) => {
			const data = await updateFileEditorsApi(body);

			return data;
		},
	});
};
