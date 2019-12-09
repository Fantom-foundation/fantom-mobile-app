import { Dimensions } from 'react-native';
import { getHeight } from '../../utils/pixelResolver';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const styles = {
    mainContainer: {
        padding: deviceHeight * 0.05,
        flex: 1,
        backgroundColor:'rgb(56,99,207)'
    },
    imageBackground: {
        width: deviceWidth,
        height: deviceHeight,
        backgroundColor: 'black'
    },
    headerContainer: {
        alignItems: 'center',
        marginTop: getHeight(98),
    },
    fantomText: {
        fontSize: 45,
        fontFamily: 'SegoeUI-SemiBold',
        color:'white'
    },
    fantomLogo: {
        width: 250,
        height: 200,
    },
    subHeaderContainer: {
        marginTop: getHeight(84),
        alignItems: 'center',
    },
    subHeaderText1: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 32,
        marginTop: deviceHeight * 0.05,
        fontFamily: 'SegoeUI'
    },
    subHeaderText2: {
        marginTop: deviceHeight * 0.02,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'rgb(158,162,166)',
        fontFamily: 'SegoeUI'

    },
    subHeaderText3: {
        fontSize: 18,
        color: 'rgb(158,162,166)',
        fontFamily: 'SegoeUI',
        fontWeight: 'bold',
    },
    walletSetup: {
        position: 'absolute',
        // bottom: deviceHeight * 0.13,
        bottom: deviceHeight * 0.16,
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: deviceHeight * 0.1,
        backgroundColor: 'white',
        width: deviceWidth * 0.8,
        alignSelf: 'center',
        borderRadius:25
    },
    walletSetupText: {
        fontSize: 18,
        marginTop: deviceHeight * 0.02,
        marginBottom: deviceHeight * 0.02,
        fontFamily: 'SegoeUI-SemiBold',
        color:'rgb(56,99,207)'
    },
    footer: {
        position: 'absolute',
        bottom: deviceHeight * 0.05,
        flexDirection: 'row',
        width: deviceWidth - 40,
        justifyContent: 'space-between',
        alignSelf: 'center'
    },
    footerText1: {
        // marginLeft: deviceWidth * 0.2,
        color: 'white',
        fontWeight: 'bold',
        fontSize:16
    },
    division: {

        width: 1,
        backgroundColor: 'white'
    },
    footerText2: {
        // marginLeft: deviceWidth * 0.1,
        color: 'white',
        fontWeight: 'bold',
    },
    recoverWalletStyle: {
        // padding: 4,
        alignItems: 'center',
        position: 'absolute',
        bottom: deviceHeight * 0.10,
        width: deviceWidth,
    },
    recoverWalletTextStyle:{

    }

}
export default styles;