import React from 'react';
import { shallow } from 'enzyme';

// eslint-disable-next-line import/first
import Deposit from './index';

test('renders correctly', () => {
  const wrapper = shallow(<Deposit />);
  expect(wrapper).toMatchSnapshot();
});
