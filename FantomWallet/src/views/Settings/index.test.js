import React from 'react';
import { shallow } from 'enzyme';

// eslint-disable-next-line import/first
import { Settings } from './index';

test('renders correctly', () => {
  const wrapper = shallow(<Settings />);
  expect(wrapper).toMatchSnapshot();
});
