import React from 'react';
import { shallow } from 'enzyme';

// eslint-disable-next-line import/first
import { DepositViewInfoContainer } from './index';

test('renders correctly', () => {
  const wrapper = shallow(<DepositViewInfoContainer publicKey="0x00023" />);
  expect(wrapper).toMatchSnapshot();
});
