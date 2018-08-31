import * as FontFamily from '../../../../../common/textFontFamily/';
import { Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const style = {

    transactionCardStyle: {
        marginTop: deviceHeight * 0.01,
        marginBottom: deviceHeight * 0.01,
        // marginBottom: 8,
        // height: 56,
        height: deviceHeight * 0.09,
        backgroundColor: '#fff',
        shadowColor: 'rgb(237,231,246)',
        shadowOffset: { width: 0, height: 10 },
        // shadowOpacity: 0.04
        shadowOpacity: 1, 
        elevation: 1,
    },
    rowOneStyle: {
        flexDirection: 'row',
        margin: 4
    },
    rowOneViewStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    transactionTypeStyle: {
        // fontFamily: FontFamily.SegoeUI
    },
    rowOneTextStyle: {
        fontFamily: FontFamily.SegoeUI_Semibold

    },
    unitStyle: {
        fontSize: 12,
        fontFamily: FontFamily.SegoeUI
    },
    rowTwoStyle: {
        flexDirection: 'row',
        margin: 4,
    },
    transactionIdStyle: {
        width: deviceWidth/2,
        fontFamily: FontFamily.SFProDisplay_Regular,
        letterSpacing: 1,
    },
    rowTwoViewStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    successTextStyle: {
        color: '#00CE52',
        fontFamily: FontFamily.SFProDisplay_Regular,
        letterSpacing: 1
    },
    failureTextStyle: {
        color: '#FF0000',
        fontFamily: FontFamily.SFProDisplay_Regular,
        letterSpacing: 1
    }
}

export default style;