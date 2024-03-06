import { FC, ReactNode, useEffect } from "react";
import styled from "styled-components";

import { Portal } from "./Portal";

interface IProps {
	height?: string;
	children: ReactNode;
	onModalClose: () => void;
}

const Modal: FC<IProps> = ({ height, children, onModalClose }) => {
	useEffect(() => {
		const body = document.querySelector("body");
		if (!body) return;

		body.style.overflow = "hidden";
		window.addEventListener("keydown", onClicEscape);

		return () => {
			const body = document.querySelector("body");
			if (!body) return;

			body.style.overflow = "auto";
			window.removeEventListener("keydown", onClicEscape);
		};
	});

	const onBackdropClick = (e: React.MouseEvent<HTMLElement>) => {
		e.target === e.currentTarget && onModalClose();
	};

	const onClicEscape = (e: KeyboardEvent) => {
		if (e.code === "Escape") {
			onModalClose();
		}
	};

	return (
		<Portal>
			<Backdrop onClick={onBackdropClick}>
				<ModalWrapper onClick={onBackdropClick}>
					<ModalStyled $height={height}>{children}</ModalStyled>
				</ModalWrapper>
			</Backdrop>
		</Portal>
	);
};

export default Modal;

const Backdrop = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgba(17, 17, 17, 0.6);
	backdrop-filter: blur(10px);
	z-index: 100;
	overflow: auto;
`;

const ModalWrapper = styled.div`
	position: absolute;
	top: 50px;
	left: 50%;
	transform: translateX(-50%);
	min-width: 608px;
	min-height: 100px;
`;

const ModalStyled = styled.div<{ $height?: string }>`
	background-color: #fff;
	border-radius: 8px;
	min-height: ${({ $height }) => $height || "100px"};
	padding: 20px;
`;
