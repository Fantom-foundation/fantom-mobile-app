import React from 'react';
import { shallow } from 'enzyme';

// eslint-disable-next-line import/first
import { RecoverWalletContainer } from './index';

test('renders correctly', () => {
  const wrapper = shallow(<RecoverWalletContainer generateWallet={() => { }} />);
  expect(wrapper).toMatchSnapshot();
});
