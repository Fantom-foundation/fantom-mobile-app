import React from 'react';
import { shallow } from 'enzyme';

// eslint-disable-next-line import/first
import { TransactionView } from './index';

test('renders correctly', () => {
  const wrapper = shallow(<TransactionView publicKey="0x00004" isLoading />);
  expect(wrapper).toMatchSnapshot();
});
