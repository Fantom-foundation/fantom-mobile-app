import * as FontFamily from '../../../../common/textFontFamily';
import { DEVICE_WIDTH, DEVICE_HEIGHT } from '../../../../common/constants';

const style = {
  mainViewStyle: {
    flex: 1,
  },
  headingCardViewStyle: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: 'rgb(50,59,66)',
    height: 40,
    justifyContent: 'center',
    paddingLeft: 28,
  },
  headingCardTextStyle: {
    color: '#FFF',
    fontSize: 14,
    fontFamily: 'SFProDisplay-Regular',
  },
  transactionSortIconStyle: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 16,
  },
};

export default style;
