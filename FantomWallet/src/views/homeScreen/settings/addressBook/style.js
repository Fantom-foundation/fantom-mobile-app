import { Platform } from 'react-native';
import { DEVICE_WIDTH, DEVICE_HEIGHT } from '../../../../common/constants';

const isIOS = Platform.OS === 'ios';
const style = {
  mainContainerStyle: {
    flex: 1,
    backgroundColor: 'rgb(14,14,18)',
  },
  add: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(44,52,58)',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  favorites: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(44,52,58)',
    borderBottomRightRadius: 4,
    borderTopRightRadius: 4,
  },
  addressList: {
    flex: 1,
  },
  subHeader: {
    flexDirection: 'row',
    marginTop: 32,
    width: DEVICE_WIDTH - 32,
    alignSelf: 'center',
    height: 40,
    marginBottom: 15,
  },
  textInputContainer: {
    borderWidth: 1,
    borderColor: 'rgb(110,110,110)',
    padding: 15,
    marginTop: 15,
    marginBottom: 15,
    flexDirection: 'row',
    width: DEVICE_WIDTH - 32,
    alignSelf: 'center',
    backgroundColor: 'rgb(32,37,42)',
  },
  imageSize: {
    width: 20,
    height: 20,
  },
  displaySearch: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  backgroundImageStyle: {
    width: DEVICE_WIDTH * 0.5,
    height: DEVICE_HEIGHT * 1.0,
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    position: 'absolute',
    opacity: isIOS ? 0.03 : 0.02,
    right: -((DEVICE_WIDTH * 0.4) / 2),
  },
};

export default style;
