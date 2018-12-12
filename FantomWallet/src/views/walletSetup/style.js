import { Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const styles = {
  mainContainer: {
    padding: deviceHeight * 0.05,
    flex: 1,
  },
  imageBackground: {
    width: deviceWidth,
    // height: deviceHeight,
    flex: 1,
    backgroundColor: 'black',
  },
  // Header image styles
  headerContainer: {
    alignItems: 'center',
  },
  headerImage: {
    width: deviceWidth * 0.4,
  },
  // Mid Container style
  subHeaderContainer: {
    marginTop: deviceHeight * 0.12,
    width: deviceWidth * 0.9,
    paddingVertical: deviceHeight * 0.08,
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
    marginBottom: deviceHeight * 0.02,
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
    width: deviceWidth,
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgb(35,39,40)',
    paddingHorizontal: 15,
  },
  recoverWalletStyle: {
    padding: 5,
    alignItems: 'center',
  },
  footerText1: {
    color: '#00B1FF',
    fontWeight: 'bold',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    paddingVertical: 5,
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
  },
  walletSetup: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#00B1FF',
    width: deviceWidth,
  },
  walletSetupText: {
    fontSize: deviceWidth * 0.05,
    marginTop: deviceHeight * 0.02,
    marginBottom: deviceHeight * 0.02,
    fontFamily: 'SFProDisplay-Bold',
    fontWeight: 'bold',
    color: '#FFF',
  },
};
export default styles;
