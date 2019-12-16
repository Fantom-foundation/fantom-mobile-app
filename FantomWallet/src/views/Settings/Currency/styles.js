import { getHeight, getWidth } from '../../../utils/pixelResolver';
import { fonts, Colors, FontSize } from '../../../theme';

const styles = {
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: getWidth(22)
  },
  headingView: {
      marginTop: getHeight(25),
      flexDirection:'row',
      alignItems: 'center',
  },
  crossIcon: {
    width: 16,
    height: 16,
    tintColor: Colors.textBlack
  },
  headingText: {
    color: Colors.textBlack,
    fontSize: FontSize.large+1,
      fontFamily: fonts.WorkSansBold,
    marginLeft:getWidth(20)
  },
  currencyDataView: {
      marginTop: getHeight(55),
    },
    rowsTextView: {
        marginLeft:getWidth(35),
        marginVertical: getHeight(11),
    },
    selectedRowsText: {
        fontSize: FontSize.base,
        fontFamily: fonts.WorkSansSemiBold,
        color:Colors.black
    },
    rowsText: {
        fontSize: FontSize.base,
        fontFamily: fonts.WorkSansSemiBold,
        color:Colors.silverGrey
    },
    tickIcon: {
        width: getWidth(18),
        height: getHeight(15),
        tintColor:Colors.black
    }
};
export default styles;
