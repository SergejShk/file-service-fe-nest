import styled from "styled-components";

export const ButtonCross = styled.button`
	cursor: pointer;
	width: 20px;
	height: 20px;
	border-radius: 50%;
	background-image: url("/icons/close-icon.svg");
	background-size: cover;
	background-position: center center;
	background-repeat: no-repeat;
	background-color: transparent;
	align-self: center;
	transition: background-color 0.2s ease;
`;

export const Button = styled.button<{ $minHeight?: string; $minWidth?: string }>`
	min-height: ${({ $minHeight }) => $minHeight || ""};
	min-width: ${({ $minWidth }) => $minWidth || ""};
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 18px;
	font-weight: 600;
	letter-spacing: 0.8px;
	border-radius: 4px;
	padding: 3px 10px;
	color: #484848;
	background-color: #b6d9ee;
	transition: background-color 0.2s ease;

	&:hover {
		background-color: #94caec;
	}

	&:disabled {
		cursor: auto;
		background-color: #b6d9ee;
	}
`;
