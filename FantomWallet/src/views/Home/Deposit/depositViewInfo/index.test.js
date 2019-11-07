import React from 'react';
import { shallow } from 'enzyme';

// eslint-disable-next-line import/first
import { DepositViewInfo } from './index';

test('renders correctly', () => {
  const wrapper = shallow(<DepositViewInfo publicKey="0x00023" />);
  expect(wrapper).toMatchSnapshot();
});
