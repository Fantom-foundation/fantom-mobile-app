import React from 'react';
import { shallow } from 'enzyme';

import Tab from './index';

test('renders correctly', () => {
  const wrapper = shallow(<Tab />);
  expect(wrapper).toMatchSnapshot();
});
