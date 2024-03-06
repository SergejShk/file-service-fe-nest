import { FC } from "react";
import Select, { ActionMeta } from "react-select";

import { IDropdownOption } from "../../interfaces/common";
import styled from "styled-components";

interface IProps {
	options: IDropdownOption[];
	value?: IDropdownOption;
	onChange: (newValue: unknown, actionMeta: ActionMeta<unknown>) => void;
	width?: string;
}

const SelectInput: FC<IProps> = ({ options, value, onChange, width }) => {
	return (
		<SelectStyled $width={width}>
			<Select className="customSelect__container" options={options} value={value} onChange={onChange} />
		</SelectStyled>
	);
};

export default SelectInput;

const SelectStyled = styled.div<{ $width?: string }>`
	width: ${({ $width }) => $width || ""};
	.customAsyncSelect__container {
	}
`;
