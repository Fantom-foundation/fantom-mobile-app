import React from 'react';
import { shallow } from 'enzyme';

// eslint-disable-next-line import/first
import { AddressBook } from './index';

const navigation = {
  getParam: () => ({
    address: '0.0',
  }),
};

test('renders correctly', () => {
  const wrapper = shallow(
    <AddressBook
      addresses={{ '0x0': { address: '0x0' } }}
      toggleAddress={() => {}}
      deleteAddress={() => {}}
      navigation={navigation}
    />
  );
  expect(wrapper).toMatchSnapshot();
});
