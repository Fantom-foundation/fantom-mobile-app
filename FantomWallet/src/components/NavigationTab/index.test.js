import React from 'react';
import { shallow } from 'enzyme';

import Tab from './index';

const navigation = {
  state: {
    index: 5,
  },
};

test('renders correctly', () => {
  const wrapper = shallow(<Tab navigation={navigation} />);
  expect(wrapper).toMatchSnapshot();
});
