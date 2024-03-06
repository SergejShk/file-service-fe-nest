import { FC, Suspense, useEffect } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

import Loader from "./Loader";

import { useGetMe } from "../../hooks/mutations/auth/useGetMe";

const SharedLayout: FC = () => {
	const { mutate: getMe, isPending } = useGetMe();

	useEffect(() => {
		getMe();
	}, [getMe]);

	if (isPending) {
		return (
			<LoaderWrapper>
				<Loader />
			</LoaderWrapper>
		);
	}

	return (
		<LayoutStyled>
			<Suspense
				fallback={
					<LoaderWrapper>
						<Loader />
					</LoaderWrapper>
				}
			>
				<Outlet />
			</Suspense>
		</LayoutStyled>
	);
};

export default SharedLayout;

const LayoutStyled = styled.div`
	position: relative;
	width: 100%;
	min-height: 100vh;
	margin: 0 auto;
`;

const LoaderWrapper = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
`;
