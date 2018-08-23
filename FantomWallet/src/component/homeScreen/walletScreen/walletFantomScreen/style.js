import * as FontFamily from '../../../../common/textFontFamily/';

const style = {
    mainContainerStyle: {
        flex: 1,
    },
    fantomViewStyle: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: 10
    },
    textViewStyle: {
        fontFamily: FontFamily.SegoeUI_Light,
        letterSpacing: 1
    },
    amountDisplayStyle: {
        backgroundColor: 'white',
        padding: 8,
        alignItems: 'flex-end',
        shadowOffset: { width: 0, height: 5, },
        shadowColor: 'rgb(246,243,250)',
        shadowOpacity: 1,
        elevation: 2,
    }
}
export default style;