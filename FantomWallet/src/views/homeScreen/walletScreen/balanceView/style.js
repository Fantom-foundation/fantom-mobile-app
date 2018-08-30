import * as FontFamily from '../../../../common/textFontFamily/';

const style = {
    fantomBalanceView: {
        margin: 1,
        backgroundColor: '#fff',
        height: 150,

        shadowOffset: { width: 0, height: 10, },
        shadowColor: 'rgb(243,240,250)',
        shadowOpacity: 1,

    },
    balanceContainer: {
        // backgroundColor: '#fff',
        // shadowOffset: { width: 0, height: 12, },
        // shadowColor: 'rgb(232,231,234)',
        // shadowOpacity: 0.5,
    },
    balanceViewText: {
        marginTop: 8,
        paddingTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
    },
    balanceViewTextOne: {
        fontSize: 32,
        fontFamily: FontFamily.SegoeUI_Bold,
        flex: 1,
        textAlign: 'center',
        // backgroundColor: 'yellow',
    },
    balanceTextTwo: {
        padding: 4,
        alignItems: 'center',
        // backgroundColor: 'green',
    },
    balanceTextStyle: {
        fontSize: 14,
        fontFamily: FontFamily.SegoeUI_Light,
    },
    balanceUnitText: {
        fontSize: 20,
        fontFamily: FontFamily.SegoeUI_Bold,
        // backgroundColor: 'pink'
    }
}
export default style;
