import { FC, useEffect, useState } from "react";
import styled from "styled-components";

import Modal from "../common/Modal";
import Loader from "../common/Loader";
import FolderForm from "../common/forms/FolderForm";
import PermissionForm from "../common/forms/PermissionForm";

import { useAuthContext } from "../../context/AuthContext";

import { useFoldersByParent } from "../../hooks/mutations/folders/useGetFoldersByParent";
import { useNewFolder } from "../../hooks/mutations/folders/useNewFolder";
import { useUpdateFolder } from "../../hooks/mutations/folders/useUpdateFolder";
import { useUpdateFolderEditors } from "../../hooks/mutations/folders/useUpdateFolderEditors";

import { EModal } from "../../interfaces/common";
import { IFolder, IFolderFormValues } from "../../interfaces/folders";

interface IProps {
	parentId: number;
	serchName: string;
	setParentFolders: React.Dispatch<React.SetStateAction<IFolder[]>>;
}

const Folders: FC<IProps> = ({ parentId, serchName, setParentFolders }) => {
	const { auth } = useAuthContext();

	const [folders, setFolders] = useState<IFolder[]>([]);
	const [modal, setModal] = useState<EModal | null>(null);
	const [selectedFolder, setSelectedFolder] = useState<IFolder | undefined>(undefined);

	const { data: foldersByParent, isFetching } = useFoldersByParent(parentId, serchName);
	const { mutate: createNewFolder, data: newFolder, isPending: isPendingNewFolder } = useNewFolder();
	const { mutate: updateFolder, data: updatedFolder, isPending: isPendingUpdateFolder } = useUpdateFolder();
	const {
		mutate: updateEditors,
		data: updatedFolderEditors,
		isPending: isPendingUpdateEditors,
	} = useUpdateFolderEditors();

	const updateFolders = (newFolder: IFolder) =>
		setFolders((prev) =>
			prev.map((folder) => {
				if (folder.id === newFolder.id) {
					return newFolder;
				}

				return folder;
			})
		);

	useEffect(() => {
		if (!foldersByParent?.data) return;

		setFolders(foldersByParent.data);
	}, [foldersByParent]);

	useEffect(() => {
		if (!newFolder?.data) return;

		setFolders((prev) => [...prev, newFolder.data]);
		onModalClose();
	}, [newFolder]);

	useEffect(() => {
		if (!updatedFolder?.data) return;

		updateFolders(updatedFolder.data);
		onModalClose();
	}, [updatedFolder]);

	useEffect(() => {
		if (!updatedFolderEditors?.data) return;

		updateFolders(updatedFolderEditors.data);
		onModalClose();
	}, [updatedFolderEditors]);

	const onModalClose = () => setModal(null);

	const onActionBtnClick = (action: EModal, folder?: IFolder) => {
		switch (action) {
			case EModal.New:
				return setModal(EModal.New);

			case EModal.Edit:
				setModal(EModal.Edit);
				setSelectedFolder(folder);
				return;

			case EModal.Permission:
				setModal(EModal.Permission);
				setSelectedFolder(folder);
				break;
		}
	};

	const handleSaveFolderForm = (formValues: IFolderFormValues) => {
		switch (modal) {
			case EModal.New:
				return createNewFolder({ ...formValues, parentId: parentId || undefined });
			case EModal.Edit:
				if (!selectedFolder?.id) return;
				return updateFolder({ ...formValues, id: selectedFolder.id });

			default:
				return;
		}
	};

	const handleSavePermissionsForm = (editors: number[]) => {
		if (!selectedFolder?.id) return;

		const id = selectedFolder.id;
		updateEditors({ id, editorsIds: editors });
	};

	const onFolderClick = (folder: IFolder) => {
		setParentFolders((prev) => [...prev, folder]);
	};

	const deleteFolderFromState = (id: number) =>
		setFolders((prev) => prev.filter((folder) => folder.id !== id));

	const hasFolders = folders.length > 0 && !isFetching;

	return (
		<FoldersStyled>
			<Title>Folders</Title>

			<FoldersList>
				{isFetching && <Loader />}

				{hasFolders &&
					folders.map((folder) => (
						<FoldersItem key={folder.id}>
							<SettingsBtnWrapper>
								{auth.id === folder.userId && folder.isPublic && (
									<button type="button" onClick={() => onActionBtnClick(EModal.Permission, folder)}>
										<svg width="15" height="15">
											<use xlinkHref="/icons/sprite.svg#key" />
										</svg>
									</button>
								)}

								{(auth.id === folder.userId || folder.editorsIds?.includes(auth.id)) && (
									<button type="button" onClick={() => onActionBtnClick(EModal.Edit, folder)}>
										<svg width="20" height="20">
											<use xlinkHref="/icons/sprite.svg#pencil" />
										</svg>
									</button>
								)}
							</SettingsBtnWrapper>

							<Button type="button" onClick={() => onFolderClick(folder)}>
								<Icon width="60" height="60">
									<use xlinkHref="/icons/sprite.svg#folder" />
								</Icon>
							</Button>
							<FolderTitle>{folder.name}</FolderTitle>
						</FoldersItem>
					))}

				{!isFetching && (
					<FoldersItem>
						<SettingsBtnWrapper />
						<Button type="button" onClick={() => onActionBtnClick(EModal.New)}>
							<Icon width="60" height="60">
								<use xlinkHref="/icons/sprite.svg#folder-plus" />
							</Icon>
						</Button>
					</FoldersItem>
				)}
			</FoldersList>

			{modal === EModal.New && (
				<Modal onModalClose={onModalClose}>
					<FolderForm
						isOwner={true}
						isLoading={isPendingNewFolder}
						onSaveClick={handleSaveFolderForm}
						onCancelClick={onModalClose}
					/>
				</Modal>
			)}

			{modal === EModal.Edit && !!selectedFolder && (
				<Modal onModalClose={onModalClose}>
					<FolderForm
						initialFolder={selectedFolder}
						isOwner={auth.id === selectedFolder.userId}
						isLoading={isPendingUpdateFolder}
						onSaveClick={handleSaveFolderForm}
						onCancelClick={onModalClose}
						deleteFolderFromState={deleteFolderFromState}
					/>
				</Modal>
			)}

			{modal === EModal.Permission && !!selectedFolder && (
				<Modal onModalClose={onModalClose}>
					<PermissionForm
						initialEditors={selectedFolder.editorsIds}
						ownerId={auth.id}
						entityName={selectedFolder.name}
						isLoading={isPendingUpdateEditors}
						onSaveClick={handleSavePermissionsForm}
						onCancelClick={onModalClose}
					/>
				</Modal>
			)}
		</FoldersStyled>
	);
};

export default Folders;

const FoldersStyled = styled.div`
	width: 100%;
`;

const Title = styled.h2`
	color: #4c758b;
	margin-top: 10px;
`;

const FoldersList = styled.ul`
	min-height: 74px;
	display: flex;
	align-items: flex-start;
	gap: 10px;
	flex-wrap: wrap;
	padding-bottom: 10px;
`;

const FoldersItem = styled.li`
	width: 60px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	font-size: 16px;
`;

const SettingsBtnWrapper = styled.div`
	min-height: 25px;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 5px;
	margin-bottom: -5px;
`;

const Button = styled.button`
	width: 100%;
	height: 100%;
`;

const Icon = styled.svg`
	fill: #d1c847;
`;

const FolderTitle = styled.div`
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: pre-line;
	word-break: break-word;
`;
