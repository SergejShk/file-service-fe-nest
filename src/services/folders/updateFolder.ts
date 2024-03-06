import { apiInstance } from "../apiInstance";

import { ApiResult } from "../../interfaces/api";
import { IFolder, IUpdateFolderBody } from "../../interfaces/folders";

export const updateFolderApi = async (body: IUpdateFolderBody): Promise<ApiResult<IFolder>> => {
	const { id, ...payload } = body;

	const { data } = await apiInstance.put<Promise<ApiResult<IFolder>>>(`folders/update/${id}`, payload);

	return data;
};
