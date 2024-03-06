export interface IFile {
	name: string;
	key: string;
}

export interface IFilesFormValues extends IFile {
	isPublic: boolean;
}

export interface ICreatePresignedPostBody {
	key: string;
	type: string;
}

export interface IPresignedFields {
	key: string;
	acl: string;
	bucket: string;
	"X-Amz-Algorithm": string;
	"X-Amz-Credential": string;
	"X-Amz-Date": string;
	Policy: string;
	"X-Amz-Signature": string;
}

export interface ICreatePresignedPostRes {
	url: string;
	fields: IPresignedFields;
}

export interface INewFileBody {
	name: string;
	key: string;
	isPublic: boolean;
	editorsIds?: number[] | null;
	folderId?: number | null;
}

export interface IFileApi extends INewFileBody {
	id: number;
	userId: number;
}

export interface IFileUpdateBody {
	id: number;
	name: string;
	isPublic: boolean;
}

export interface IUpdateFileEditorsBody {
	id: number;
	editorsIds: number[];
}

export interface IDeleteFileBody {
	id: number;
	key: string;
}
