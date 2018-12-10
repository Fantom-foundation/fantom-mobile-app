import { Platform } from 'react-native';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '../../common/constants';

const isIOS = Platform.OS === 'ios';
const style = {
  mainContainerStyle: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    backgroundColor: 'rgb(14,14,18)',
    flex: 1,
  },
  addressContainer: {
    width: DEVICE_WIDTH - 32,
    marginTop: DEVICE_HEIGHT * 0.1,
    alignSelf: 'center',
  },
  inputTextHeading: {
    fontSize: 16,
    fontFamily: 'SFProDisplay-Regular',
    color: '#FFFFFF',
    paddingLeft: 18,
  },
  enteredTextStyle: {
    fontSize: 12,
    flex: 1,
    paddingLeft: 20,
    backgroundColor: 'rgb(32,37,42)',
    color: '#fff',
  },
  iconContainer: {
    alignItems: 'center',
    marginRight: 8,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 5,
  },
  nameContainer: {
    marginTop: DEVICE_HEIGHT * 0.05,
    alignSelf: 'center',
    width: DEVICE_WIDTH - 32,
  },
  textInputContainer: {
    height: 50,
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1.5,
    borderRadius: 4,
    borderBottomColor: 'rgb(56,65,71)',
    backgroundColor: 'rgb(32,37,42)',
  },
  confirmButtonOuterContainer: {
    height: DEVICE_WIDTH * 0.2,
    width: DEVICE_WIDTH * 0.2,
    backgroundColor: 'rgb(29,33,38)',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: (DEVICE_WIDTH * 0.2) / 2,
    marginBottom: 10,
  },
  confirmButtonInnerContainer: {
    height: DEVICE_WIDTH * 0.16,
    width: DEVICE_WIDTH * 0.16,
    backgroundColor: 'rgb(44,52,58)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: (DEVICE_WIDTH * 0.16) / 2,
  },
  confirmTextStyle: {
    color: '#FFF',
    fontFamily: 'SFProDisplay-Semibold',
    marginTop: 5,
  },
  confirmContainer: {
    marginTop: DEVICE_HEIGHT * 0.1,
    alignItems: 'center',
  },
  backgroundImageStyle: {
    width: DEVICE_WIDTH * 0.6,
    height: DEVICE_HEIGHT * 0.6,
    top: DEVICE_HEIGHT * 0.07,
    position: 'absolute',
    opacity: isIOS ? 0.03 : 0.02,
    right: -((DEVICE_WIDTH * 0.45) / 2),
  },
};

export default style;
