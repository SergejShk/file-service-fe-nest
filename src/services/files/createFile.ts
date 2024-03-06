import { apiInstance } from "../apiInstance";

import { ApiResult } from "../../interfaces/api";
import { IFileApi, INewFileBody } from "../../interfaces/files";

export const createFileApi = async (body: INewFileBody): Promise<ApiResult<IFileApi>> => {
	const { data } = await apiInstance.post<Promise<ApiResult<IFileApi>>>(`files/new`, body);

	return data;
};
