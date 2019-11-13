import React from 'react';
import { shallow } from 'enzyme';

// eslint-disable-next-line import/first
import DepositNavigationTab from './index';

test('renders correctly', () => {
  const wrapper = shallow(
    <DepositNavigationTab
      activeTabIndex={3}
      index={5}
      activeTabColor="red"
      tabIfo={{
        tabRenderInfo: 'text',
      }}
    />,
  );
  expect(wrapper).toMatchSnapshot();
});
