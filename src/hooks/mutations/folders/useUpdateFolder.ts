import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import { updateFolderApi } from "../../../services/folders/updateFolder";

import { ApiError, ApiResult } from "../../../interfaces/api";
import { IFolder, IUpdateFolderBody } from "../../../interfaces/folders";

export const useUpdateFolder = () => {
	return useMutation<ApiResult<IFolder>, AxiosError<ApiError>, IUpdateFolderBody>({
		mutationFn: async (body) => {
			const data = await updateFolderApi(body);

			return data;
		},
	});
};
