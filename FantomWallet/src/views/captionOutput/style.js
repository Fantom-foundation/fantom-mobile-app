import { Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const style = {
  mainContainer: {
    flex: 1,
    backgroundColor: '#111',
  },
  progressContainer: {
    marginTop: deviceHeight * 0.03,
  },
  arrowContainer: {
    marginTop: deviceHeight * 0.02,
    marginLeft: deviceHeight * 0.02,
  },
  mid: {
    paddingTop: deviceHeight * 0.02,
    flex: 1,
    // backgroundColor: 'red',
  },
  warningContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  secretText: {
    fontSize: deviceWidth <= 320 ? 16 : 20,
    color: 'rgb(166,225,100)', // Green
    fontFamily: 'SFProDisplay-Bold',
    marginTop: 10,
  },
  text: {
    fontSize: deviceWidth <= 320 ? 12 : 14,
    fontFamily: 'SFProDisplay-Regular',
    color: 'rgb(0,177,251)', // Blue
  },
  activityIndicatorContainerStyle: {
    height: deviceHeight * 0.25,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  textContainer: {
    marginTop: deviceHeight * 0.05,
    marginBottom: deviceHeight * 0.07,
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
    backgroundColor: 'rgb(38,44,50)',
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
  instructionTextStyle: {
    fontSize: deviceWidth * 0.037,
    fontFamily: 'SFProDisplay-Regular',
    color: '#FFF',
  },
  clipBoardContainer: {
    marginTop: deviceHeight * 0.04,
    height: deviceWidth * 0.25,
    width: deviceWidth * 0.25,
    backgroundColor: 'rgb(33,36,40)',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: (deviceWidth * 0.25) / 2,
    marginBottom: 10,
  },
  copyIconContainerStyle: {
    height: deviceWidth * 0.2,
    width: deviceWidth * 0.2,
    backgroundColor: 'rgb(44,52,58)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: (deviceWidth * 0.2) / 2,
  },
  clipBoardText: {
    fontSize: deviceWidth <= 320 ? 12 : 14,
    fontFamily: 'SFProDisplay-Regular',
    color: '#fff',
  },
  line: {
    backgroundColor: 'rgb(243,243,243)',
    marginTop: deviceHeight * 0.05,
    height: 2,
  },
  lastMessageContainer: {
    width: deviceWidth - 32,
    alignSelf: 'center',
    backgroundColor: 'rgb(35,39,40)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 15,
  },
  warningTextStyle: {
    fontSize: deviceWidth <= 320 ? 12 : 14,
    fontFamily: 'SFProDisplay-Regular',
    color: '#fff',
  },
  footerStyle: {
    position: 'absolute',
    bottom: 0,
    width: deviceWidth,
  },
};

export default style;
