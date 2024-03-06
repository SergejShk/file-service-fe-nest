import { FC } from "react";
import styled from "styled-components";

import { Button } from "../Button";

interface IProps {
	message: string;
	isLoading?: boolean;
	onConfirmClick: () => void;
	onCancelClick: () => void;
}

const ConfirmationForm: FC<IProps> = ({ message, isLoading = false, onConfirmClick, onCancelClick }) => {
	return (
		<ConfirmationFormStyled>
			<Title>Are you sure?</Title>
			<Message>{message}</Message>

			<ButtonWrapper>
				<Button type="button" $minWidth="80px" disabled={isLoading} onClick={onConfirmClick}>
					Yes
				</Button>
				<Button type="button" $minWidth="80px" disabled={isLoading} onClick={onCancelClick}>
					No
				</Button>
			</ButtonWrapper>
		</ConfirmationFormStyled>
	);
};

export default ConfirmationForm;

const ConfirmationFormStyled = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
`;

const Title = styled.p`
	font-size: 20px;
	font-weight: 700;
	text-align: center;
	color: #4c758b;
`;

const Message = styled.p`
	font-size: 18px;
	text-align: center;
`;

const ButtonWrapper = styled.div`
	display: flex;
	justify-content: center;
	gap: 15px;
	margin-top: 10px;
`;
