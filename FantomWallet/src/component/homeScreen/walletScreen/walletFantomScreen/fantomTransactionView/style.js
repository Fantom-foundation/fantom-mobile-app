import * as FontFamily from '../../../../../common/textFontFamily/';

const style = {
    mainViewStyle: {
        flex: 1,
    },
    headingCardViewStyle: {
        backgroundColor: 'rgb(242,242,242)',
        height: 45,
        flexDirection: 'row',
        alignItems: 'center',
    },
    headingCardTextStyle: {
        fontSize: 20,
        fontFamily: FontFamily.SegoeUI_Bold,
        letterSpacing: 0.5,
    },
    dateViewStyle: {
        margin: 4,
    },
    transactionSortIconStyle: {
        flex: 1,
        alignItems: 'flex-end',
        paddingRight: 16,
    }
}

export default style;