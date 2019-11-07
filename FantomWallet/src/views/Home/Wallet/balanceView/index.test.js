import React from 'react';
import { shallow } from 'enzyme';

// eslint-disable-next-line import/first
import { BalanceView } from './index';

test('renders correctly', () => {
  const wrapper = shallow(<BalanceView balance="123.123" />);
  expect(wrapper).toMatchSnapshot();
});
