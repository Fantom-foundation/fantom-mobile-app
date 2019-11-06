import React from 'react';
import { shallow } from 'enzyme';

import InputBox from './index';

test('renders correctly', () => {
  const wrapper = shallow(
    <InputBox phraseNumber={2} text="first second" onChangeText={jest.fn()} />
  );
  expect(wrapper).toMatchSnapshot();
});
