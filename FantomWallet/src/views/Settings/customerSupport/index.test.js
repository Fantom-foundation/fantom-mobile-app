import React from 'react';
import { shallow } from 'enzyme';

// eslint-disable-next-line import/first
import { CustomerSupportContainer } from './index';

test('renders correctly', () => {
  const wrapper = shallow(<CustomerSupportContainer />);
  expect(wrapper).toMatchSnapshot();
});
