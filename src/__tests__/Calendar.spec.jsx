import React from 'react';
import { shallow, mount } from 'enzyme';
import MockDate from 'mockdate';

// import getDate from 'date-fns/get_date';

import Calendar from '../Calendar';

describe('#Calendar', () => {
  beforeEach(() => {
    MockDate.set('1/31/2018');
  });
  afterEach(() => {
    MockDate.reset();
  });
  it('should render correctly', () => {
    const wrapper = shallow(
      <Calendar
        className="wrapper"
        visibleMonths={3}
        numberOfMonths={3}
        numberOfPastMonths={10}
        selectedDays={[]}
        selectDays={jest.fn()}
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
});
