import { apiInstance } from "../apiInstance";

import { ApiResult } from "../../interfaces/api";

export const deleteFolderApi = async (id: number): Promise<ApiResult<boolean>> => {
	const { data } = await apiInstance.delete<Promise<ApiResult<boolean>>>(`folders/${id}`);

	return data;
};
