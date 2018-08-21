
import { Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const style = {
    depositViewStyle: {
        flex: 1,
        backgroundColor: '#fff'
    },
    textViewStyle: {
        // backgroundColor: 'red'
        // fontFamily: 'Times New Roman',
    },
    depositScreenStyle: {
        width:deviceWidth,
        height:deviceHeight*0.84,
    }
}
export default style;