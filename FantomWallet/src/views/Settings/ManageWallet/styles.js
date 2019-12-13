import { Dimensions } from 'react-native';
import { getHeight, getWidth, Metrics } from '../../../utils/pixelResolver';
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
    alignItems: 'center'
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
    // paddingLeft: getWidth(36),
    marginTop: getHeight(50),
    // backgroundColor: 'green',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  rowsText: {
    fontSize: FontSize.base,
    fontFamily: fonts.WorkSansSemiBold
  },
  iconStyle: {
    width: 15,
    height: 18,
    tintColor: Colors.grey
  },
  centerTextView: {
    width: getWidth(200),
    marginLeft: getWidth(18)
  },
  centerBottomText: {
    flexDirection: 'row'
  },
  centerText: {
    fontSize: FontSize.xSmall,
    fontFamily: fonts.WorkSansMedium,
    color: Colors.textGrey
  },
  equalIcon: {
    width: 16,
    height: 16,
    tintColor: Colors.textGrey
  },
  circularView: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginLeft: getWidth(18)
  },
  modalStyle: {
    width: getWidth(120),
    height: getWidth(120),
    alignSelf: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    shadowColor: Colors.blackOpacity,
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 5,
      width: 0
    },
    shadowRadius: 4,
    elevation: 5,
    backgroundColor:'green'
  },
  colorModalStyle: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight * 0.52,
    position: 'absolute',
    bottom: 0,
    shadowColor: Colors.blackOpacity,
    shadowOpacity: 0.4,
    shadowOffset: {
      height: 5,
      width: 0
    },
    shadowRadius: 4,
    elevation: 5,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    padding: 20
  },
  codeText: {
    fontSize: FontSize.mediumlarge,
    fontFamily: fonts.WorkSansBold,
    color: Colors.textBlack,
    width: Metrics.screenWidth * 0.72,
    flexWrap: 'wrap',
},
  modalText: {
    fontFamily: fonts.WorkSansBold,
    fontSize: FontSize.mediumSmall,
    alignSelf: "center",
    backgroundColor:'yellow'
  },
  renameModalStyle: {
    width: Metrics.screenWidth - 40,
    height: Metrics.screenHeight * 0.5,
    position: 'absolute',
    bottom:0,
    shadowColor: Colors.blackOpacity,
    shadowOpacity: 0.4,
    shadowOffset: {
      height: 5,
      width: 0
    },
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 22,
    padding: 20
  },
  textInput: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.textGrey,
    width: Metrics.screenWidth * 0.72,
    height: Metrics.screenHeight * 0.04,
  }
};
export default styles;
