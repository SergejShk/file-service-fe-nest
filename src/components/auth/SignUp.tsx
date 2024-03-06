import { FC } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import GoogleLink from "../common/GoogleLink";
import Input from "../common/Input";
import { Button } from "../common/Button";

import { useSignup } from "../../hooks/mutations/auth/useSignup";

export interface FormValues {
	email: string;
	password: string;
}

const SignUp: FC = () => {
	const { mutate, error, isPending } = useSignup();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>({
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = ({ email, password }: FormValues) => {
		mutate({ body: { email, password } });
	};

	return (
		<SignUpStyled>
			<TitlePage>Sign up</TitlePage>
			<GoogleLink flow="signup" />

			<FormStyled onSubmit={handleSubmit(onSubmit)}>
				<Input
					type="text"
					name="email"
					label="Email"
					placeholder="Email"
					register={register}
					rules={{
						required: { value: true, message: "Required" },
						pattern: {
							value:
								/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
							message: "Please enter a valid email",
						},
					}}
					error={errors.email}
				/>

				<Input
					type="password"
					name="password"
					label="Password"
					placeholder="Password"
					register={register}
					rules={{
						required: { value: true, message: "Required" },
						minLength: { value: 7, message: "Min length 7 characters" },
						maxLength: { value: 32, message: "Max length 32 characters" },
					}}
					error={errors.password}
				/>

				<Button disabled={isPending} $minHeight="42px">
					Sign up
				</Button>
				{error && <ErrorText>{error?.response?.data || error.message}</ErrorText>}
			</FormStyled>

			<LinkStyled to="/">Log in</LinkStyled>
		</SignUpStyled>
	);
};

export default SignUp;

const SignUpStyled = styled.div`
	width: 100%;
	min-height: inherit;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: #fff;
`;

const TitlePage = styled.p`
	font-size: 24px;
	font-weight: 500;
	line-height: 0.9;
	color: #484848;
	margin-bottom: 15px;
`;

const FormStyled = styled.form`
	position: relative;
	display: flex;
	flex-direction: column;
	gap: 16px;
	width: 300px;
`;

const ErrorText = styled.span`
	position: absolute;
	left: 50%;
	bottom: -30px;
	transform: translateX(-50%);
	font-size: 10px;
	color: #e73f3f;
	font-weight: 400;
`;

const LinkStyled = styled(Link)`
	text-decoration: underline;
	margin-top: 50px;
`;
