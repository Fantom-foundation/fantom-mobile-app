import React from 'react';
import { shallow } from 'enzyme';

// eslint-disable-next-line import/first
import DepositNavigationBar from './index';

test('renders correctly', () => {
  const wrapper = shallow(<DepositNavigationBar renderToastNotification={() => {}} />);
  expect(wrapper).toMatchSnapshot();
});
