import { Platform } from 'react-native';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '../../../common/constants';

const isAndroid = Platform.OS === 'android';

const style = {
  mainContainerStyle: {
    flex: 1,
    backgroundColor: 'rgb(14,14,18)',
  },
  topMarginContainer: {
    height: 32,
  },
  backgroundIconStyle: {
    width: DEVICE_WIDTH * 0.45,
    height: DEVICE_HEIGHT * 0.85,
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    position: 'absolute',
    opacity: !isAndroid ? 0.09 : 0.02,
    right: -((DEVICE_WIDTH * 0.3) / 2),
  },
  amtContainer: {
    backgroundColor: 'rgb(44,52,58)',
    height: 120,
    width: DEVICE_WIDTH - 32,
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: 12,
  },
  balanceHeadingContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: 'rgb(50,59,66)',
    height: 40,
    justifyContent: 'center',
    paddingLeft: 28,
  },
  balanceHeadingTextStyle: {
    color: 'rgb(166,225,100)',
    fontSize: 14,
    fontFamily: 'SFProDisplay-Medium',
  },
  balanceViewText: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceViewTextOne: {
    fontSize: 24,
    fontFamily: 'SFProDisplay-Bold',
    flex: 1,
    textAlign: 'center',
    alignSelf: 'center',
    color: '#fff',
  },
  addressContainer: {
    width: DEVICE_WIDTH - 32,
    marginTop: DEVICE_HEIGHT * 0.03,
    alignSelf: 'center',
  },
  inputTextHeading: {
    fontSize: 16,
    fontFamily: 'SFProDisplay-Regular',
    color: '#FFFFFF',
    paddingLeft: 12,
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
  enteredTextStyle: {
    fontSize: 12,
    flex: 1,
    paddingLeft: 12,
    // backgroundColor: 'rgb(32,37,42)',
    color: '#fff',
    fontFamily: 'SFProDisplay-Regular',
  },
  iconContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  priceSubContainer: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceTextStyle: {
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 14,
  },
  memoTextInputContainer: {
    height: 80,
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
    fontSize: 16,
  },
  confirmContainer: {
    marginTop: DEVICE_HEIGHT * 0.1,
    alignItems: 'center',
  },
  // withdrawViewStyle: {
  //   height: deviceHeight,
  //   paddingTop: 15,
  //   paddingHorizontal: 15,
  //   backgroundColor: '#fff',
  // },
  // sendContainer: {
  //   alignItems: 'center',
  // },
  // sendText: {
  //   fontSize: 24,
  //   fontWeight: 'bold',
  // },
  // addressContainer: {
  //   marginTop: deviceHeight * 0.02,
  // },
  // addressText: {
  //   fontWeight: 'bold',
  // },
  // addressTextInputContainer: {
  //   flexDirection: 'row',
  //   width: deviceWidth - 32,
  //   height: isAndroid ? deviceHeight * 0.07 : deviceHeight * 0.06,
  //   marginTop: deviceHeight * 0.005,
  //   paddingLeft: 10,
  //   paddingRight: 3,
  //   borderWidth: 1,
  //   borderColor: 'rgb(93,93,93)',
  //   alignItems: 'center',
  // },
  // addressTextInput: {
  //   flex: 1,
  //   fontSize: 16,
  //   color: '#a7a7a7',
  //   width: deviceWidth * 0.7,
  // },
  // priceContainer: {
  //   marginTop: deviceHeight * 0.02,
  // },
  // priceTextContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  // },
  // price: {
  //   fontWeight: 'bold',
  // },
  // priceTextInputContainer: {
  //   flexDirection: 'row',
  //   width: deviceWidth - 32,
  //   marginTop: deviceHeight * 0.005,
  //   height: isAndroid ? deviceHeight * 0.07 : deviceHeight * 0.06,
  //   paddingLeft: 10,
  //   paddingRight: 10,
  //   borderWidth: 1,
  //   borderColor: 'rgb(93,93,93)',
  //   alignItems: 'center',
  // },
  // priceTextInput: {
  //   flex: 1,
  //   fontSize: 16,
  //   color: '#a7a7a7',
  // },
  // sc: {
  //   width: 35,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // availableContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'flex-end',
  //   marginTop: deviceHeight * 0.01,
  //   alignItems: 'center',
  // },
  // allContainer: {
  //   borderWidth: 1,
  //   borderColor: 'rgb(143,143,143)',
  //   borderRadius: 3,
  //   paddingHorizontal: 8,
  //   backgroundColor: 'rgb(222,222,222)',
  // },
  // feesContainer: {
  //   marginTop: deviceHeight * 0.04,
  // },
  // feesText: {
  //   fontWeight: 'bold',
  // },
  // feesTextInputContainer: {
  //   marginTop: 5,
  //   flexDirection: 'row',
  //   fontSize: 16,
  //   height: deviceHeight * 0.06,
  //   paddingLeft: 10,
  //   color: '#a7a7a7',
  //   borderWidth: 1,
  //   borderColor: 'rgb(93,93,93)',
  // },
  // feesTextInput: {
  //   flex: 1,
  //   color: '#a7a7a7',
  // },
  // ftmTextContainer: {
  //   width: deviceWidth * 0.27,
  //   alignItems: 'flex-end',
  // },
  // ftmText: {
  //   fontSize: 12,
  // },
  // speedContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   marginTop: deviceHeight * 0.01,
  // },
  // slowBar: {
  //   backgroundColor: 'rgb(165,165,165)',
  //   width: deviceWidth * 0.27,
  //   height: deviceHeight * 0.01,
  // },
  // slowText: {
  //   textAlign: 'center',
  // },
  // normalBar: {
  //   backgroundColor: 'rgb(79,79,79)',
  //   width: deviceWidth * 0.27,
  //   height: deviceHeight * 0.01,
  // },
  // normalText: {
  //   textAlign: 'center',
  // },
  // fastBar: {
  //   backgroundColor: 'rgb(0,0,0)',
  //   width: deviceWidth * 0.27,
  //   height: deviceHeight * 0.01,
  // },
  // fastText: {
  //   textAlign: 'center',
  // },
  // memoContainer: {
  //   marginTop: deviceHeight * 0.02,
  // },
  // memoText: {
  //   fontWeight: 'bold',
  // },
  // memoTextInputContainer: {
  //   marginTop: 5,
  // },
  // memoTextInput: {
  //   fontSize: 16,
  //   height: deviceHeight * 0.06,
  //   paddingLeft: 10,
  //   color: '#a7a7a7',
  //   borderWidth: 1,
  //   borderColor: 'rgb(93,93,93)',
  // },
  // bottomSendContainer: {
  //   // alignItems: 'center', width: deviceWidth * 0.7, backgroundColor: 'rgb(233,177,18)', alignSelf: 'center',
  //   //   position: 'absolute', bottom: deviceHeight * 0.02, padding: deviceHeight * 0.015
  //   marginTop: 35,
  //   marginLeft: 35,
  //   marginRight: 35,
  //   shadowOffset: { width: 2, height: 2 },
  //   shadowColor: '#C0C0C0',
  //   shadowOpacity: 0.9,
  //   elevation: 2,
  //   backgroundColor: 'white', // invisible color
  //   marginBottom: 10,
  // },
  // bottomSendText: {
  //   fontSize: deviceHeight * 0.03,
  // },
};
export default style;
