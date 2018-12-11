import { Platform } from 'react-native';
import { DEVICE_WIDTH, DEVICE_HEIGHT } from '../../../../common/constants';

const isIOS = Platform.OS === 'ios';

const style = {
  container: {
    flex: 1,
    backgroundColor: 'rgb(14,14,18)',
  },
  midContainer: {
    marginTop: 32,
    width: DEVICE_WIDTH - 32,
    alignSelf: 'center',
    backgroundColor: 'rgb(44,52,58)',
    borderRadius: 6,
    paddingVertical: 30,
    paddingHorizontal: 16,
  },
  textContainer: {
    flexDirection: 'row',
    marginLeft: 14,
    alignItems: 'center',
  },
  footerContainerStyle: {
    position: 'absolute',
    bottom: DEVICE_HEIGHT * 0.15,
    width: DEVICE_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fantomIconStyle: {
    width: 30,
    height: 45,
    padding: 20,
    marginBottom: 15,
  },
  copyRight: {
    fontSize: 12,
    color: '#rgb(255,255,255)',
  },
  textHeaderStyle: {
    color: '#fff',
    fontFamily: 'SFProDisplay-Semibold',
    fontSize: 16,
  },
  linkTextStyle: {
    fontSize: 14,
    color: 'rgb(0,177,251)',
    fontFamily: 'SFProDisplay-Semibold',
  },
  backgroundImageStyle: {
    width: DEVICE_WIDTH * 0.45,
    height: DEVICE_HEIGHT * 1.2,
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    position: 'absolute',
    opacity: isIOS ? 0.03 : 0.02,
    right: -((DEVICE_WIDTH * 0.35) / 2),
  },
};

export default style;
