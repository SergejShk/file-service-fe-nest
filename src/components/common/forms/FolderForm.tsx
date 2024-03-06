import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import Checkbox from "../Checkbox";
import Input from "../Input";
import { Button } from "../Button";
import Modal from "../Modal";
import ConfirmationForm from "./ConfirmationForm";

import { useDeleteFolder } from "../../../hooks/mutations/folders/useDeleteFolder";

import { IFolder, IFolderFormValues } from "../../../interfaces/folders";

interface IProps {
	initialFolder?: IFolder;
	isOwner: boolean;
	isLoading: boolean;
	onSaveClick: (values: IFolderFormValues) => void;
	onCancelClick: () => void;
	deleteFolderFromState?: (id: number) => void;
}

const FolderForm: FC<IProps> = ({
	initialFolder,
	isOwner,
	isLoading,
	onSaveClick,
	onCancelClick,
	deleteFolderFromState,
}) => {
	const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

	const { mutate: deleteFolder, isPending, isSuccess } = useDeleteFolder();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFolderFormValues>({
		defaultValues: {
			name: initialFolder?.name || "",
			isPublic: initialFolder?.isPublic || false,
		},
	});

	useEffect(() => {
		if (!isSuccess || !initialFolder || !deleteFolderFromState) return;

		setIsConfirmModalOpen(false);
		deleteFolderFromState(initialFolder?.id);
		onCancelClick();
	}, [isSuccess, deleteFolderFromState, initialFolder, onCancelClick]);

	const onDeleteBtnClick = () => setIsConfirmModalOpen(true);
	const confirmationModalClose = () => setIsConfirmModalOpen(false);

	const handleDeleteFolder = () => {
		if (!initialFolder) return;

		deleteFolder(initialFolder.id);
	};

	return (
		<>
			<FormStyled onSubmit={handleSubmit(onSaveClick)}>
				{isOwner && (
					<LabelisPublic>
						<Checkbox name="isPublic" register={register} />
						<span>Is Publick</span>
					</LabelisPublic>
				)}

				<Input
					type="text"
					name="name"
					label={<NameLabel>Name</NameLabel>}
					placeholder="Name"
					register={register}
					rules={{ required: { value: true, message: "Required" } }}
					error={errors.name}
				/>

				<ButtonWrapper>
					<Button disabled={isLoading}>Save</Button>
					<Button type="button" disabled={isLoading} onClick={onCancelClick}>
						Cancel
					</Button>

					{initialFolder && isOwner && (
						<Button type="button" disabled={isLoading} onClick={onDeleteBtnClick}>
							Delete
						</Button>
					)}
				</ButtonWrapper>
			</FormStyled>

			{isConfirmModalOpen && initialFolder && (
				<Modal onModalClose={confirmationModalClose}>
					<ConfirmationForm
						message={`Do you want to delete a folder "${initialFolder.name}" with all internal files?`}
						onConfirmClick={handleDeleteFolder}
						onCancelClick={confirmationModalClose}
						isLoading={isPending}
					/>
				</Modal>
			)}
		</>
	);
};

export default FolderForm;

const FormStyled = styled.form`
	display: flex;
	flex-direction: column;
	gap: 20px;
`;

const LabelisPublic = styled.label`
	cursor: pointer;
	display: flex;
	align-items: center;
	gap: 8px;
	font-size: 18px;
`;

const ButtonWrapper = styled.div`
	display: flex;
	justify-content: flex-end;
	gap: 15px;
	margin-top: 10px;
`;

const NameLabel = styled.span`
	font-size: 18px;
	margin-bottom: -5px;
`;
