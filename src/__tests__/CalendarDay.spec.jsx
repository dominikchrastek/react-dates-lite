import React from "react";
import { shallow } from "enzyme";

import getDate from "date-fns/getDate";

import CalendarDay, {
  buttonBg,
  buttonColor,
  getHover,
  getHoverColor
} from "../CalendarDay";

describe("#CalendarDay", () => {
  const date = new Date(2018, 1, 1);
  const classes = {
    disabled: "disabled",
    selected: "selected",
    date: "default"
  };

  const colors = {
    inherit: "inherit",
    white: "white",
    selected: "selected",
    disabled: "disabled",
    background: "background",
    selectedHover: "selectedHover",
    hover: "hover"
  };
  describe("methods", () => {
    it("should render correctly", () => {
      const wrapper = shallow(
        <CalendarDay
          isHidden={false}
          number={getDate(date)}
          value={date}
          selectDate={jest.fn()}
          onHover={jest.fn()}
          isHovered={false}
          isSelected={false}
          isPast={false}
          isFuture={false}
          colors={{}}
          customClasses={[]}
          classes={{}}
        />
      );
      expect(wrapper.getElement()).toMatchSnapshot();
    });
    it("should render with class day", () => {
      const wrapper = shallow(
        <CalendarDay
          isHidden={false}
          number={getDate(date)}
          value={date}
          selectDate={jest.fn()}
          onHover={jest.fn()}
          isHovered={false}
          isSelected={false}
          isPast={false}
          isFuture={false}
          colors={{}}
          customClasses={[]}
          classes={{
            day: "day"
          }}
        />
      );
      expect(wrapper.getElement()).toMatchSnapshot();
    });
    it("should render joined classes", () => {
      const wrapper = shallow(
        <CalendarDay
          isHidden={false}
          number={getDate(date)}
          value={date}
          selectDate={jest.fn()}
          onHover={jest.fn()}
          isHovered={false}
          isSelected={false}
          isPast={false}
          isFuture={false}
          colors={{}}
          customClasses={["hey", "hou"]}
          classes={{}}
        />
      );
      expect(wrapper.getElement()).toMatchSnapshot();
    });
    it("should render with joined & class day", () => {
      const wrapper = shallow(
        <CalendarDay
          isHidden={false}
          number={getDate(date)}
          value={date}
          selectDate={jest.fn()}
          onHover={jest.fn()}
          isHovered={false}
          isSelected={false}
          isPast={false}
          isFuture={false}
          colors={{}}
          customClasses={["hey", "hou"]}
          classes={{
            day: "day"
          }}
        />
      );
      expect(wrapper.getElement()).toMatchSnapshot();
    });
    it("should render hidden", () => {
      const wrapper = shallow(
        <CalendarDay
          isHidden
          number={getDate(date)}
          value={date}
          selectDate={jest.fn()}
          onHover={jest.fn()}
          isHovered={false}
          isSelected={false}
          isPast={false}
          isFuture={false}
          colors={{}}
          customClasses={[]}
          classes={{}}
        />
      );
      expect(wrapper.getElement()).toMatchSnapshot();
    });

    it("should handleHover", () => {
      const onHover = jest.fn();
      const wrapper = shallow(
        <CalendarDay
          isHidden={false}
          number={getDate(date)}
          value={date}
          selectDate={jest.fn()}
          onHover={onHover}
          isHovered={false}
          isSelected={false}
          isPast={false}
          isFuture={false}
          colors={{}}
          customClasses={[]}
          classes={{}}
        />
      );

      const node = wrapper.instance();
      node.handleHover();

      expect(onHover).toBeCalledWith(date);
    });

    it("should not handleHover (isHidden)", () => {
      const onHover = jest.fn();
      const wrapper = shallow(
        <CalendarDay
          isHidden
          number={getDate(date)}
          value={date}
          selectDate={jest.fn()}
          onHover={onHover}
          isHovered={false}
          isSelected={false}
          isPast={false}
          isFuture={false}
          colors={{}}
          customClasses={[]}
          classes={{}}
        />
      );

      const node = wrapper.instance();
      node.handleHover();

      expect(onHover).not.toBeCalled();
    });

    it("should handleClick", () => {
      const onClick = jest.fn();
      const wrapper = shallow(
        <CalendarDay
          isHidden={false}
          number={getDate(date)}
          value={date}
          selectDate={onClick}
          onHover={jest.fn()}
          isHovered={false}
          isSelected={false}
          isPast={false}
          isFuture={false}
          colors={{}}
          customClasses={[]}
          classes={{}}
        />
      );

      const node = wrapper.instance();
      node.handleClick();

      expect(onClick).toBeCalledWith(date);
    });

    it("should not handleClick (isHidden)", () => {
      const onClick = jest.fn();
      const wrapper = shallow(
        <CalendarDay
          isHidden
          number={getDate(date)}
          value={date}
          selectDate={onClick}
          onHover={jest.fn()}
          isHovered={false}
          isSelected={false}
          isPast={false}
          isFuture={false}
          colors={{}}
          customClasses={[]}
          classes={{}}
        />
      );

      const node = wrapper.instance();
      node.handleClick();

      expect(onClick).not.toBeCalled();
    });
  });

  describe("helpers", () => {
    const props = (prop, className = null) => ({
      [prop]: true,
      className,
      classes,
      colors
    });
    // it('getClasses', () => {
    //   expect(getClasses(props('isPast'))).toBe(classes.disabled);
    //   expect(getClasses(props('isFuture'))).toBe(classes.disabled);
    //   expect(getClasses(props('isDisabled'))).toBe(classes.disabled);
    //   expect(getClasses(props('isHovered'))).toBe(classes.selected);
    //   expect(getClasses(props('isSelected'))).toBe(classes.selected);
    //   expect(getClasses({ classes })).toBe(classes.date);
    // });
    it("buttonColor", () => {
      expect(buttonColor(props("isPast", "class"))).toBe(colors.inherit);
      expect(buttonColor(props("isFuture"))).toBe(colors.inherit);
      expect(buttonColor(props("isPast"))).toBe(colors.inherit);
      expect(buttonColor(props("disabled"))).toBe(colors.disabled);
      expect(buttonColor(props("isHovered"))).toBe(colors.white);
      expect(buttonColor(props("isSelected"))).toBe(colors.white);
      expect(buttonColor({ colors })).toBe(colors.inherit);
    });
    it("buttonBg", () => {
      expect(buttonBg(props("isPast", "class"))).toBe(colors.inherit);
      expect(buttonBg(props("isFuture"))).toBe(colors.white);
      expect(buttonBg(props("isPast"))).toBe(colors.white);
      expect(buttonBg(props("disabled"))).toBe(colors.background);
      expect(buttonBg(props("isHovered"))).toBe(colors.selected);
      expect(buttonBg(props("isSelected"))).toBe(colors.selected);
      expect(buttonBg({ colors })).toBe(colors.white);
    });
    it("getHover", () => {
      expect(getHover(props("isHovered"))).toBe(colors.selected);
      expect(getHover(props("isFocused"))).toBe(colors.selected);
      expect(getHover(props("isSelected"))).toBe(colors.selectedHover);
      expect(getHover(props("isPast"))).toBe(colors.hover);
    });
    it("getHoverColor", () => {
      expect(getHoverColor(props("disabled"))).toBe(colors.disabled);
      expect(getHoverColor(props("isFocused"))).toBe(colors.white);
      expect(getHoverColor(props("isSelected"))).toBe(colors.white);
      expect(getHoverColor(props("isPast"))).toBe(colors.inherit);
    });
  });
});
