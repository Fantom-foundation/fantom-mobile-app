import React from 'react';
import { shallow } from 'enzyme';

// eslint-disable-next-line import/first
import { CheckMnemonicContainer } from './index';

test('renders correctly', () => {
  const wrapper = shallow(<CheckMnemonicContainer generateWallet={() => { }} />);
  expect(wrapper).toMatchSnapshot();
});
