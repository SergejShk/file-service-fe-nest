import { FC } from "react";
import styled from "styled-components";

interface IProps {
	color?: string;
	justifyContent?: string;
	diametr?: string;
}

const Loader: FC<IProps> = ({ color, justifyContent, diametr }) => (
	<LoaderContainer $justifyContent={justifyContent}>
		<LoaderDot $color={color} $diametr={diametr} />
		<LoaderDot $color={color} $diametr={diametr} />
		<LoaderDot $color={color} $diametr={diametr} />
	</LoaderContainer>
);

export default Loader;

const LoaderContainer = styled.div<{ $justifyContent?: string }>`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: ${({ $justifyContent }) => $justifyContent || "center"};
	width: 100%;
	height: 100%;
`;

const LoaderDot = styled.div<{ $color?: string; $diametr?: string }>`
	background-color: ${({ $color }) => $color || "#4c758b"};
	width: ${({ $diametr }) => $diametr || "10px"};
	height: ${({ $diametr }) => $diametr || "10px"};
	border-radius: 100%;
	margin: 3px;
	animation-fill-mode: both;
	display: inline-block;

	&:nth-child(1) {
		animation: animateDots 1.44s -0.24s infinite cubic-bezier(0, 0, 0.4, 1);
	}
	&:nth-child(2) {
		animation: animateDots 1.44s -0.12s infinite cubic-bezier(0, 0, 0.4, 1);
	}
	&:nth-child(3) {
		animation: animateDots 1.44s 0s infinite cubic-bezier(0, 0, 0.4, 1);
	}
`;
