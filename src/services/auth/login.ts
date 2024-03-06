import { apiInstance } from "../apiInstance";

import { ApiResult } from "../../interfaces/api";
import { ILoginBody, IUser } from "../../interfaces/auth";

export const loginApi = async (body: ILoginBody) => {
	const { data } = await apiInstance.post<Promise<ApiResult<IUser>>>(`auth/login`, body);

	return data;
};
