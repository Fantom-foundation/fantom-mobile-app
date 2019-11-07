import React from 'react';
import { shallow } from 'enzyme';

// eslint-disable-next-line import/first
import { SendMoney } from './index';

test('renders correctly', () => {
  const wrapper = shallow(
    <SendMoney
      balance="123.123"
      isLoading={false}
      navigation={{
        state: {
          params: {
            address: '0x0001',
            coin: 'ftm',
            amount: '123',
            memo: 'text there',
            balance: '123.123',
          },
        },
      }}
    />
  );
  expect(wrapper).toMatchSnapshot();
});
