import * as FontFamily from '../../../../common/textFontFamily';

const style = {
  fantomBalanceView: {
    margin: 1,
    backgroundColor: '#fff',
    height: 150,
    justifyContent: 'center',

    shadowOffset: { width: 0, height: 10 },
    shadowColor: 'rgb(243,240,250)',
    shadowOpacity: 1,
    elevation: 1,
  },
  balanceContainer: {
    // backgroundColor: '#fff',
    // shadowOffset: { width: 0, height: 12, },
    // shadowColor: 'rgb(232,231,234)',
    // shadowOpacity: 0.5,
    
  },
  balanceViewText: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'green',
  },
  balanceViewTextOne: {
    fontSize: 32,
    fontFamily: FontFamily.SegoeUIBold,
    flex: 1,
    textAlign: 'center',
    alignSelf: 'center',
    // backgroundColor: 'red'
    // backgroundColor: 'yellow',
  },
  balanceTextTwo: {
    padding: 4,
    alignItems: 'center',
    // backgroundColor: 'green',
  },
  balanceTextStyle: {
    fontSize: 14,
    fontFamily: FontFamily.SegoeUILight,
  },
  balanceUnitText: {
    fontSize: 20,
    fontFamily: FontFamily.SegoeUIBold,
    // backgroundColor: 'pink'
  },
};
export default style;
