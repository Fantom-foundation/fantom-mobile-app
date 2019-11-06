import React from 'react';
import { shallow } from 'enzyme';

// eslint-disable-next-line import/first
import { CheckMnemonic } from './index';

test('renders correctly', () => {
  const wrapper = shallow(<CheckMnemonic generateWallet={() => {}} />);
  expect(wrapper).toMatchSnapshot();
});
