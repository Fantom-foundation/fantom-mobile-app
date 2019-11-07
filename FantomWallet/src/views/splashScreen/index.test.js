import React from 'react';
import { shallow } from 'enzyme';

// eslint-disable-next-line import/first
import { SplashScreen } from './index';

test('renders correctly', () => {
  const wrapper = shallow(<SplashScreen masterKey="asd123" privateKey="hjk678" />);
  expect(wrapper).toMatchSnapshot();
});
