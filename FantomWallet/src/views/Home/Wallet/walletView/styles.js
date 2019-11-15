import { StyleSheet } from 'react-native';

import { DEVICE_WIDTH, DEVICE_HEIGHT } from '~/common/constants';

export default StyleSheet.create({
  mainContainerStyle: {
    height: DEVICE_HEIGHT,
    justifyContent: 'flex-end',
  },
  tabInfoStyle: {
    flex: 1,
  },
  navigationTabStyle: {
    width: DEVICE_WIDTH,
    flexDirection: 'row',
    height: 44,
    alignItems: 'center',
  },
});