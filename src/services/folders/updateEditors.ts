import { apiInstance } from "../apiInstance";

import { ApiResult } from "../../interfaces/api";
import { IFolder, IUpdateFolderEditorsBody } from "../../interfaces/folders";

export const updateFolderEditorsApi = async (body: IUpdateFolderEditorsBody): Promise<ApiResult<IFolder>> => {
	const { id, ...payload } = body;

	const { data } = await apiInstance.put<Promise<ApiResult<IFolder>>>(
		`folders/update-editors/${id}`,
		payload
	);

	return data;
};
