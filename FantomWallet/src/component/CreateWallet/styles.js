import {Dimensions} from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const styles = {
    mainContainer: {
        padding: deviceHeight * 0.05,
        justifyContent: 'center',
        
        flex:1
    },
    headerContainer: {
        marginLeft:16
    },
    headerText: {
        fontSize: 40,
        letterSpacing: 20,
        color: '#172067'
    },
    subHeaderContainer: {
        alignItems: 'center'
    },
    subHeaderText1: {
        fontWeight:'bold',
        fontSize: 25,
        marginTop: 20
    },
    subHeaderText2: {
        marginTop: 25
    },
    createWallet : {
        alignItems: 'center',
        marginTop: 150,
        borderWidth: 1,
        borderColor: '#e5e0ed',
        backgroundColor:'#e5e0ed',
    },
    createWalletText : {
        fontSize: 20,
        marginTop: 20,
        marginBottom: 20,
    },
    footer: {
        position: 'absolute',
        bottom:20,
        flexDirection:'row',

    },
    footerText1: {
        marginLeft:60,
        textDecorationLine:'underline',
        color:'#8064a2'
    },
    footerText2: {
        marginLeft:50,
        textDecorationLine:'underline',
        color:'#8064a2'
    },

}
export default styles;