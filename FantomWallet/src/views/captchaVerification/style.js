// Library
import { Platform } from 'react-native';
// Component
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '../../common/constants';
// To check device platform
const isIOS = Platform.OS === 'ios';
// Styling
const style = {
  mainContainerStyle: {
    flex: 1,
    backgroundColor: '#000',
  },
  progressContainer: {
    marginTop: DEVICE_HEIGHT * 0.05,
  },
  arrowContainer: {
    marginTop: 8,
    marginLeft: 8,
    alignSelf: 'flex-start',
  },
  backgroundImageStyle: {
    width: DEVICE_WIDTH * 0.6,
    height: DEVICE_HEIGHT * 0.77,
    opacity: 0.04,
    top: DEVICE_HEIGHT * 0.07,
    right: -((DEVICE_WIDTH * 0.5) / 2),
    position: 'absolute',
  },
  headerContainer: {
    alignItems: 'center',
  },
  captchaText: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'SFProDisplay-Medium',
    color: '#fff',
  },
  subHeadContainer: {
    marginTop: 20,
    alignItems: 'center',
    width: DEVICE_WIDTH * 0.8,
  },
  textContainer: {
    marginTop: 24,
    width: DEVICE_WIDTH - 32,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    borderStyle: 'dashed',
    borderRadius: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(27,29,33)',
    paddingVertical: 15,
  },
  wordWrap: {
    width: DEVICE_WIDTH * 0.2,
    height: DEVICE_HEIGHT * 0.05,
    marginBottom: DEVICE_WIDTH * 0.03,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageContainer: {
    marginTop: DEVICE_HEIGHT * 0.03,
    alignItems: 'center',
    marginHorizontal: DEVICE_WIDTH * 0.1,
  },
  backupPhrase: {
    color: '#fff',
  },
  displayMnemonicView: {
    marginTop: DEVICE_HEIGHT * 0.08,
    alignItems: 'center',
  },
  pleaseText: {
    fontSize: DEVICE_WIDTH * 0.045,
    fontFamily: 'SFProDisplay-Thin',
    paddingHorizontal: 0,
    textAlign: 'center',
    fontWeight: '300',
    color: '#fff',
  },
  orderTextStyle: {
    marginTop: DEVICE_HEIGHT * 0.05,
    color: 'rgb(166,225,100)',
    width: DEVICE_WIDTH * 0.5,
    textAlign: 'center',
    fontSize: 16,
  },
  mnemonicBtnMainView: {
    width: DEVICE_WIDTH * 0.9,
    marginTop: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  phraseText: {
    fontSize: DEVICE_WIDTH * 0.045,
    fontFamily: 'SegoeUI-SemiBold',
  },
  textBoxContainer: {
    marginTop: DEVICE_HEIGHT * 0.03,
  },
  mid: {
    height: isIOS ? DEVICE_HEIGHT : DEVICE_HEIGHT - 24,
    alignItems: 'center',
  },
  textBox: {
    marginBottom: DEVICE_HEIGHT * 0.03,
  },
  mnemonicBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
    margin: 10,
    height: 30,
    backgroundColor: 'rgb(0,177,251)',
    borderRadius: 4,
    minWidth: 50,
    overflow: 'hidden',
  },
  selectedTextContainer: {
    width: 50,
    height: 30,
    padding: 5,
    margin: 10,
    borderWidth: 1,
    borderColor: 'rgb(0,177,251)',
    borderRadius: 4,
  },
  mnemonicBtnText: { color: '#fff', fontWeight: '600', textAlign: 'center' },
  footerStyle: {
    position: 'absolute',
    bottom: 0,
    width: DEVICE_WIDTH,
  },
};

export default style;
