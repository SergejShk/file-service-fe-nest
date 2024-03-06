import { apiInstance } from "../apiInstance";

import { ApiResult } from "../../interfaces/api";

export const deleteFileApi = async (id: number): Promise<ApiResult<boolean>> => {
	const { data } = await apiInstance.delete<Promise<ApiResult<boolean>>>(`files/${id}`);

	return data;
};
