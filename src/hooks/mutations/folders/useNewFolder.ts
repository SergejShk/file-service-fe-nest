import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import { createFolderApi } from "../../../services/folders/createFolder";

import { ApiError, ApiResult } from "../../../interfaces/api";
import { IFolder, INewFolderBody } from "../../../interfaces/folders";

export const useNewFolder = () => {
	return useMutation<ApiResult<IFolder>, AxiosError<ApiError>, INewFolderBody>({
		mutationFn: async (body) => {
			const data = await createFolderApi(body);

			return data;
		},
	});
};
