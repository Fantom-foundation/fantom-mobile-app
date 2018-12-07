import { Dimensions, Platform } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const style = {
  mainContainerStyle: {
    flex: 1,
    backgroundColor: '#000',
  },
  progressContainer: {
    marginTop: deviceHeight * 0.05,
  },
  arrowContainer: {
    marginTop: 8,
    marginLeft: 8,
    alignSelf: 'flex-start',
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
    width: deviceWidth * 0.8,
  },
  textContainer: {
    marginTop: 24,
    // minHeight: deviceHeight * 0.2,

    width: deviceWidth - 32,
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
    width: deviceWidth * 0.2,
    height: deviceHeight * 0.05,
    marginBottom: deviceWidth * 0.03,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageContainer: {
    marginTop: deviceHeight * 0.03,
    alignItems: 'center',
    marginHorizontal: deviceWidth * 0.1,
  },
  backupPhrase: {
    color: '#fff',
  },
  displayMnemonicView: {
    marginTop: deviceHeight * 0.08,
  },
  pleaseText: {
    fontSize: deviceWidth * 0.045,
    fontFamily: 'SFProDisplay-Thin',
    paddingHorizontal: 0,
    textAlign: 'center',
    fontWeight: '300',
    color: '#fff',
  },
  orderTextStyle: {
    marginTop: deviceHeight * 0.05,
    color: 'rgb(166,225,100)',
    width: deviceWidth * 0.5,
    textAlign: 'center',
    fontSize: 16,
  },
  mnemonicBtnMainView: {
    width: deviceWidth * 0.8,
    marginTop: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  phraseText: {
    fontSize: deviceWidth * 0.045,
    fontFamily: 'SegoeUI-SemiBold',
  },
  textBoxContainer: {
    marginTop: deviceHeight * 0.03,
  },
  mid: {
    height: Platform.OS === 'ios' ? deviceHeight : deviceHeight - 24,
    alignItems: 'center',
  },
  textBox: {
    marginBottom: deviceHeight * 0.03,
  },
  seperatotView: {
    height: deviceHeight * 0.2,
  },
  mnemonicBtn: {
    padding: 5,
    margin: 10,
    height: 30,
    backgroundColor: 'rgb(0,177,251)',
    borderRadius: 4,
  },
  mnemonicBtnText: { color: '#fff', fontWeight: '600', textAlign: 'center' },
  footerStyle: {
    position: 'absolute',
    bottom: 0,
    width: deviceWidth,
  },
};

export default style;
