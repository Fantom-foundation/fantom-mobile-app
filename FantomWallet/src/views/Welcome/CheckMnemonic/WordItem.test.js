import React from 'react';
import { shallow } from 'enzyme';

// eslint-disable-next-line import/first
import WordItem from './WordItem';

test('renders correctly', () => {
  const wrapper = shallow(
    <WordItem name="test" index={3} isClickable={false} onClick={() => { }} isTop={false} />,
  );
  expect(wrapper).toMatchSnapshot();
});
