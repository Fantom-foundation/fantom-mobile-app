import React from 'react';
import { shallow } from 'enzyme';

// eslint-disable-next-line import/first
import { CreateMnemonicContainer } from './index';

test('renders correctly', () => {
  const wrapper = shallow(<CreateMnemonicContainer />);
  expect(wrapper).toMatchSnapshot();
});
