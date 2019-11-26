import { StyleSheet } from 'react-native';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '~/common/constants';

const headerHeight = DEVICE_HEIGHT < 810 ? 84 : (106 / 812) * DEVICE_HEIGHT;

export default StyleSheet.create({
  mainContainerStyle: {
    flex: 1,
  },
  statusBarStyle: {
    height: 20,
  },

  headerComponent: {
    backgroundColor: 'rgb(44,52,58)',
    height: headerHeight,
  },
  headerComponentText: { fontFamily: 'SFProDisplay-Semibold' },

  containerIndicator: {
    height: DEVICE_HEIGHT - headerHeight,
    width: DEVICE_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },

  footerStyle: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
  },
});
