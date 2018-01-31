import React from 'react';
import { shallow } from 'enzyme';

// import getDate from 'date-fns/get_date';

import CalendarMonth from '../CalendarMonth';

describe('#CalendarMonth', () => {
  it('should render correctly', () => {
    const wrapper = shallow(
      <CalendarMonth
        month={new Date(2018, 1, 1)}
        selectedDays={[]}
        disabledDays={[]}
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
});
