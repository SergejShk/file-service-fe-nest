import { FC } from "react";
import styled from "styled-components";

import { IFolder } from "../../interfaces/folders";

interface IProps {
	hasParentsFolders: boolean;
	parentFolders: IFolder[];
	onCrumbsClick: (folder?: IFolder) => void;
}

const Navigation: FC<IProps> = ({ hasParentsFolders, parentFolders, onCrumbsClick }) => {
	return (
		<>
			<SubTitle>Navigation:</SubTitle>
			<NavList>
				<NavItem>
					<CrumbBtn type="button" onClick={() => onCrumbsClick()}>
						Main Folder
					</CrumbBtn>
				</NavItem>

				{hasParentsFolders &&
					parentFolders.map((folder) => (
						<NavItem key={folder.id}>
							<SignMore>{">"}</SignMore>
							<CrumbBtn type="button" onClick={() => onCrumbsClick(folder)}>
								{folder.name}
							</CrumbBtn>
						</NavItem>
					))}
			</NavList>
		</>
	);
};

export default Navigation;

const SubTitle = styled.p`
	font-weight: 700;
	color: #4c758b;
	margin-top: 15px;
`;

const NavList = styled.ul`
	display: flex;
	align-items: center;
	gap: 5px;
	flex-wrap: wrap;
	margin-bottom: 20px;
`;

const NavItem = styled.li`
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 16px;
`;

const CrumbBtn = styled.button`
	font-size: 18px;
`;

const SignMore = styled.span`
	margin-right: 5px;
`;
