import { apiInstance } from "../apiInstance";

import { ApiResult } from "../../interfaces/api";
import { IFolder } from "../../interfaces/folders";

export const getFoldersByParentIdApi = async (
	parentId: number,
	name: string
): Promise<ApiResult<IFolder[]>> => {
	const { data } = await apiInstance.post<Promise<ApiResult<IFolder[]>>>(
		`folders/list-by-parent/${parentId}`,
		{ name }
	);

	return data;
};
