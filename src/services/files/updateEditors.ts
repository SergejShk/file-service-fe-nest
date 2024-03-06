import { apiInstance } from "../apiInstance";

import { ApiResult } from "../../interfaces/api";
import { IFileApi, IUpdateFileEditorsBody } from "../../interfaces/files";

export const updateFileEditorsApi = async (body: IUpdateFileEditorsBody): Promise<ApiResult<IFileApi>> => {
	const { id, ...payload } = body;

	const { data } = await apiInstance.put<Promise<ApiResult<IFileApi>>>(`files/update-editors/${id}`, payload);

	return data;
};
