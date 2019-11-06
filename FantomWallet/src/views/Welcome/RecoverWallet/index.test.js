import React from 'react';
import { shallow } from 'enzyme';

// eslint-disable-next-line import/first
import { RecoverWallet } from './index';

test('renders correctly', () => {
  const wrapper = shallow(<RecoverWallet generateWallet={() => {}} />);
  expect(wrapper).toMatchSnapshot();
});
