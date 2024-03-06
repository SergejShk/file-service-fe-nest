export enum EModal {
	New = "new",
	Edit = "edit",
	Permission = "permission",
}

export enum EPermission {
	Viewer = "viewer",
	Editor = "editor",
}

export interface IDropdownOption {
	value: string;
	label: string;
}
