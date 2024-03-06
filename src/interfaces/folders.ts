export interface INewFolderBody {
	name: string;
	isPublic: boolean;
	editorsIds?: number[];
	parentId?: number;
}

export interface IFolder {
	id: number;
	name: string;
	isPublic: boolean;
	editorsIds: number[] | null;
	parentId: number | null;
	userId: number;
}

export interface IFolderFormValues {
	name: string;
	isPublic: boolean;
}

export interface IUpdateFolderBody {
	id: number;
	name: string;
	isPublic: boolean;
}

export interface IUpdateFolderEditorsBody {
	id: number;
	editorsIds: number[];
}
