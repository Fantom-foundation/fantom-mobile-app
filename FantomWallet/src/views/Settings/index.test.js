import React from 'react';
import { shallow } from 'enzyme';

// eslint-disable-next-line import/first
import { SettingsContainer } from './index';

test('renders correctly', () => {
  const wrapper = shallow(<SettingsContainer />);
  expect(wrapper).toMatchSnapshot();
});
