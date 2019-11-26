import React from 'react';
import { shallow } from 'enzyme';

import PropgressBar from './index';

test('renders correctly', () => {
  const wrapper = shallow(<PropgressBar completed={0.2} remaining={0.8} />);
  expect(wrapper).toMatchSnapshot();
});
