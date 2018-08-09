import { Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const styles = {
    mainContainer: {
        padding: deviceHeight * 0.05,
        justifyContent: 'center',
        flex: 1
    },
    headerContainer: {
        alignItems: 'center'
    },
    headerImage: {
        height: deviceHeight * 0.2,
        width: deviceWidth * 0.8
    },
    subHeaderContainer: {
        alignItems: 'center'
    },
    subHeaderText1: {
        fontWeight: 'bold',
        fontSize: 25,
        marginTop: deviceHeight * 0.05
    },
    subHeaderText2: {
        marginTop: deviceHeight * 0.05
    },
    createWallet: {
        alignItems: 'center',
        marginTop: deviceHeight * 0.1,
        borderWidth: 1,
        borderColor: '#e5e0ed',
        backgroundColor: '#e5e0ed',
    },
    createWalletText: {
        fontSize: 20,
        marginTop: deviceHeight * 0.05,
        marginBottom: deviceHeight * 0.05,
    },
    footer: {
        position: 'absolute',
        bottom: deviceHeight * 0.05,
        flexDirection: 'row',
        // justifyContent: 'space-around'
    },
    footerText1: {
        marginLeft: deviceWidth * 0.2,
        textDecorationLine: 'underline',
        color: '#8064a2'
    },
    footerText2: {
        marginLeft: deviceWidth * 0.1,
        textDecorationLine: 'underline',
        color: '#8064a2'
    },

}
export default styles;