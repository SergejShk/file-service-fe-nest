import { apiInstance } from "../apiInstance";

import { ApiResult } from "../../interfaces/api";
import { IFileApi } from "../../interfaces/files";

export const getFilesByFolderIdApi = async (
	folderId: number,
	name: string
): Promise<ApiResult<IFileApi[]>> => {
	const { data } = await apiInstance.post<Promise<ApiResult<IFileApi[]>>>(
		`files/list-by-folder/${folderId}`,
		{ name }
	);

	return data;
};
