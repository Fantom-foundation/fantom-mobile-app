import React from 'react';
import { shallow } from 'enzyme';

// eslint-disable-next-line import/first
import { CustomerSupport } from './index';

test('renders correctly', () => {
  const wrapper = shallow(<CustomerSupport />);
  expect(wrapper).toMatchSnapshot();
});
