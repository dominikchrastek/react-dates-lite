import React from "react";
import { shallow, mount } from "enzyme";
import MockDate from "mockdate";

import * as utils from "../utils";

import Calendar, { getWidth } from "../Calendar";

describe("#Calendar", () => {
  const yesterday = new Date(2018, 2, 9);
  const today = new Date(2018, 2, 10);
  const tomorrow = new Date(2018, 2, 11);
  // const month = new Date(2018, 2, 2);
  const prevMonth = new Date(2018, 1, 1);
  const nextMonth = new Date(2018, 3, 3);
  beforeEach(() => {
    MockDate.set("2/31/2018");
  });
  afterEach(() => {
    MockDate.reset();
  });
  describe("methods", () => {
    it("should render correctly", () => {
      const wrapper = shallow(
        <Calendar
          className="wrapper"
          visibleMonths={3}
          firstMonth={prevMonth}
          lastMonth={nextMonth}
          selectedDates={[]}
          selectDates={jest.fn()}
          future={false}
          rangeSelect
        />
      );
      expect(wrapper.getElement()).toMatchSnapshot();
    });

    it("should render correctly with future enabled", () => {
      const wrapper = shallow(
        <Calendar
          className="wrapper"
          visibleMonths={3}
          firstMonth={prevMonth}
          lastMonth={nextMonth}
          selectedDates={[]}
          selectDates={jest.fn()}
          future
          rangeSelect
        />
      );
      expect(wrapper.getElement()).toMatchSnapshot();
    });

    it("should render correctly with allowedDates", () => {
      const wrapper = shallow(
        <Calendar
          className="wrapper"
          visibleMonths={3}
          firstMonth={prevMonth}
          lastMonth={nextMonth}
          selectedDates={[]}
          allowedDates={[today]}
          selectDates={jest.fn()}
          future
          rangeSelect
        />
      );
      expect(wrapper.getElement()).toMatchSnapshot();
    });

    it("should render correctly with custom icons", () => {
      const wrapper = shallow(
        <Calendar
          className="wrapper"
          visibleMonths={3}
          firstMonth={prevMonth}
          lastMonth={nextMonth}
          selectedDates={[]}
          selectDates={jest.fn()}
          future={false}
          rangeSelect
          buttonLeft={<div>back</div>}
          buttonForward={<div>forward</div>}
        />
      );
      expect(wrapper.getElement()).toMatchSnapshot();
    });

    it("rdl-prev-button should works", () => {
      const wrapper = mount(
        <Calendar
          className="wrapper"
          visibleMonths={1}
          firstMonth={prevMonth}
          lastMonth={nextMonth}
          selectedDates={[]}
          selectDates={jest.fn()}
          rangeSelect
        />
      );

      const node = wrapper.instance();
      expect(node.state.currentMonth).toBe(1);
      wrapper
        .find('[data-test="rdl-next-button"]')
        .at(1)
        .simulate("click");

      expect(node.state.currentMonth).toBe(2);
      wrapper
        .find('[data-test="rdl-next-button"]')
        .at(1)
        .simulate("click");
      expect(
        wrapper
          .find('[data-test="rdl-next-button"]')
          .at(1)
          .is("[disabled]")
      ).toBeTruthy();
      expect(node.state.currentMonth).toBe(2);
    });

    it("rdl-prev-button should works", () => {
      const wrapper = mount(
        <Calendar
          className="wrapper"
          visibleMonths={1}
          firstMonth={prevMonth}
          lastMonth={nextMonth}
          selectedDates={[]}
          selectDates={jest.fn()}
          rangeSelect
        />
      );

      const node = wrapper.instance();

      expect(node.state.currentMonth).toBe(1);
      wrapper
        .find('[data-test="rdl-prev-button"]')
        .at(1)
        .simulate("click");

      expect(node.state.currentMonth).toBe(0);
      wrapper
        .find('[data-test="rdl-prev-button"]')
        .at(1)
        .simulate("click");
      expect(
        wrapper
          .find('[data-test="rdl-prev-button"]')
          .at(1)
          .is("[disabled]")
      ).toBeTruthy();
      expect(node.state.currentMonth).toBe(0);
    });

    it("handleSelect select range: prev date - next date", () => {
      const selectDates = jest.fn();
      const wrapper = shallow(
        <Calendar
          className="wrapper"
          visibleMonths={1}
          firstMonth={prevMonth}
          lastMonth={nextMonth}
          selectedDates={[]}
          selectDates={selectDates}
          rangeSelect
        />
      );

      const node = wrapper.instance();

      node.handleSelect(yesterday);

      expect(node.state.start).toBe(yesterday);
      expect(node.state.isFocused).toBe(true);
      expect(node.state.selectedInternally).toBe(true);
      // call selectDates with selected dates
      expect(selectDates).toBeCalledWith([yesterday]);

      node.handleSelect(today);
      expect(node.state.end).toBe(today);
      expect(node.state.isFocused).toBe(false);
      expect(node.state.hoveredDates).toEqual([]);
      expect(node.state.selectedInternally).toBe(true);

      // handleSetSelected should be called
      expect(node.state.selectedInternally).toBe(true);
      expect(selectDates).toBeCalledWith([yesterday, today]);
    });

    it("handleSelect select range: next date - prev date", () => {
      const selectDates = jest.fn();
      const wrapper = shallow(
        <Calendar
          className="wrapper"
          visibleMonths={1}
          firstMonth={prevMonth}
          lastMonth={nextMonth}
          selectedDates={[]}
          selectDates={selectDates}
          rangeSelect
        />
      );

      const node = wrapper.instance();

      node.handleSelect(today);
      expect(node.state.start).toBe(today);
      expect(node.state.isFocused).toBe(true);
      expect(node.state.hoveredDates).toEqual([]);
      expect(node.state.selectedInternally).toBe(true);
      // call selectDates with selected dates
      expect(selectDates).toBeCalledWith([today]);

      node.handleSelect(yesterday);
      expect(node.state.end).toBe(yesterday);
      expect(node.state.isFocused).toBe(false);
      expect(node.state.selectedInternally).toBe(true);

      // handleSetSelected should be called
      expect(node.state.selectedInternally).toBe(true);
      expect(selectDates).toBeCalledWith([yesterday, today]);
    });
    it("handleSelect select same day and then unselect", () => {
      const selectDates = jest.fn();
      const wrapper = mount(
        <Calendar
          className="wrapper"
          visibleMonths={1}
          firstMonth={prevMonth}
          lastMonth={nextMonth}
          selectedDates={[]}
          selectDates={selectDates}
          rangeSelect
        />
      );

      const node = wrapper.instance();

      node.handleSelect(today);

      expect(node.state.start).toBe(today);
      expect(node.state.isFocused).toBe(true);
      expect(node.state.selectedInternally).toBe(true);
      // call selectDates with selected dates
      expect(selectDates).toBeCalledWith([today]);

      node.handleSelect(today);
      expect(node.state.end).toBe(today);
      expect(node.state.isFocused).toBe(false);
      expect(node.state.selectedInternally).toBe(true);

      // handleSetSelected should be called
      expect(node.state.selectedInternally).toBe(true);
      expect(selectDates).toBeCalledWith([today]);

      // unselect
      node.handleSelect(today);
      expect(node.state.start).toBe(null);
      expect(node.state.end).toBe(null);
      expect(node.state.isFocused).toBe(false);
      expect(node.state.selectedInternally).toBe(true);
      expect(selectDates).toBeCalledWith([]);
    });
    it("handleSetRange - nothing should happend", () => {
      const selectDates = jest.fn();
      const wrapper = mount(
        <Calendar
          className="wrapper"
          visibleMonths={1}
          firstMonth={prevMonth}
          lastMonth={nextMonth}
          selectedDates={[]}
          selectDates={selectDates}
          rangeSelect
        />
      );

      const node = wrapper.instance();

      node.handleSetRange(today);
      expect(selectDates).not.toBeCalled();
    });

    it("handleHover - select date and hover it", () => {
      const selectDates = jest.fn();
      const wrapper = mount(
        <Calendar
          className="wrapper"
          visibleMonths={1}
          firstMonth={prevMonth}
          lastMonth={nextMonth}
          selectedDates={[]}
          selectDates={selectDates}
          rangeSelect
        />
      );

      const node = wrapper.instance();
      node.handleSelect(today);

      expect(node.state.start).toBe(today);
      expect(node.state.isFocused).toBe(true);
      expect(node.state.selectedInternally).toBe(true);
      // call selectDates with selected dates
      expect(selectDates).toBeCalledWith([today]);

      node.handleHover(today);
      expect(node.state.hoveredDates).toEqual([today]);
    });

    it("handleHover - select date and hover next date", () => {
      const selectDates = jest.fn();
      const wrapper = mount(
        <Calendar
          className="wrapper"
          visibleMonths={1}
          firstMonth={prevMonth}
          lastMonth={nextMonth}
          selectedDates={[]}
          selectDates={selectDates}
          rangeSelect
        />
      );

      const node = wrapper.instance();
      node.handleSelect(today);

      expect(node.state.start).toBe(today);
      expect(node.state.isFocused).toBe(true);
      expect(node.state.selectedInternally).toBe(true);
      // call selectDates with selected dates
      expect(selectDates).toBeCalledWith([today]);

      node.handleHover(tomorrow);
      expect(node.state.hoveredDates).toEqual([today, tomorrow]);
    });

    it("handleHover - select date and hover prev date", () => {
      const selectDates = jest.fn();
      const wrapper = mount(
        <Calendar
          className="wrapper"
          visibleMonths={1}
          firstMonth={prevMonth}
          lastMonth={nextMonth}
          selectedDates={[]}
          selectDates={selectDates}
          rangeSelect
        />
      );

      const node = wrapper.instance();
      node.handleSelect(today);

      expect(node.state.start).toBe(today);
      expect(node.state.isFocused).toBe(true);
      expect(node.state.selectedInternally).toBe(true);
      // call selectDates with selected dates
      expect(selectDates).toBeCalledWith([today]);

      node.handleHover(yesterday);
      expect(node.state.hoveredDates).toEqual([yesterday, today]);
    });

    it("handleHover - nothing should happend", () => {
      const selectDates = jest.fn();
      const wrapper = mount(
        <Calendar
          className="wrapper"
          visibleMonths={1}
          firstMonth={prevMonth}
          lastMonth={nextMonth}
          selectedDates={[]}
          selectDates={selectDates}
          rangeSelect
        />
      );

      const node = wrapper.instance();

      node.handleHover(today);
      expect(node.state.hoveredDates).toEqual([]);
    });

    it("handleSetCurrentMonth - componentWillUpdate, selected externally", () => {
      const nextProps = {
        selectedDates: today
      };
      const nextState = {
        selectedInternally: false
      };
      const selectDates = jest.fn();
      const wrapper = mount(
        <Calendar
          className="wrapper"
          visibleMonths={1}
          firstMonth={prevMonth}
          lastMonth={nextMonth}
          selectedDates={[]}
          selectDates={selectDates}
          rangeSelect
        />
      );

      const node = wrapper.instance();
      node.componentWillUpdate(nextProps, nextState);

      // handleSetCurrentMonth should be called
      const currentMonth = utils.getCurrentMonthIndex(
        node.props.firstMonth,
        node.props.lastMonth,
        nextProps.selectedDates,
        node.props.future,
        node.props.visibleMonths
      );

      expect(node.state.selectedInternally).toBe(false);
      expect(node.state.currentMonth).toBe(currentMonth);
    });
    it("handleSetCurrentMonth - componentWillUpdate, selected internally", () => {
      const nextProps = {
        selectedDates: today
      };
      const nextState = {
        selectedInternally: true
      };
      const selectDates = jest.fn();
      const wrapper = mount(
        <Calendar
          className="wrapper"
          visibleMonths={1}
          firstMonth={prevMonth}
          lastMonth={nextMonth}
          selectedDates={[]}
          selectDates={selectDates}
          rangeSelect
        />
      );

      const node = wrapper.instance();
      node.componentWillUpdate(nextProps, nextState);

      // handleSetCurrentMonth should be called
      const currentMonth = utils.getCurrentMonthIndex(
        node.props.firstMonth,
        node.props.lastMonth,
        nextProps.selectedDates,
        node.props.future,
        node.props.visibleMonths
      );

      expect(node.state.selectedInternally).toBe(false);
      expect(node.state.currentMonth).not.toBe(currentMonth);
    });

    it("should render without month and week days names", () => {
      const wrapper = shallow(
        <Calendar
          className="wrapper"
          visibleMonths={3}
          firstMonth={prevMonth}
          lastMonth={nextMonth}
          selectedDates={[]}
          selectDates={jest.fn()}
          future={false}
          rangeSelect
          showMonthName={false}
          showWeekDayNames={false}
        />
      );
      expect(wrapper.getElement()).toMatchSnapshot();
    });
  });

  describe("helpers", () => {
    it("getWidth", () => {
      expect(getWidth(1, 301)).toBe("301px");
      expect(getWidth(3, 301)).toBe(`903px`);
      expect(getWidth(5, 200)).toBe(`1000px`);
    });
  });
});
