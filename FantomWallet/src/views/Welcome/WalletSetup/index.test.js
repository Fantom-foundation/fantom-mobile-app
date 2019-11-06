import React from 'react';
import { shallow } from 'enzyme';

import WalletSetup from './index';

test('renders correctly', () => {
  const wrapper = shallow(<WalletSetup />);
  expect(wrapper).toMatchSnapshot();
});
