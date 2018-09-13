import { Dimensions, Platform } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const style = {
  mainContainerStyle: {
    flex: 1,
    backgroundColor: '#fff',
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
    fontFamily: 'SegoeUI',
  },
  subHeadContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  pleaseText: {
    fontSize: deviceWidth * 0.045,
    fontFamily: 'SegoeUI-SemiBold',
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
  footerStyle: {
    position: 'absolute',
    bottom: 0,
    width: deviceWidth,
  },
};

export default style;
