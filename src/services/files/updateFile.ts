import { apiInstance } from "../apiInstance";

import { ApiResult } from "../../interfaces/api";
import { IFileApi, IFileUpdateBody } from "../../interfaces/files";

export const updateFileApi = async (body: IFileUpdateBody): Promise<ApiResult<IFileApi>> => {
	const { id, ...payload } = body;

	const { data } = await apiInstance.put<Promise<ApiResult<IFileApi>>>(`files/update/${id}`, payload);

	return data;
};
