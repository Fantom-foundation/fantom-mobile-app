import { StyleSheet, Platform } from 'react-native';

import { DEVICE_HEIGHT, DEVICE_WIDTH } from '~/common/constants';

const isIOS = Platform.OS === 'ios';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#111',
  },
  progressContainer: {
    marginTop: DEVICE_HEIGHT * 0.03,
  },
  arrowContainer: {
    marginTop: DEVICE_HEIGHT * 0.02,
    marginLeft: DEVICE_HEIGHT * 0.02,
  },
  mid: {
    paddingTop: DEVICE_HEIGHT * 0.02,
    flex: 1,
    // backgroundColor: 'red',
  },
  warningContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  secretText: {
    fontSize: DEVICE_WIDTH <= 320 ? 16 : 20,
    color: 'rgb(166,225,100)', // Green
    fontFamily: 'SFProDisplay-Semibold',
    marginTop: 10,
  },
  text: {
    fontSize: DEVICE_WIDTH <= 320 ? 12 : 14,
    fontFamily: 'SFProDisplay-Medium',
    color: 'rgb(0,177,251)', // Blue
  },
  activityIndicatorContainerStyle: {
    height: DEVICE_HEIGHT * 0.25,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  textContainer: {
    marginTop: DEVICE_HEIGHT * 0.05,
    marginBottom: DEVICE_HEIGHT * 0.07,
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
    backgroundColor: 'rgb(38,44,50)',
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
  infoContainer: {
    marginBottom: DEVICE_HEIGHT * 0.05,
    alignItems: 'center',
  },
  messageContainer: {
    marginTop: DEVICE_HEIGHT * 0.03,
    alignItems: 'center',
    marginHorizontal: DEVICE_WIDTH * 0.1,
  },
  instructionTextStyle: {
    fontSize: DEVICE_WIDTH * 0.037,
    fontFamily: 'SFProDisplay-Thin',
    color: '#FFF',
  },
  clipBoardContainer: {
    marginTop: DEVICE_HEIGHT * 0.04,
    height: DEVICE_WIDTH * 0.25,
    width: DEVICE_WIDTH * 0.25,
    backgroundColor: 'rgb(33,36,40)',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: (DEVICE_WIDTH * 0.25) / 2,
    marginBottom: 10,
  },
  copyIconContainerStyle: {
    height: DEVICE_WIDTH * 0.2,
    width: DEVICE_WIDTH * 0.2,
    backgroundColor: 'rgb(44,52,58)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: (DEVICE_WIDTH * 0.2) / 2,
  },
  clipBoardText: {
    fontSize: DEVICE_WIDTH <= 320 ? 12 : 14,
    fontFamily: 'SFProDisplay-Regular',
    color: '#fff',
  },
  line: {
    backgroundColor: 'rgb(243,243,243)',
    marginTop: DEVICE_HEIGHT * 0.05,
    height: 2,
  },
  lastMessageContainer: {
    width: DEVICE_WIDTH - 32,
    alignSelf: 'center',
    // backgroundColor: 'rgb(31,38,53)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 15,
  },
  warningTextStyle: {
    fontSize: DEVICE_WIDTH <= 320 ? 12 : 14,
    fontFamily: 'SFProDisplay-Light',
    color: '#fff',
  },
  backgroundImage: {
    width: DEVICE_WIDTH * 0.6,
    height: DEVICE_HEIGHT * 0.77,
    top: DEVICE_HEIGHT * 0.07,
    opacity: isIOS ? 0.03 : 0.02,
    right: -((DEVICE_WIDTH * 0.45) / 2),
    position: 'absolute',
  },
  footerStyle: {
    position: 'absolute',
    bottom: 0,
    width: DEVICE_WIDTH,
  },
  dropdown: {
    backgroundColor: 'rgb(0,168,251)',
  },
  empty: { height: DEVICE_HEIGHT * 0.15 },
});
