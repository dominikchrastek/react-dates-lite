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
  colors: {| [string]: string |},
  isFocused: boolean
};

export type CalendarDayProps = ButtonProps & {
  value: Date,
  number: number,
  selectDate: Date => void,
  onHover: Date => void,
  classes: string[]
};

type Props = CalendarDayProps;

// export const getClasses = (props: Props) => {
//   if (props.isPast || props.isFuture || props.isDisabled) {
//     return props.classes.disabled;
//   }
//   if (props.isHovered) {
//     return props.classes.selected;
//   }
//   if (props.isSelected) {
//     return props.classes.selected;
//   }

//   return props.classes.date;
// };

export const buttonColor = (props: ButtonProps) => {
  if (props.className) {
    return 'inherit';
  }
  if (props.disabled) {
    return props.colors.disabled;
  }
  if (props.isHovered) {
    return 'white';
  }
  if (props.isSelected) {
    return 'white';
  }

  return 'inherit';
};

export const buttonBg = (props: ButtonProps) => {
  if (props.className) {
    return 'inherit';
  }
  if (props.disabled) {
    return props.colors.background;
  }

  if (props.isHovered) {
    return props.colors.selected;
  }
  if (props.isSelected) {
    return props.colors.selected;
  }

  return 'white';
};

export const getHover = (props: ButtonProps) => {
  if (props.isHovered || props.isFocused) {
    return props.colors.selected;
  }
  if (props.isSelected) {
    return props.colors.selectedHover;
  }
  return props.colors.hover;
};

export const getHoverColor = (props: ButtonProps) => {
  if (props.disabled) {
    return props.colors.disabled;
  }
  if (props.isFocused || props.isSelected) {
    return 'white';
  }
  return 'inherit';
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
    color: ${props => getHoverColor(props)};
    background: ${props => getHover(props)};
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
  border: ${props =>
    props.isHidden ? 'none' : `1px solid ${props.colors.border}`};
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
      colors,
      isFocused,
      classes
    } = this.props;

    return (
      <Td
        isHidden={isHidden}
        colors={colors}
        className={classes && (!isHovered && !isSelected) && classes.join(' ')}>
        <Button
          // className={getClasses(this.props)}
          onClick={this.handleClick}
          onMouseOver={this.handleHover}
          onFocus={this.handleHover}
          disabled={isPast || isFuture || isDisabled}
          isSelected={isSelected}
          isHidden={isHidden}
          isPast={isPast}
          isFuture={isFuture}
          isHovered={isHovered}
          isDisabled={isDisabled}
          colors={colors}
          isFocused={isFocused}
          number={number}>
          {number}
        </Button>
      </Td>
    );
  }
}
