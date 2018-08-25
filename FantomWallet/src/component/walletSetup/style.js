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
        marginTop: 20,
    },
    subHeaderContainer: {
        marginTop:deviceHeight*0.25,
        alignItems: 'center',
    },  
    subHeaderText1: {
        color:'white',
        fontWeight: 'bold',
        fontSize: 32,
        marginTop: deviceHeight * 0.05,
        fontFamily:'SegoeUI'
    },
    subHeaderText2: {
        marginTop: deviceHeight * 0.02,
        fontSize: 18,
        fontWeight:'bold',
        color:'rgb(158,162,166)',
        fontFamily:'SegoeUI'
        
    },
    subHeaderText3: {
        fontSize: 18,
        color:'rgb(158,162,166)',
        fontFamily:'SegoeUI',
        fontWeight:'bold',
    },
    walletSetup: {
        position:'absolute',
        bottom:deviceHeight * 0.13,
        alignItems: 'center',
        alignSelf:'center',
        marginTop: deviceHeight * 0.1,
        borderWidth: 1,
        backgroundColor: 'rgb(235,187,17)',
        width: deviceWidth * 0.7,
        alignSelf:'center'
    },
    walletSetupText: {
        fontSize: deviceWidth*0.05,
        marginTop: deviceHeight * 0.02,
        marginBottom: deviceHeight * 0.02,
        fontFamily:'SegoeUI-SemiBold'
    },
    footer: {
        position: 'absolute',
        bottom: deviceHeight * 0.05,
        flexDirection: 'row',
        width:deviceWidth-40,
        justifyContent: 'space-between',
        alignSelf:'center'
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