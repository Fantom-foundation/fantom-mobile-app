import React from 'react';
import { shallow } from 'enzyme';

import Header from './index';

test('renders correctly', () => {
  const wrapper = shallow(<Header text="Head text" isShowSecondaryButtonIcon isRightBtnImage />);
  expect(wrapper).toMatchSnapshot();
});
