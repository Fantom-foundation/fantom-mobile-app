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
    // backgroundColor:'red'
  },
  crossIcon: {
    width: 16,
    height: 16,
    tintColor: Colors.textBlack
  },
  headingText: {
    color: Colors.textBlack,
    fontSize: FontSize.base,
    fontFamily: fonts.WorkSansMedium,
      textAlign: 'center',
    marginTop:getHeight(60)
  },
    keyPadView: {
      marginTop: getHeight(49),
        paddingHorizontal: getWidth(41),
    //   backgroundColor:'yellow'
    },
    numberButton: {
      flex: 1,
      margin: 1,
      flexDirection: "column",
      width: getWidth(54),
      height: getHeight(54),
        justifyContent: "center",
    },
    numberText: {
      fontSize: FontSize.large + 1,
      color: Colors.black,
      fontFamily: fonts.WorkSansBold,
      textAlign: "center"
    },
    inputView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: getWidth(76),
        marginTop:getHeight(170)
    },
    circleView: {
        width: getHeight(18),
        height: getHeight(18),
        borderRadius: getHeight(9),
        borderWidth: 2,
        borderColor:Colors.textBlack
    },
    filedCircleView: {
        width: getHeight(18),
        height: getHeight(18),
        borderRadius: getHeight(9),
        backgroundColor:Colors.royalBlue
    }
};
export default styles;
