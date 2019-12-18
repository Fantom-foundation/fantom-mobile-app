import { Dimensions } from 'react-native';
import { getHeight } from '../../utils/pixelResolver';
import {fonts,Colors} from '../../theme'

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const style = {
    mainContainer: {
        padding: deviceHeight * 0.05,
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        marginTop:getHeight(160)
    },
    imageBackground: {
        width: deviceWidth,
        height: deviceHeight,
        backgroundColor: 'white',
    },
    walletText: {
        fontSize: 28,
        color:Colors.textBlack,
        fontFamily: fonts.WorkSansBold,
        textAlign:'center'
    },
    checkedIcon: {
        width: 120,
        height:90
    },
    checkIcon: {
        marginTop: getHeight(100),
    }

}
export default style;