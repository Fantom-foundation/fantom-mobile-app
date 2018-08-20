
import { Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const style = {
    withdrawViewStyle: {
        flex: 1,
        padding:15,
        backgroundColor:'#fff'
    },
    textViewStyle: {
        // fontFamily: 'Times New Roman',
    }
}
export default style;