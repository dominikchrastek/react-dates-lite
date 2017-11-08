/* @flow */
import React from 'react';
import { shallow } from 'enzyme';

import CalendarDay from '../CalendarDay';

describe('#CalendarDay', () => {
  it('should render correctly', () => {
    const wrapper = shallow(
      <CalendarDay
        value={new Date(2017, 5, 29, 0, 0, 0)}
        number={29}
        isPast
        isHidden={false}
        isSelected={false}
        onSelectDay={jest.fn()}
      />,
    );

    expect(wrapper.getElement()).toMatchSnapshot();
  });
});
