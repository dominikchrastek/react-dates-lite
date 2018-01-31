/* @flow */
import * as React from 'react';
import styled from 'styled-components';

type ButtonProps = {
  isPast: boolean,
  isFuture: boolean,
  isHidden: boolean,
  isHovered: boolean,
  isSelected: boolean,
  isDisabled: boolean,
  colors: {| [string]: string |}
};

type Props = ButtonProps & {
  value: Date,
  number: number,
  selectDate: Date => void,
  onHover: Date => void,
  // eslint-disable-next-line react/no-unused-prop-types
  classes: {| [string]: string |}
};

export const getClasses = (props: Props) => {
  if (props.isPast || props.isFuture || props.isDisabled) {
    return props.classes.disabled;
  }
  if (props.isHovered) {
    return props.classes.hovered;
  }
  if (props.isSelected) {
    return props.classes.selected;
  }

  return props.classes.date;
};

export const buttonColor = (props: ButtonProps) => {
  if (props.className) {
    return 'inherit';
  }
  if (props.isPast || props.isFuture) {
    return 'inherit';
  }
  if (props.isHovered) {
    return 'white';
  }
  if (props.isSelected) {
    return 'white';
  }

  return 'inherit';
};

const buttonBg = (props: ButtonProps) => {
  if (props.className) {
    return 'inherit';
  }
  if (props.isPast || props.isFuture) {
    return 'white';
  }

  if (props.isHovered) {
    return props.colors.hovered;
  }
  if (props.isSelected) {
    return props.colors.selected;
  }

  return 'white';
};

const Button = styled.button`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${props => (props.isHidden ? 0 : 1)};
  color: ${props => buttonColor(props)};
  background: ${props => buttonBg(props)};
  border: none;
  cursor: pointer;
  border-radius: 0;
  :hover {
    background: ${props =>
      props.isHovered ? props.colors.hovered : props.colors.hover};
  }
  :disabled {
    cursor: default;
    :hover {
      background: inherit;
    }
  }
  :focus {
    outline: none;
  }
`;

const Td = styled.div`
  display: table-cell;
  border: ${props => (props.isHidden ? 'none' : '1px solid #e4e7e7')};
  box-sizing: border-box;
`;

export default class CalendarDay extends React.PureComponent<Props> {
  props: Props;

  handleClick = () => {
    this.props.selectDate(this.props.value);
  };

  handleHover = () => {
    this.props.onHover(this.props.value);
  };

  render() {
    const {
      isHidden,
      number,
      isPast,
      isFuture,
      isSelected,
      isDisabled,
      isHovered,
      colors
    } = this.props;

    return (
      <Td isHidden={isHidden}>
        <Button
          className={getClasses(this.props)}
          data-test="CalendarDay"
          onClick={this.handleClick}
          onMouseOver={this.handleHover}
          onFocus={this.handleHover}
          disabled={isPast || isFuture || isDisabled}
          isSelected={isSelected}
          isHidden={isHidden}
          isPast={isPast}
          isFuture={isFuture}
          isHovered={isHovered}
          colors={colors}>
          {number}
        </Button>
      </Td>
    );
  }
}
