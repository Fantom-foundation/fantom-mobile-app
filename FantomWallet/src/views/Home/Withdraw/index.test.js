import React from 'react';
import { shallow } from 'enzyme';

// eslint-disable-next-line import/first
import { WithdrawScreen } from './index';

test('renders correctly', () => {
  const wrapper = shallow(<WithdrawScreen balance="123.123" />);
  expect(wrapper).toMatchSnapshot();
});
