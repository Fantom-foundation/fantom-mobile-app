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
  balanceContainer: {},
  balanceViewText: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceViewTextOne: {
    fontSize: 32,
    fontFamily: FontFamily.SegoeUIBold,
    flex: 1,
    textAlign: 'center',
    alignSelf: 'center',
  },
  balanceTextTwo: {
    padding: 4,
    alignItems: 'center',
  },
  balanceTextStyle: {
    fontSize: 14,
    fontFamily: FontFamily.SegoeUILight,
  },
  balanceUnitText: {
    fontSize: 20,
    fontFamily: FontFamily.SegoeUIBold,
  },
};
export default style;
