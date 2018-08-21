
import { Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const style = {
    mainContainer: {
        flex: 1,
        backgroundColor:'#fff',
    },
    progressContainer:{
        marginTop: deviceHeight * 0.05
    },
    arrowContainer:{
        marginTop: deviceHeight * 0.02,
        marginLeft: deviceHeight * 0.02,
    },
    mid:{
        padding: deviceHeight * 0.06,
        paddingTop: deviceHeight * 0.02,
        
    },
    warningContainer:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    secretText:{
        fontSize:22,
        fontWeight:'bold',
        color:'rgb(233,177,18)'
    },

    // mid : {
    //     padding: deviceHeight * 0.01,
    //     marginTop:deviceHeight * 0.03
    // },
    text:{
        marginRight:deviceWidth * 0.06,
        marginBottom:deviceWidth * 0.01,
        fontSize:14,
        fontWeight:'bold'
    },
    textContainer : {
        marginTop: deviceHeight * 0.05,
        flexDirection:'row',
        flexWrap:'wrap' 
    },
    wordWrap:{
        borderWidth:1,
        borderColor:'rgb(145,145,145)',
        width:deviceWidth * 0.25,
        height:deviceHeight * 0.05,
        marginLeft:deviceWidth * 0.01,
        marginBottom:deviceWidth * 0.04,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    messageContainer:{
        marginTop:deviceHeight * 0.03,
        alignItems:'center'
    },
    clipBoardContainer:{
        backgroundColor:'rgb(216,216,216)',
        alignItems:'center',
        marginTop:deviceHeight * 0.04,
        padding:5
    },
    clipBoardText:{
        fontSize:20
    },
    line:{
        backgroundColor:'rgb(243,243,243)',
        marginTop:deviceWidth * 0.15,
        height:2
    },
    lastMessageContainer:{
        marginTop:deviceWidth * 0.05,
        
    },
    footerStyle: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
    },
}

export default style;