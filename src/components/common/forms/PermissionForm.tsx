import { FC, useEffect, useMemo, useState } from "react";
import styled from "styled-components";

import { Button } from "../Button";
import SelectInput from "../Select";
import Loader from "../Loader";

import { useGetUsers } from "../../../hooks/mutations/users/useGetUsers";

import { permissionOptions } from "../../../utils/constants";

import { EPermission, IDropdownOption } from "../../../interfaces/common";

interface IProps {
	initialEditors?: number[] | null;
	ownerId: number;
	entityName: string;
	isLoading: boolean;
	onSaveClick: (values: number[]) => void;
	onCancelClick: () => void;
}

const PermissionForm: FC<IProps> = ({
	initialEditors,
	ownerId,
	entityName,
	isLoading,
	onSaveClick,
	onCancelClick,
}) => {
	const [editors, setEditors] = useState<number[]>([]);

	const { data: users, isFetching } = useGetUsers();

	useEffect(() => {
		if (!initialEditors) return;
		setEditors(initialEditors);
	}, [initialEditors]);

	const usersWithoutOwner = useMemo(() => {
		if (!users?.data) return [];

		return users.data.filter((user) => user.id !== ownerId);
	}, [ownerId, users]);

	const handlePermissionChange = (newValue: unknown, userId: number) => {
		const value = (newValue as IDropdownOption)?.value;

		if (value === EPermission.Editor) {
			setEditors((prev) => {
				const isExistEditor = editors.includes(userId);
				return isExistEditor ? prev : [...prev, userId];
			});
			return;
		}

		setEditors((prev) => prev.filter((editor) => editor !== userId));
	};

	const getPermissionValue = (userId: number) => {
		if (editors.includes(userId)) {
			return { value: "editor", label: "Editor" };
		}

		return { value: "viewer", label: "Viewer" };
	};

	return (
		<>
			<Title>Permissions for {entityName}</Title>

			<UsersList>
				{isFetching && <Loader />}

				{usersWithoutOwner.length > 0 && !isFetching && (
					<>
						{usersWithoutOwner.map((user) => (
							<UsersItem key={user.id}>
								<p>{user.email}</p>
								<SelectInput
									options={permissionOptions}
									value={getPermissionValue(user.id)}
									onChange={(newValue: unknown) => handlePermissionChange(newValue, user.id)}
									width="280px"
								/>
							</UsersItem>
						))}
					</>
				)}
			</UsersList>

			<ButtonWrapper>
				<Button disabled={isLoading} onClick={() => onSaveClick(editors)}>
					Save
				</Button>
				<Button type="button" disabled={isLoading} onClick={onCancelClick}>
					Cancel
				</Button>
			</ButtonWrapper>
		</>
	);
};

export default PermissionForm;

const Title = styled.p`
	font-size: 20px;
	font-weight: 700;
	text-align: center;
	color: #4c758b;
	margin-bottom: 15px;
`;

const ButtonWrapper = styled.div`
	display: flex;
	justify-content: flex-end;
	gap: 15px;
	margin-top: 10px;
`;

const UsersList = styled.ul`
	display: flex;
	flex-direction: column;
	gap: 5px;
	margin-bottom: 20px;
`;

const UsersItem = styled.li`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;
