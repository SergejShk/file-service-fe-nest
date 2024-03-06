import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import { updateFolderEditorsApi } from "../../../services/folders/updateEditors";

import { ApiError, ApiResult } from "../../../interfaces/api";
import { IFolder, IUpdateFolderEditorsBody } from "../../../interfaces/folders";

export const useUpdateFolderEditors = () => {
	return useMutation<ApiResult<IFolder>, AxiosError<ApiError>, IUpdateFolderEditorsBody>({
		mutationFn: async (body) => {
			const data = await updateFolderEditorsApi(body);

			return data;
		},
	});
};
