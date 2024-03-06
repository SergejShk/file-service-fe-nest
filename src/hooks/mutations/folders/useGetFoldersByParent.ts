import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";

import { getFoldersByParentIdApi } from "../../../services/folders/getFoldersByParentId";

import { ApiError, ApiResult } from "../../../interfaces/api";
import { IFolder } from "../../../interfaces/folders";

export const useFoldersByParent = (parentId: number, name: string) => {
	return useQuery<ApiResult<IFolder[]> | null, AxiosError<ApiError>>({
		queryKey: ["parentId", name + parentId],
		queryFn: async () => {
			return await getFoldersByParentIdApi(parentId, name);
		},
	});
};
