import { Platform } from 'react-native';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '../../common/constants';

const isIOS = Platform.OS === 'ios';

const style = {
  containerStyle: {
    flex: 1,
    backgroundColor: 'rgb(14,14,18)',
  },
  backgroundImageStyle: {
    width: DEVICE_WIDTH * 0.6,
    height: DEVICE_HEIGHT * 0.85,
    opacity: isIOS ? 0.03 : 0.02,
    top: DEVICE_HEIGHT * 0.1,
    right: -((DEVICE_WIDTH * 0.48) / 2),
    position: 'absolute',
  },
  mainViewStyle: {
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT,
  },
  headingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingTextStyle: {
    color: '#FFF',
    fontFamily: 'SFProDisplay-Medium',
    fontSize: 24,
  },
  detailsContainerStyle: {
    width: DEVICE_WIDTH - 32,
    alignSelf: 'center',
    marginTop: DEVICE_HEIGHT * 0.06,
  },
  containerHeadingText: {
    color: '#FFF',
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 16,
    paddingLeft: 12,
  },
  textFieldStyle: {
    height: 120,
    padding: 8,
    borderRadius: 6,
    borderWidth: 0.7,
    borderStyle: 'dashed',
    borderColor: '#fff',
    backgroundColor: 'rgb(38,44,50)',
    marginTop: DEVICE_HEIGHT * 0.02,
  },
  enteredTextStyle: {
    fontSize: 12,
    paddingLeft: 12,
    color: '#fff',
    fontFamily: 'SFProDisplay-Regular',
    textAlignVertical: 'top',
  },
  instructionsContainer: {
    width: DEVICE_WIDTH - 32,
    alignSelf: 'center',
    marginTop: DEVICE_HEIGHT * 0.05,
    paddingHorizontal: DEVICE_HEIGHT * 0.03,
  },
  instructionTextStyle: {
    fontFamily: 'SFProDisplay-Semibold',
    color: 'rgb(246,246,246)',
    textAlign: 'center',
    fontSize: 14,
  },
  warningContainer: {
    width: DEVICE_WIDTH - 32,
    alignSelf: 'center',
    marginTop: DEVICE_HEIGHT * 0.05,
    paddingHorizontal: DEVICE_HEIGHT * 0.03,
    backgroundColor: 'rgb(44,52,58)',
    borderRadius: 6,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  warningTextStyle: {
    color: 'rgb(255,0,0)',
    fontSize: 14,
    fontFamily: 'SFProDisplay-Medium',
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
    fontSize: 16,
  },
  confirmContainer: {
    marginTop: DEVICE_HEIGHT * 0.06,
    alignItems: 'center',
  },
  backButtonStyle: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 2,
    width: 50,
  },
  textViewStyle: {
    margin: 4,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#fff',
  },
  messageTextStyle: {
    flex: 1,
    height: 20,
    padding: 8,
  },
  buttonViewStyle: {
    flex: 1,
    justifyContent: 'flex-end',
    alignContent: 'center',
  },
  errorTextStyle: {
    paddingTop: 10,
    paddingLeft: 12,
    color: 'red',
    fontSize: 12,
    fontFamily: 'SFProDisplay-Regular',
  },
};
export default style;
