import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";

import { getFilesByFolderIdApi } from "../../../services/files/getFilesByFolderId";

import { ApiError, ApiResult } from "../../../interfaces/api";
import { IFileApi } from "../../../interfaces/files";

export const useFilesByFolder = (folderId: number, name: string) => {
	return useQuery<ApiResult<IFileApi[]> | null, AxiosError<ApiError>>({
		queryKey: ["folderId", name + folderId],
		queryFn: async () => {
			return await getFilesByFolderIdApi(folderId, name);
		},
	});
};
