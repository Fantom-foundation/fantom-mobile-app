import { getHeight, getWidth } from '../../../utils/pixelResolver';
import { fonts, Colors,FontSize } from '../../../theme';

const style = {
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: getWidth(20)
  },
  headingView: {
    marginTop: getHeight(18),
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor:'red'
  },
  crossIcon: {
    width: 16,
    height: 16,
    tintColor: Colors.textBlack
  },
  headingText: {
    color: Colors.textBlack,
    fontSize: FontSize.large + 1,
    fontFamily: fonts.WorkSansBold,
    marginLeft: getWidth(15)
    },
    mainView: {
        marginTop: getHeight(55),
    },
    rowsView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: getWidth(28),
        alignItems:'center'
    },
    rowsText: {
        fontSize: FontSize.base,
        fontFamily: fonts.WorkSansSemiBold,
        color:Colors.textBlack
    }
};
export default style;
