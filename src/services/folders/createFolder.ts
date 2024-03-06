import { apiInstance } from "../apiInstance";

import { ApiResult } from "../../interfaces/api";
import { IFolder, INewFolderBody } from "../../interfaces/folders";

export const createFolderApi = async (body: INewFolderBody): Promise<ApiResult<IFolder>> => {
	const { data } = await apiInstance.post<Promise<ApiResult<IFolder>>>(`folders/new`, body);

	return data;
};
