import { ReactNode } from "react";
import { FieldError, FieldValues, Path, RegisterOptions, UseFormRegister } from "react-hook-form";
import styled from "styled-components";

type InputProps<TFormValues extends FieldValues> = {
	name: Path<TFormValues>;
	type: string;
	label?: string | ReactNode;
	placeholder?: string;
	register?: UseFormRegister<TFormValues>;
	rules?: RegisterOptions;
	error?: FieldError;
	disabled?: boolean;
};

const Input = <TFormValues extends FieldValues>({
	name,
	type,
	label,
	placeholder,
	register,
	rules,
	error,
	disabled = false,
}: InputProps<TFormValues>) => {
	const hasError = !!(error && error.message);

	return (
		<InputWrapper>
			<Label>
				{label && label}
				<InputStyled
					id={name}
					name={name}
					type={type}
					placeholder={placeholder}
					{...(register && register(name, rules))}
					aria-invalid={hasError ? "true" : "false"}
					autoComplete="off"
					disabled={disabled}
				/>
			</Label>
			{hasError && <ErrorText role="alert">{error.message}</ErrorText>}
		</InputWrapper>
	);
};

export default Input;

const InputWrapper = styled.div`
	position: relative;
	width: 100%;
	display: flex;
	flex-direction: column;
`;

const Label = styled.label`
	cursor: pointer;
	display: flex;
	flex-direction: column;
	gap: 12px;
	font-size: 24px;
	font-weight: 500;
	line-height: 0.9;
	color: #484848;
`;

const InputStyled = styled.input`
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

	&:disabled:hover,
	&:disabled:focus {
		border-color: #b6d9ee;
	}
`;

const ErrorText = styled.span`
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	bottom: -15px;
	font-size: 10px;
	color: #e73f3f;
`;
