/* @flow */
import * as React from "react";
import styled from "styled-components";
import type { ButtonProps, CalendarDayProps } from ".";

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
    return "inherit";
  }
  if (props.disabled) {
    return props.colors.disabled;
  }
  if (props.isHovered) {
    return "white";
  }
  if (props.isSelected) {
    return "white";
  }

  return "inherit";
};

export const buttonBg = (props: ButtonProps) => {
  if (props.className) {
    return "inherit";
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

  return "white";
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
    return "white";
  }
  return "inherit";
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
  font-size: inherit;

  ${props => !props.isHidden && "cursor: pointer;"};
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
    props.isHidden ? "none" : `1px solid ${props.colors.border}`};
  box-sizing: border-box;
`;

export default class CalendarDay extends React.PureComponent<Props> {
  handleClick = () => {
    const { value, isHidden, selectDate } = this.props;
    if (!isHidden) {
      selectDate(value);
    }
  };

  handleHover = () => {
    const { value, isHidden, onHover } = this.props;
    if (!isHidden) {
      onHover(value);
    }
  };

  props: Props;

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
      customClasses,
      classes
    } = this.props;

    if (classes.day) {
      customClasses.push(classes.day);
    }

    return (
      <Td
        isHidden={isHidden}
        colors={colors}
        className={
          (customClasses &&
            (!isHovered && !isSelected) &&
            customClasses.join(" ")) ||
          classes.day
        }
      >
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
          number={number}
        >
          {number}
        </Button>
      </Td>
    );
  }
}
