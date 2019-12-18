import { Dimensions } from 'react-native';
import { getHeight, getWidth } from '../../../utils/pixelResolver';
import { fonts, Colors, FontSize } from '../../../theme';

const styles = {
  mainView: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: getWidth(22)
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
    marginLeft: getWidth(20)
    },
    middleView: {
        paddingLeft: getWidth(36),
        marginTop:getHeight(55),
        // backgroundColor: 'green',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center'
    },
    rowsText: {
        fontSize: FontSize.base,
        fontFamily:fonts.WorkSansSemiBold
    },
    iconStyle: {
        width: 15,
        height: 18,
        tintColor: Colors.grey,
        // backgroundColor: 'red',
      }
};
export default styles;
