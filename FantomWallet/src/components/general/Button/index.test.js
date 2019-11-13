import React from 'react';
import { shallow } from 'enzyme';

import Button from './index';

test('renders correctly', () => {
  const wrapper = shallow(
    <Button
      activeOpacity={1}
      text="Click here"
      onPress={() => { }}
      buttonStyle={{ backgroungColor: 'red' }}
      textStyle={{ padding: 2 }}
    />,
  );
  expect(wrapper).toMatchSnapshot();
});
