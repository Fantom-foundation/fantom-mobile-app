import { Platform, StyleSheet } from 'react-native';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '~/common/constants';

const isAndroid = Platform.OS === 'android';

export default StyleSheet.create({
  scroll: {
    height: '100%',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  mainContainerStyle: {
    flex: 1,
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH,
    backgroundColor: 'rgb(14,14,18)',
  },
  topMarginContainer: {
    height: 32,
  },
  backgroundIconStyle: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '45%',
    height: '85%',
    opacity: !isAndroid ? 0.03 : 0.02,
    right: '-15%',
  },
  amtContainer: {
    backgroundColor: 'rgb(44,52,58)',
    height: 150,
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
  priceSubContainerColor: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(0,177,251)',
  },
  priceTextStyle: {
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 14,
  },
  priceTextStyleAll: {
    fontFamily: 'SFProDisplay-Semibold',
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

  sendImage: {
    height: DEVICE_WIDTH * 0.09,
    width: DEVICE_WIDTH * 0.09,
  },

  qrCode: {
    width: 25,
    height: 25,
  },
  iconContact: {
    width: 22,
    height: 22,
    marginRight: 3,
  },

});
