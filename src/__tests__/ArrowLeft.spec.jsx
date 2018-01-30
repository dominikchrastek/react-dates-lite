import React from 'react';
import { shallow } from 'enzyme';

import ArrowLeft from '../ArrowLeft';

describe('#ArrowLeft', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<ArrowLeft />);
    expect(wrapper.getElement()).toMatchSnapshot();
  });
  it('should render with className', () => {
    const wrapper = shallow(<ArrowLeft className="className" />);
    expect(wrapper.getElement()).toMatchSnapshot();
  });
});
