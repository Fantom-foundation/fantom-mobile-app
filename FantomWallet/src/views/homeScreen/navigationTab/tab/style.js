import { DEVICE_HEIGHT, iPhoneXHeight } from '../../../../common/constants';

const isPhoneX = DEVICE_HEIGHT >= iPhoneXHeight;

const style = {
  tabStyle: {
    flex: 1,
    height: isPhoneX ? 78 : 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconStyle: { width: 40, height: 40 },
};
export default style;
