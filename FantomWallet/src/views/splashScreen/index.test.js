import React from 'react';
import { shallow } from 'enzyme';

// eslint-disable-next-line import/first
import { SplashScreenContainer } from './index';

test('renders correctly', () => {
  const wrapper = shallow(<SplashScreenContainer masterKey="asd123" privateKey="hjk678" />);
  expect(wrapper).toMatchSnapshot();
});
