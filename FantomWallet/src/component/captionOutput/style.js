
import { Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const style = {
    mainContainerStyle: {
        flex: 1,
        backgroundColor:'white'
    },
    generateView: {
        marginTop: deviceHeight * 0.05,
    },
    generateText: {
        fontSize:16,
    },
    mid : {
        padding: deviceHeight * 0.01
    },
    mapText:{
        marginRight:deviceWidth * 0.06,
        marginBottom:deviceWidth * 0.01,
        fontSize:20
    },
    text : {
        marginTop: deviceHeight * 0.05,
        flexDirection:'row',
        flexWrap:'wrap',
        backgroundColor:'#f2f2f2'
    },
    footerStyle: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
    },
    footerText: {
        fontWeight:'bold'
    },
}

export default style;