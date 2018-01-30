import React from 'react';
import { shallow } from 'enzyme';

import ArrowRight from '../ArrowRight';

describe('#ArrowRight', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<ArrowRight />);
    expect(wrapper.getElement()).toMatchSnapshot();
  });
  it('should render with className', () => {
    const wrapper = shallow(<ArrowRight className="className" />);
    expect(wrapper.getElement()).toMatchSnapshot();
  });
});
