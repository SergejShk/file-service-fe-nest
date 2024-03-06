import { FC, useEffect, useState } from "react";
import styled from "styled-components";

import Modal from "../common/Modal";
import FilesForm from "../common/forms/FilesForm";
import PermissionForm from "../common/forms/PermissionForm";
import Loader from "../common/Loader";

import { getFileApi } from "../../services/files/getFile";

import { useAuthContext } from "../../context/AuthContext";

import { useNewFile } from "../../hooks/mutations/files/useNewFile";
import { useFilesByFolder } from "../../hooks/mutations/files/useGetFilesByFolder";
import { useUpdateFile } from "../../hooks/mutations/files/useUpdateFile";
import { useUpdateFileEditors } from "../../hooks/mutations/files/useUpdateFileEditors";

import { EModal } from "../../interfaces/common";
import { IFileApi, IFilesFormValues } from "../../interfaces/files";

interface IProps {
	folderId: number;
	serchName: string;
}

const Files: FC<IProps> = ({ folderId, serchName }) => {
	const { auth } = useAuthContext();

	const [files, setFiles] = useState<IFileApi[]>([]);
	const [selectedFile, setSelectedFile] = useState<IFileApi | undefined>(undefined);
	const [modal, setModal] = useState<EModal | null>(null);

	const { data: filesByFolders, isFetching } = useFilesByFolder(folderId, serchName);
	const { mutate: createNewFile, data: newFile, isPending: isPendingNewFile } = useNewFile();
	const { mutate: updateFile, data: updatedFile, isPending: isPendingUpdateFile } = useUpdateFile();
	const {
		mutate: updateEditors,
		data: updatedFileEditors,
		isPending: isPendingUpdateEditors,
	} = useUpdateFileEditors();

	const updateFiles = (newFile: IFileApi) =>
		setFiles((prev) =>
			prev.map((file) => {
				if (file.id === newFile.id) {
					return newFile;
				}

				return file;
			})
		);

	useEffect(() => {
		if (!filesByFolders?.data) return;

		setFiles(filesByFolders.data);
	}, [filesByFolders]);

	useEffect(() => {
		if (!newFile?.data) return;

		setFiles((prev) => [...prev, newFile.data]);
		onModalClose();
	}, [newFile]);

	useEffect(() => {
		if (!updatedFile?.data) return;

		updateFiles(updatedFile.data);
		onModalClose();
	}, [updatedFile]);

	useEffect(() => {
		if (!updatedFileEditors?.data) return;

		updateFiles(updatedFileEditors.data);
		onModalClose();
	}, [updatedFileEditors]);

	const onModalClose = () => setModal(null);

	const handleSaveFilesForm = (formValues: IFilesFormValues) => {
		switch (modal) {
			case EModal.New:
				return createNewFile({ ...formValues, folderId: folderId || undefined });

			case EModal.Edit:
				if (!selectedFile?.id) return;
				return updateFile({ name: formValues.name, isPublic: formValues.isPublic, id: selectedFile.id });

			default:
				return;
		}
	};

	const onActionBtnClick = (action: EModal, file?: IFileApi) => {
		switch (action) {
			case EModal.New:
				return setModal(EModal.New);

			case EModal.Edit:
				setModal(EModal.Edit);
				setSelectedFile(file);
				return;

			case EModal.Permission:
				setModal(EModal.Permission);
				setSelectedFile(file);
				break;
		}
	};

	const handleSavePermissionsForm = (editors: number[]) => {
		if (!selectedFile?.id) return;

		const id = selectedFile.id;
		updateEditors({ id, editorsIds: editors });
	};

	const onFileClick = async (file: IFileApi) => {
		const response = await getFileApi(file.key);

		if (!response.data) return;

		window.open(response.data, "_blank");
	};

	const deleteFileFromState = (id: number) => setFiles((prev) => prev.filter((file) => file.id !== id));

	const hasFiles = files.length > 0 && !isFetching;

	return (
		<FilesStyled>
			<Title>Files</Title>

			<FilesList>
				{isFetching && <Loader />}

				{hasFiles &&
					files.map((file) => (
						<FilesItem key={file.id}>
							<SettingsBtnWrapper>
								{auth.id === file.userId && file.isPublic && (
									<button type="button" onClick={() => onActionBtnClick(EModal.Permission, file)}>
										<svg width="15" height="15">
											<use xlinkHref="/icons/sprite.svg#key" />
										</svg>
									</button>
								)}

								{(auth.id === file.userId || file.editorsIds?.includes(auth.id)) && (
									<button type="button" onClick={() => onActionBtnClick(EModal.Edit, file)}>
										<svg width="20" height="20">
											<use xlinkHref="/icons/sprite.svg#pencil" />
										</svg>
									</button>
								)}
							</SettingsBtnWrapper>

							<Button type="button" onClick={() => onFileClick(file)}>
								<Icon width="60" height="60">
									<use xlinkHref="/icons/sprite.svg#file" />
								</Icon>
							</Button>
							<FileTitle>{file.name}</FileTitle>
						</FilesItem>
					))}

				{!isFetching && (
					<FilesItem>
						<SettingsBtnWrapper />
						<Button type="button" onClick={() => onActionBtnClick(EModal.New)}>
							<Icon width="60" height="60">
								<use xlinkHref="/icons/sprite.svg#file-plus" />
							</Icon>
						</Button>
					</FilesItem>
				)}
			</FilesList>

			{modal === EModal.New && (
				<Modal onModalClose={onModalClose}>
					<FilesForm
						isOwner={true}
						isLoading={isPendingNewFile}
						onSaveClick={handleSaveFilesForm}
						onCancelClick={onModalClose}
					/>
				</Modal>
			)}

			{modal === EModal.Edit && selectedFile && (
				<Modal onModalClose={onModalClose}>
					<FilesForm
						initialFile={selectedFile}
						isOwner={auth.id === selectedFile.userId}
						isLoading={isPendingUpdateFile}
						onSaveClick={handleSaveFilesForm}
						onCancelClick={onModalClose}
						deleteFileFromState={deleteFileFromState}
					/>
				</Modal>
			)}

			{modal === EModal.Permission && !!selectedFile && (
				<Modal onModalClose={onModalClose}>
					<PermissionForm
						initialEditors={selectedFile.editorsIds}
						ownerId={auth.id}
						entityName={selectedFile.name}
						isLoading={isPendingUpdateEditors}
						onSaveClick={handleSavePermissionsForm}
						onCancelClick={onModalClose}
					/>
				</Modal>
			)}
		</FilesStyled>
	);
};

export default Files;

const FilesStyled = styled.div`
	width: 100%;
`;

const Title = styled.h2`
	color: #4c758b;
	margin-top: 10px;
`;

const FilesList = styled.ul`
	min-height: 74px;
	display: flex;
	align-items: flex-start;
	gap: 10px;
	flex-wrap: wrap;
	padding-bottom: 10px;
`;

const FilesItem = styled.li`
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
	fill: #ccc;
`;

const FileTitle = styled.div`
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: pre-line;
	word-break: break-word;
`;
