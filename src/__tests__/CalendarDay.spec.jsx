import React from 'react';
import { shallow } from 'enzyme';

import getDate from 'date-fns/get_date';

import CalendarDay from '../CalendarDay';

describe('#CalendarDay', () => {
  const date = new Date(2018, 1, 1);

  it('should render correctly', () => {
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
        classes={{}}
      />
    );
    expect(wrapper.getElement()).toMatchSnapshot();
  });
  it('should render hidden', () => {
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
        classes={{}}
      />
    );
    expect(wrapper.getElement()).toMatchSnapshot();
  });

  it('should handleHover', () => {
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
        classes={{}}
      />
    );

    const node = wrapper.instance();
    node.handleHover();

    expect(onHover).toBeCalledWith(date);
  });

  it('should handleClick', () => {
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
        classes={{}}
      />
    );

    const node = wrapper.instance();
    node.handleClick();

    expect(onClick).toBeCalledWith(date);
  });
});
