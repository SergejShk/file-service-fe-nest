import { apiInstance } from "../apiInstance";

import { ApiResult } from "../../interfaces/api";

export const getFileApi = async (key: string): Promise<ApiResult<string>> => {
	const { data } = await apiInstance.get<Promise<ApiResult<string>>>(`files/${key}`);

	return data;
};
