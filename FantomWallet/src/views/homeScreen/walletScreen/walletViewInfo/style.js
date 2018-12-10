import * as FontFamily from '../../../../common/textFontFamily';

const style = {
  mainContainerStyle: {
    flex: 1,
  },
  fantomViewStyle: {
    flex: 1,
    backgroundColor: 'rgb(14,14,18)',
  },
  textViewStyle: {
    fontFamily: FontFamily.SegoeUILight,
    letterSpacing: 1,
  },
  amountDisplayStyle: {
    backgroundColor: 'white',
    padding: 8,
    alignItems: 'flex-end',
    shadowOffset: { width: 0, height: 5 },
    shadowColor: 'rgb(246,243,250)',
    shadowOpacity: 1,
    elevation: 2,
  },
  refreshMessageViewStyle: {
    backgroundColor: '#DCDCDC',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  refreshTextStyle: {
    fontSize: 12,
    paddingRight: 4,
  },
  refreshIconStyle: {
    alignSelf: 'center',
  },
};
export default style;
