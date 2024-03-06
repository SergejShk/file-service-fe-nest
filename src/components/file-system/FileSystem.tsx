import { ChangeEvent, FC, useMemo, useState } from "react";
import debounce from "lodash.debounce";
import styled from "styled-components";

import { Container } from "../common/Container";

import Navigation from "./Navigation";

import Folders from "../folders/Folders";
import Files from "../files/Files";

import { IFolder } from "../../interfaces/folders";

const FileSystem: FC = () => {
	const [parentFolders, setParentFolders] = useState<IFolder[]>([]);
	const [serchName, setSearchName] = useState("");

	const currentFolderId = useMemo(() => {
		if (parentFolders.length > 0) {
			return parentFolders[parentFolders.length - 1].id;
		}

		return 0;
	}, [parentFolders]);

	const onCrumbsClick = (folder?: IFolder) => {
		if (!folder) {
			return setParentFolders([]);
		}
		const folderId = folder.id;
		setParentFolders((prev) => {
			const index = prev.findIndex((f) => f.id === folderId);
			if (index === -1) {
				return prev;
			}

			return prev.slice(0, index + 1);
		});
	};

	const updateSearchValue = debounce((value: string) => {
		setSearchName(value);
	}, 500);

	const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		updateSearchValue(e.target.value);
	};

	return (
		<Container>
			<FileSystemStyled>
				<Navigation
					hasParentsFolders={parentFolders.length > 0}
					parentFolders={parentFolders}
					onCrumbsClick={onCrumbsClick}
				/>

				<InputSearch
					name="name"
					type="text"
					placeholder="Type..."
					onChange={handleSearchInputChange}
					autoComplete="off"
				/>

				<Folders parentId={currentFolderId} serchName={serchName} setParentFolders={setParentFolders} />

				<Devider />

				<Files folderId={currentFolderId} serchName={serchName} />
			</FileSystemStyled>
		</Container>
	);
};

export default FileSystem;

const FileSystemStyled = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`;

const InputSearch = styled.input`
	display: block;
	margin: 0 auto;
	width: 30%;
	border-radius: 4px;
	border: 1px solid #b6d9ee;
	background-color: #fff;
	font-size: 18px;
	line-height: normal;
	letter-spacing: 0.72px;
	color: #484848;
	outline: none;
	padding: 10px;

	&:hover,
	&:focus {
		border-color: #4c758b;
	}
`;

const Devider = styled.div`
	width: 100%;
	height: 1px;
	background-color: #4c758b;
`;
