// @flow strict
import * as React from "react";
import styled, { withTheme } from "styled-components";

type Props = {
  value: string,
  onClick: () => void,
  placeholder?: string,
  className?: ?string
};

const StyledInput = styled.input`
  width: 321px;
  max-width: 321px;
  margin-top: 10px;
  margin-bottom: 24px;
  padding: 11px;
  text-decoration: none;
  background-color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const InputButton = ({ value, placeholder, className, onClick }: Props) => (
  <StyledInput
    readOnly
    type="text"
    value={value}
    placeholder={placeholder}
    className={className}
    onClick={onClick}
  />
);

InputButton.defaultProps = {
  className: null,
  placeholder: ""
};

// $FlowFixMe
export default withTheme(InputButton);
