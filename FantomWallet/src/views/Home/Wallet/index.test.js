import React from 'react';
import { shallow } from 'enzyme';

// eslint-disable-next-line import/first
import { Wallet } from './index';

test('renders correctly', () => {
  const wrapper = shallow(
    <Wallet balance="123.123" publicKey="0x00000123" isLoading={false} />,
  );
  expect(wrapper).toMatchSnapshot();
});
