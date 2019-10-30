import { StyleSheet } from 'react-native';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '~/common/constants';

export default StyleSheet.create({
  mainContainer: {
    padding: DEVICE_HEIGHT * 0.05,
    flex: 1,
  },
  backgroundContainer: {
    width: DEVICE_WIDTH,
    // height: DEVICE_HEIGHT,
    flex: 1,
    backgroundColor: 'black',
  },
  backgroundImage: {
    width: DEVICE_WIDTH * 0.6,
    height: DEVICE_HEIGHT * 0.77,
    opacity: 0.05,
    top: DEVICE_HEIGHT * 0.1,
    right: -((DEVICE_WIDTH * 0.45) / 2),
    position: 'absolute',
  },
  // Header image styles
  headerContainer: {
    alignItems: 'center',
  },
  headerImage: {
    width: DEVICE_WIDTH * 0.4,
  },
  // Mid Container style
  subHeaderContainer: {
    marginTop: DEVICE_HEIGHT * 0.12,
    width: DEVICE_WIDTH * 0.9,
    paddingVertical: DEVICE_HEIGHT * 0.08,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(35,39,40)',
    borderRadius: 10,
  },
  subHeaderText1: {
    color: '#FFF',
    fontSize: 32,
    fontFamily: 'SFProDisplay-Thin',
    fontWeight: '400',
    marginBottom: DEVICE_HEIGHT * 0.02,
  },
  subHeaderText2: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'SFProDisplay-Thin',
  },
  // Footer button Styles
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 0,
  },
  upperButtonContainer: {
    width: DEVICE_WIDTH,
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'rgb(35,39,40)',
    paddingHorizontal: 15,
  },
  recoverWalletStyle: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
  },
  footerText1: {
    color: '#00B1FF',
    fontWeight: 'bold',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    justifyContent: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    height: '100%',
  },
  footerText2: {
    color: 'white',
    fontFamily: 'SFProDisplay-Light',
    fontSize: 14,
  },
  division: {
    width: 1,
    backgroundColor: 'white',
    marginHorizontal: 5,
    height: '60%',
  },
  walletSetup: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#00B1FF',
    width: DEVICE_WIDTH,
  },
  walletSetupText: {
    fontSize: DEVICE_WIDTH * 0.05,
    marginTop: DEVICE_HEIGHT * 0.02,
    marginBottom: DEVICE_HEIGHT * 0.02,
    fontFamily: 'SFProDisplay-Bold',
    fontWeight: 'bold',
    color: '#FFF',
  },
});
