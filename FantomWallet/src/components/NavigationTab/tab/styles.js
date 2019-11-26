import { StyleSheet } from 'react-native';
import { DEVICE_HEIGHT, iPhoneXHeight } from '~/common/constants';

const isPhoneX = DEVICE_HEIGHT >= iPhoneXHeight;

export default StyleSheet.create({
  tabStyle: {
    flex: 1,
    height: isPhoneX ? 60 : 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconStyle: {
    width: 30,
    height: 30,
  },
});
