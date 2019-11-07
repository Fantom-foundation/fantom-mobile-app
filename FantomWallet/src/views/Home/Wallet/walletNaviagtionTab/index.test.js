import React from 'react';
import { shallow } from 'enzyme';

// eslint-disable-next-line import/first
import { WalletNavigationTab } from './index';

test('renders correctly', () => {
  const wrapper = shallow(
    <WalletNavigationTab activeTabIndex={1} index={1} tabIfo={{ tabRenderInfo: 'information' }} />
  );
  expect(wrapper).toMatchSnapshot();
});
