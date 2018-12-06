import { Dimensions } from 'react-native';
import * as FontFamily from '../../../../common/textFontFamily';

const deviceWidth = Dimensions.get('window').width;
const style = {
  fantomBalanceView: {
    backgroundColor: 'rgb(44,52,58)',
    height: 150,
    width: deviceWidth - 32,
    alignSelf: 'center',
    borderRadius: 10,
  },
  balanceContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: 'rgb(50,59,66)',
    height: 40,
    justifyContent: 'center',
    paddingLeft: 32,
  },
  amountHeadingStyle: {
    color: 'rgb(166,225,100)',
    fontSize: 12,
    fontFamily: 'SFProDisplay-Medium',
  },
  balanceViewText: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceViewTextOne: {
    fontSize: 24,
    fontFamily: 'SFProDisplay-Bold',
    flex: 1,
    textAlign: 'center',
    alignSelf: 'center',
    color: '#fff',
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
