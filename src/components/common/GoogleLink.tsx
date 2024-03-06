import { FC } from "react";
import styled from "styled-components";

const BASE_URL = import.meta.env.VITE_BASE_URL;

interface IProps {
	flow: "signup" | "login";
}

const GoogleLink: FC<IProps> = ({ flow }) => {
	return <GoogleLinkStyled href={`${BASE_URL}/auth/google`} $flow={flow} aria-label="google" />;
};

export default GoogleLink;

const GoogleLinkStyled = styled.a<{ $flow: "signup" | "login" }>`
	width: 190px;
	height: 40px;
	background-image: ${({ $flow }) =>
		$flow === "signup" ? 'url("/icons/google-signup.svg")' : 'url("/icons/google-continue.svg")'};
	background-size: auto;
	background-position: center center;
	background-repeat: no-repeat;
	margin-bottom: 20px;
`;
