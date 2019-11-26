import React from 'react';
import { shallow } from 'enzyme';

// eslint-disable-next-line import/first
import { BalanceViewContainer } from './index';

test('renders correctly', () => {
  const wrapper = shallow(<BalanceViewContainer balance="123.123" />);
  expect(wrapper).toMatchSnapshot();
});
