import React from 'react';
import { shallow } from 'enzyme';

// eslint-disable-next-line import/first
import AboutApp from './index';

test('renders correctly', () => {
  const wrapper = shallow(<AboutApp />);
  expect(wrapper).toMatchSnapshot();
});
