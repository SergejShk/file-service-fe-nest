import { ApiResult } from "../../interfaces/api";
import { apiInstance } from "../apiInstance";

export const logOutApi = async () => {
	const { data } = await apiInstance.get<Promise<ApiResult<object>>>(`auth/logout`);

	return data;
};
