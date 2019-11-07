import React from 'react';
import { shallow } from 'enzyme';

// eslint-disable-next-line import/first
import BillingAmountScreen from './index';

test('renders correctly', () => {
  const wrapper = shallow(<BillingAmountScreen />);
  expect(wrapper).toMatchSnapshot();
});
