import React from 'react';
import { shallow } from 'enzyme';

import Loader from './index';

test('renders correctly', () => {
  const wrapper = shallow(<Loader loaderStyle={{ padding: 2 }} loaderColor="red" isLoading />);
  expect(wrapper).toMatchSnapshot();
});
