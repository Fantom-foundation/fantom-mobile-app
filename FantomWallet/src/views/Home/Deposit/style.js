import { Platform } from 'react-native';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '~/common/constants';

const isAndroid = Platform.OS === 'android';
const style = {
  depositViewStyle: {
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH,
    backgroundColor: 'rgb(14,14,18)',
  },
  textViewStyle: {},
  depositScreenStyle: {
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT * 0.84,
    backgroundColor: 'rgb(14,14,18)',
  },
  backgroundIconStyle: {
    width: DEVICE_WIDTH * 0.45,
    height: DEVICE_HEIGHT * 0.85,
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    position: 'absolute',
    opacity: !isAndroid ? 0.03 : 0.02,
    right: -((DEVICE_WIDTH * 0.3) / 2),
  },
};
export default style;
