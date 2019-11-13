import React from 'react';
import { shallow } from 'enzyme';

// eslint-disable-next-line import/first
import { Withdraw } from './index';

test('renders correctly', () => {
  const wrapper = shallow(<Withdraw balance="123.123" />);
  expect(wrapper).toMatchSnapshot();
});
