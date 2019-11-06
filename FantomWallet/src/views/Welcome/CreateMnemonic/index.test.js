import React from 'react';
import { shallow } from 'enzyme';

// eslint-disable-next-line import/first
import { CreateMnemonic } from './index';

test('renders correctly', () => {
  const wrapper = shallow(<CreateMnemonic />);
  expect(wrapper).toMatchSnapshot();
});
