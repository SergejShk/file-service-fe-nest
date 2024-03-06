export enum ApiStatuses {
	success = "OK",
}

export type ApiResult<T> = {
	data: T;
	status: ApiStatuses.success;
};

export type ApiError = "string";

export type ApiResponse<T> = ApiError | ApiResult<T>;
