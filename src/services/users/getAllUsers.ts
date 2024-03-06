import { apiInstance } from "../apiInstance";

import { ApiResult } from "../../interfaces/api";
import { IUser } from "../../interfaces/auth";

export const getAllUsersApi = async (): Promise<ApiResult<IUser[]>> => {
	const { data } = await apiInstance.get<Promise<ApiResult<IUser[]>>>(`users/all`);

	return data;
};
