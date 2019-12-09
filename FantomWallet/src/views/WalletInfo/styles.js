import { Dimensions } from 'react-native';
import {Colors} from '../../theme/colors'
import {Metrics, getHeight, getWidth} from '../../utils/pixelResolver'
import { FontSize } from '../../theme/fontSize';
import { fonts } from '../../theme/font';
const styles = {
    mainContainer: {
        flex: 1,
        marginHorizontal:20
    },
    headingView: {
        marginTop: getHeight(63),
    },
    headingText: {
        fontSize: FontSize.xLarge + 4,
        fontFamily: fonts.WorkSansBold,
        color:Colors.textBlack
    },
    addressText: {
        marginTop: getHeight(40),
        fontSize: FontSize.base,
        fontFamily: fonts.WorkSansMedium,
        color:Colors.textBlack
    },
    codeView: {
        flexDirection: 'row',
        marginTop: getHeight(6),
        alignItems: 'center',
        justifyContent:'space-between'
    },
    codeText: {
        fontSize: FontSize.mediumlarge,
        fontFamily: fonts.WorkSansBold,
        color: Colors.textBlack,
        width: Metrics.screenWidth * 0.72,
        flexWrap: 'wrap',
    },
    textInput: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.grey,
        width: Metrics.screenWidth * 0.72,
        height:Metrics.screenHeight * 0.04
    },
    modalStyle: {
        width: Metrics.screenWidth,
        height:Metrics.screenHeight*0.54,
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius:20,
        borderTopRightRadius: 20,
        padding:20
    },
    colorsView: {
        width: getWidth(50),
        height: getWidth(50),
        borderRadius: getWidth(25),
        backgroundColor:'green'
    },
    colorModalView: {
        backgroundColor: 'red',
        justifyContent: 'space-between',
        flexDirection:'row'
    },
}
export default styles;