import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { FieldValues, Path, RegisterOptions, UseFormRegister } from "react-hook-form";
import styled from "styled-components";

type CheckboxProps<TFormValues extends FieldValues> = {
	name: Path<TFormValues>;
	rules?: RegisterOptions;
	width?: string;
	height?: string;
	register?: UseFormRegister<TFormValues>;
} & Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "size" | "ref">;

const Checkbox = <TFormValues extends FieldValues>({
	name,
	width,
	height,
	rules,
	register,
	...props
}: CheckboxProps<TFormValues>) => {
	return (
		<CheckboxStyled $width={width} $height={height}>
			<input
				type="checkbox"
				name={name}
				className="hidden"
				{...props}
				{...(register && register(name, rules))}
			/>
			<IconCheck className="checkbox__icon" />
		</CheckboxStyled>
	);
};

export default Checkbox;

const CheckboxStyled = styled.label<{ $width?: string; $height?: string }>`
	cursor: pointer;
	display: block;
	width: ${({ $width }) => $width || "20px"};
	height: ${({ $height }) => $height || "20px"};
	border-radius: 4px;
	border: 1px solid #ccc;

	& input:checked + .checkbox__icon {
		background-image: url("/icons/check.svg");
		background-size: cover;
		background-position: center center;
		background-repeat: no-repeat;
	}
`;

const IconCheck = styled.div`
	width: 100%;
	height: 100%;
`;
