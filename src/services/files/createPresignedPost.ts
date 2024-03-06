import { apiInstance } from "../apiInstance";

import { ApiResult } from "../../interfaces/api";
import { ICreatePresignedPostBody, ICreatePresignedPostRes } from "../../interfaces/files";

export const createPresignedPostApi = async (
	body: ICreatePresignedPostBody
): Promise<ApiResult<ICreatePresignedPostRes>> => {
	const { data } = await apiInstance.post<Promise<ApiResult<ICreatePresignedPostRes>>>(
		`files/presigned-link/`,
		body
	);

	return data;
};
