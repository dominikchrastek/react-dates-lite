import React from 'react';
import { shallow } from 'enzyme';

// import getDate from 'date-fns/get_date';

import CalendarMonth from '../CalendarMonth';

describe('#CalendarMonth', () => {
  it('should render correctly', () => {
    const wrapper = shallow(
      <CalendarMonth
        month={new Date(2018, 1, 1)}
        selectedDates={[]}
        disabledDates={[]}
        allowedDates={[]}
        selectDate={jest.fn()}
        onHover={jest.fn()}
        hoveredDates={[]}
        allowedPastDates
        future
        colors={{}}
        classes={{}}
      />
    );
    expect(wrapper.getElement()).toMatchSnapshot();
  });

  it('should render correctly with allowedDates', () => {
    const wrapper = shallow(
      <CalendarMonth
        month={new Date(2018, 1, 1)}
        selectedDates={[]}
        disabledDates={[]}
        allowedDates={[new Date(2018, 1, 5)]}
        selectDate={jest.fn()}
        onHover={jest.fn()}
        hoveredDates={[]}
        allowedPastDates
        future
        colors={{}}
        classes={{}}
      />
    );
    expect(wrapper.getElement()).toMatchSnapshot();
  });
  it('should render correctly with classes', () => {
    const wrapper = shallow(
      <CalendarMonth
        className="class"
        month={new Date(2018, 1, 1)}
        selectedDates={[]}
        disabledDates={[]}
        allowedDates={[]}
        selectDate={jest.fn()}
        onHover={jest.fn()}
        hoveredDates={[]}
        allowedPastDates
        future
        colors={{}}
        classes={{
          month: 'monthClass'
        }}
      />
    );
    expect(wrapper.getElement()).toMatchSnapshot();
  });
});
