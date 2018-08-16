
import { Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const style = {
    mainContainerStyle: {
        flex: 1,
        backgroundColor:'white'
    },
    backArrow:{
        marginTop: deviceHeight * 0.04
    },
    header:{
        marginTop: deviceHeight * 0.05,
        alignSelf:'center'
    },
    headerText:{
        fontSize: deviceWidth * 0.06,
        fontWeight:'bold'
    },
    subHeader: {
        
    },
    subHeaderText1: {
        marginTop: deviceHeight * 0.05,
        alignSelf:'center'
    },
    subHeaderText2: {
        
        alignSelf:'center'
    },
    textBox: {
        marginTop: deviceHeight * 0.025
    },
    mid : {
        padding: deviceHeight * 0.03
    },
    footerStyle: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
    },
}

export default style;