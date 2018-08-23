import { Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const styles = {
    mainContainer: {
        padding: deviceHeight * 0.05,
        flex: 1, 
    },
    imageBackground:{
        width:deviceWidth,
        height:deviceHeight,
        backgroundColor:'black'
    },
    headerContainer: {
        alignItems: 'center',
    },
    subHeaderContainer: {
        marginTop:deviceHeight*0.25,
        alignItems: 'center',
    },
    subHeaderText1: {
        color:'white',
        fontWeight: 'bold',
        fontSize: deviceWidth*0.08,
        marginTop: deviceHeight * 0.05,
        FontFamily:'Segoe-UI'
    },
    subHeaderText2: {
        marginTop: deviceHeight * 0.02,
        fontSize: deviceWidth*0.04,
        color:'white',
        FontFamily:'Segoe-UI'
        
    },
    subHeaderText3: {
        fontSize: deviceWidth*0.04,
        color:'white',
        FontFamily:'Segoe-UI'
    },
    createWallet: {
        position:'absolute',
        bottom:deviceHeight * 0.13,
        alignItems: 'center',
        alignSelf:'center',
        marginTop: deviceHeight * 0.1,
        borderWidth: 1,
        backgroundColor: 'rgb(235,187,17)',
        width: deviceWidth * 0.7,
        alignSelf:'center',
        
    },
    createWalletText: {
        fontSize: deviceWidth*0.05,
        marginTop: deviceHeight * 0.02,
        marginBottom: deviceHeight * 0.02,
        FontFamily:'Segoe-UI-SemiBold'
    },
    footer: {
        position: 'absolute',
        bottom: deviceHeight * 0.05,
        flexDirection: 'row',
        width:deviceWidth-40,
        justifyContent: 'space-between',
        alignSelf:'center',
        
    },
    footerText1: {
        // marginLeft: deviceWidth * 0.2,
        color: 'white',
        fontWeight: 'bold',
    },
    division:{
        
        width:1,
        backgroundColor:'white'
    },
    footerText2: {
        // marginLeft: deviceWidth * 0.1,
        color: 'white',
        fontWeight: 'bold',
    },

}
export default styles;