import { Dimensions, StyleSheet } from 'react-native';

const deviceWidth = Dimensions.get('window').width;

export default StyleSheet.create({
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
    paddingLeft: 28,
  },
  amountHeadingStyle: {
    color: 'rgb(166,225,100)',
    fontSize: 14,
    fontFamily: 'SFProDisplay-Medium',
  },
  balanceViewText: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceUnitTextStyle: {
    fontSize: 24,
    fontFamily: 'SFProDisplay-Bold',
    flex: 1,
    textAlign: 'center',
    alignSelf: 'center',
    color: '#fff',
  },
});
