/* @flow */
import * as React from "react";
import * as R from "ramda";
import styled from "styled-components";

type Props = {
  value: Date,
  number: number,
  selectDate: Date => void,
  onHover: Date => void,
  classes: string[],
  isPast: boolean,
  isFuture: boolean,
  isHidden: boolean,
  isHovered: boolean,
  isSelected: boolean,
  isDisabled: boolean,
  isFocused: boolean
};

export const getClasses = (props: Object, isBtn: boolean = false): string => {
  if (props.isHidden) {
    return isBtn ? "hidden-btn" : "hidden";
  }
  if (props.isDisabled) {
    return isBtn ? "disabled-btn" : "disabled";
  }

  if (props.isHovered) {
    return isBtn ? "hovered-btn" : "hovered";
  }
  if (props.isSelected) {
    return isBtn ? "selected-btn" : "selected";
  }
  if (!R.isEmpty(props.classes)) {
    return isBtn
      ? `${props.classes.join(" ")} default-btn`
      : `${props.classes.join(" ")} default`;
  }
  return isBtn ? "default-btn" : "default";
};

const Button = styled.button`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  border-radius: 0;
  :focus {
    outline: none;
  }
`;

const Td = styled.div`
  display: table-cell;
  box-sizing: border-box;
  border: 1px solid #e4e7e7;

  .hidden {
    border: none;
  }
  .hidden-btn {
    opacity: 0;
  }
  .disabled-btn {
    color: gray;
    background: white;
    cursor: default;
    :hover {
      color: gray;
      background: inherit;
    }
  }
  .hovered-btn {
    color: white;
    background: #008000;
    :hover {
      background: #008000;
    }
  }
  .focused-btn {
    color: inherit;
    background: white;
    :hover {
      background: #008000;
      color: white;
    }
  }
  .selected-btn {
    color: white;
    background: #008000;
    :hover {
      background: #329b24;
      color: white;
    }
  }
  .default-btn {
    color: inherit;
    background: white;
    :hover {
      color: inherit;
      background: #e4e7e7;
    }
  }
`;

export default class CustomDay extends React.PureComponent<Props> {
  handleClick = () => {
    const { selectDate, value } = this.props;
    selectDate(value);
  };

  handleHover = () => {
    const { onHover, value } = this.props;
    onHover(value);
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
      isFocused,
      classes
    } = this.props;

    return (
      <Td
        className={getClasses({
          isHidden,
          isSelected,
          isFocused,
          isDisabled,
          isHovered,
          classes
        })}
        isHidden={isHidden}
      >
        <Button
          className={getClasses(
            {
              isHidden,
              isSelected,
              isFocused,
              isDisabled,
              isHovered,
              classes
            },
            true
          )}
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
          isFocused={isFocused}
          number={number}
        >
          {number}
        </Button>
      </Td>
    );
  }
}
