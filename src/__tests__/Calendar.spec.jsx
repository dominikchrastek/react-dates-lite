import React from 'react';
import { shallow, mount } from 'enzyme';

import * as utils from '../utils';

import MockDate from 'mockdate';

import Calendar, { getWidth } from '../Calendar';

describe('#Calendar', () => {
  const yesterday = new Date(2018, 2, 9);
  const today = new Date(2018, 2, 10);
  const tomorrow = new Date(2018, 2, 11);
  beforeEach(() => {
    MockDate.set('1/31/2018');
  });
  afterEach(() => {
    MockDate.reset();
  });
  describe('methods', () => {
    it('should render correctly', () => {
      const wrapper = shallow(
        <Calendar
          className="wrapper"
          visibleMonths={3}
          numberOfMonths={3}
          numberOfPastMonths={10}
          selectedDays={[]}
          selectDays={jest.fn()}
          future={false}
        />
      );
      expect(wrapper.getElement()).toMatchSnapshot();
    });
    it('should render correctly with future enabled', () => {
      const wrapper = shallow(
        <Calendar
          className="wrapper"
          visibleMonths={3}
          numberOfMonths={3}
          numberOfPastMonths={10}
          selectedDays={[]}
          selectDays={jest.fn()}
          future
        />
      );
      expect(wrapper.getElement()).toMatchSnapshot();
    });

    it('rdl-prev-button should works', () => {
      const wrapper = mount(
        <Calendar
          className="wrapper"
          visibleMonths={1}
          numberOfMonths={2}
          numberOfPastMonths={2}
          selectedDays={[]}
          selectDays={jest.fn()}
        />
      );

      const node = wrapper.instance();

      expect(node.state.currentMonth).toBe(2);
      wrapper
        .find('[data-test="rdl-next-button"]')
        .at(1)
        .simulate('click');

      expect(node.state.currentMonth).toBe(3);
      wrapper
        .find('[data-test="rdl-next-button"]')
        .at(1)
        .simulate('click');
      expect(
        wrapper
          .find('[data-test="rdl-next-button"]')
          .at(1)
          .is('[disabled]')
      ).toBeTruthy();
      expect(node.state.currentMonth).toBe(3);
    });
    it('rdl-prev-button should works', () => {
      const wrapper = mount(
        <Calendar
          className="wrapper"
          visibleMonths={1}
          numberOfMonths={2}
          numberOfPastMonths={2}
          selectedDays={[]}
          selectDays={jest.fn()}
        />
      );

      const node = wrapper.instance();

      expect(node.state.currentMonth).toBe(2);
      wrapper
        .find('[data-test="rdl-prev-button"]')
        .at(1)
        .simulate('click');

      expect(node.state.currentMonth).toBe(1);
      wrapper
        .find('[data-test="rdl-prev-button"]')
        .at(1)
        .simulate('click');
      expect(
        wrapper
          .find('[data-test="rdl-prev-button"]')
          .at(1)
          .is('[disabled]')
      ).toBeTruthy();
      expect(node.state.currentMonth).toBe(0);
    });

    it('handleSelect select range: prev date - next date', () => {
      const selectDays = jest.fn();
      const wrapper = shallow(
        <Calendar
          className="wrapper"
          visibleMonths={1}
          numberOfMonths={2}
          numberOfPastMonths={2}
          selectedDays={[]}
          selectDays={selectDays}
        />
      );

      const node = wrapper.instance();

      node.handleSelect(yesterday);

      expect(node.state.start).toBe(yesterday);
      expect(node.state.isFocused).toBe(true);
      expect(node.state.selectedInternally).toBe(true);
      // call selectDays with selected dates
      expect(selectDays).toBeCalledWith([yesterday]);

      node.handleSelect(today);
      expect(node.state.end).toBe(today);
      expect(node.state.isFocused).toBe(false);
      expect(node.state.hoveredDates).toEqual([]);
      expect(node.state.selectedInternally).toBe(true);

      // handleSetSelected should be called
      expect(node.state.selectedInternally).toBe(true);
      expect(selectDays).toBeCalledWith([yesterday, today]);
    });

    it('handleSelect select range: next date - prev date', () => {
      const selectDays = jest.fn();
      const wrapper = shallow(
        <Calendar
          className="wrapper"
          visibleMonths={1}
          numberOfMonths={2}
          numberOfPastMonths={2}
          selectedDays={[]}
          selectDays={selectDays}
        />
      );

      const node = wrapper.instance();

      node.handleSelect(today);
      expect(node.state.start).toBe(today);
      expect(node.state.isFocused).toBe(true);
      expect(node.state.hoveredDates).toEqual([]);
      expect(node.state.selectedInternally).toBe(true);
      // call selectDays with selected dates
      expect(selectDays).toBeCalledWith([today]);

      node.handleSelect(yesterday);
      expect(node.state.end).toBe(yesterday);
      expect(node.state.isFocused).toBe(false);
      expect(node.state.selectedInternally).toBe(true);

      // handleSetSelected should be called
      expect(node.state.selectedInternally).toBe(true);
      expect(selectDays).toBeCalledWith([yesterday, today]);
    });
    it('handleSelect select same day and then unselect', () => {
      const selectDays = jest.fn();
      const wrapper = mount(
        <Calendar
          className="wrapper"
          visibleMonths={1}
          numberOfMonths={2}
          numberOfPastMonths={2}
          selectedDays={[]}
          selectDays={selectDays}
        />
      );

      const node = wrapper.instance();

      node.handleSelect(today);

      expect(node.state.start).toBe(today);
      expect(node.state.isFocused).toBe(true);
      expect(node.state.selectedInternally).toBe(true);
      // call selectDays with selected dates
      expect(selectDays).toBeCalledWith([today]);

      node.handleSelect(today);
      expect(node.state.end).toBe(today);
      expect(node.state.isFocused).toBe(false);
      expect(node.state.selectedInternally).toBe(true);

      // handleSetSelected should be called
      expect(node.state.selectedInternally).toBe(true);
      expect(selectDays).toBeCalledWith([today]);

      // unselect
      node.handleSelect(today);
      expect(node.state.start).toBe(null);
      expect(node.state.end).toBe(null);
      expect(node.state.isFocused).toBe(false);
      expect(node.state.selectedInternally).toBe(true);
      expect(selectDays).toBeCalledWith([]);
    });
    it('handleSetRange - nothing should happend', () => {
      const selectDays = jest.fn();
      const wrapper = mount(
        <Calendar
          className="wrapper"
          visibleMonths={1}
          numberOfMonths={2}
          numberOfPastMonths={2}
          selectedDays={[]}
          selectDays={selectDays}
        />
      );

      const node = wrapper.instance();

      node.handleSetRange(today);
      expect(selectDays).not.toBeCalled();
    });

    it('handleHover - select date and hover it', () => {
      const selectDays = jest.fn();
      const wrapper = mount(
        <Calendar
          className="wrapper"
          visibleMonths={1}
          numberOfMonths={2}
          numberOfPastMonths={2}
          selectedDays={[]}
          selectDays={selectDays}
        />
      );

      const node = wrapper.instance();
      node.handleSelect(today);

      expect(node.state.start).toBe(today);
      expect(node.state.isFocused).toBe(true);
      expect(node.state.selectedInternally).toBe(true);
      // call selectDays with selected dates
      expect(selectDays).toBeCalledWith([today]);

      node.handleHover(today);
      expect(node.state.hoveredDates).toEqual([today]);
    });

    it('handleHover - select date and hover next date', () => {
      const selectDays = jest.fn();
      const wrapper = mount(
        <Calendar
          className="wrapper"
          visibleMonths={1}
          numberOfMonths={2}
          numberOfPastMonths={2}
          selectedDays={[]}
          selectDays={selectDays}
        />
      );

      const node = wrapper.instance();
      node.handleSelect(today);

      expect(node.state.start).toBe(today);
      expect(node.state.isFocused).toBe(true);
      expect(node.state.selectedInternally).toBe(true);
      // call selectDays with selected dates
      expect(selectDays).toBeCalledWith([today]);

      node.handleHover(tomorrow);
      expect(node.state.hoveredDates).toEqual([today, tomorrow]);
    });

    it('handleHover - select date and hover prev date', () => {
      const selectDays = jest.fn();
      const wrapper = mount(
        <Calendar
          className="wrapper"
          visibleMonths={1}
          numberOfMonths={2}
          numberOfPastMonths={2}
          selectedDays={[]}
          selectDays={selectDays}
        />
      );

      const node = wrapper.instance();
      node.handleSelect(today);

      expect(node.state.start).toBe(today);
      expect(node.state.isFocused).toBe(true);
      expect(node.state.selectedInternally).toBe(true);
      // call selectDays with selected dates
      expect(selectDays).toBeCalledWith([today]);

      node.handleHover(yesterday);
      expect(node.state.hoveredDates).toEqual([yesterday, today]);
    });

    it('handleHover - nothing should happend', () => {
      const selectDays = jest.fn();
      const wrapper = mount(
        <Calendar
          className="wrapper"
          visibleMonths={1}
          numberOfMonths={2}
          numberOfPastMonths={2}
          selectedDays={[]}
          selectDays={selectDays}
        />
      );

      const node = wrapper.instance();

      node.handleHover(today);
      expect(node.state.hoveredDates).toEqual([]);
    });

    it('handleSetCurrentMonth - componentWillUpdate, selected externally', () => {
      const nextProps = {
        selectedDays: today
      };
      const nextState = {
        selectedInternally: false
      };
      const selectDays = jest.fn();
      const wrapper = mount(
        <Calendar
          className="wrapper"
          visibleMonths={1}
          numberOfMonths={2}
          numberOfPastMonths={2}
          selectedDays={[]}
          selectDays={selectDays}
        />
      );

      const node = wrapper.instance();
      node.componentWillUpdate(nextProps, nextState);

      // handleSetCurrentMonth should be called
      const currentMonth = utils.getCurrentMonthIndex(
        node.props.numberOfPastMonths,
        node.props.numberOfMonths,
        nextProps.selectedDays,
        node.props.future,
        node.props.visibleMonths
      );

      expect(node.state.selectedInternally).toBe(false);
      expect(node.state.currentMonth).toBe(currentMonth);
    });
    it('handleSetCurrentMonth - componentWillUpdate, selected internally', () => {
      const nextProps = {
        selectedDays: today
      };
      const nextState = {
        selectedInternally: true
      };
      const selectDays = jest.fn();
      const wrapper = mount(
        <Calendar
          className="wrapper"
          visibleMonths={1}
          numberOfMonths={2}
          numberOfPastMonths={2}
          selectedDays={[]}
          selectDays={selectDays}
        />
      );

      const node = wrapper.instance();
      node.componentWillUpdate(nextProps, nextState);

      // handleSetCurrentMonth should be called
      const currentMonth = utils.getCurrentMonthIndex(
        node.props.numberOfPastMonths,
        node.props.numberOfMonths,
        nextProps.selectedDays,
        node.props.future,
        node.props.visibleMonths
      );

      expect(node.state.selectedInternally).toBe(false);
      expect(node.state.currentMonth).not.toBe(currentMonth);
    });
  });

  describe('helpers', () => {
    it('getWidth', () => {
      expect(getWidth(1)).toBe('301px');
      expect(getWidth(3)).toBe(`903px`);
    });
  });
});
