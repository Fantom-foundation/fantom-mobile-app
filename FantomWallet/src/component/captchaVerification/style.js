
import { Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const style = {
    mainContainerStyle: {
        flex: 1,
        backgroundColor:'white'
    },
    textBox: {
        marginTop: deviceHeight * 0.025
    },
    mid : {
        padding: deviceHeight * 0.03
    },
    generateText: {
        marginTop: deviceHeight * 0.05
    },
    footerStyle: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
    },
}

export default style;