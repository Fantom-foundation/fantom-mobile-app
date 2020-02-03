import { Dimensions } from "react-native";
import { getHeight, getWidth } from "../../../utils/pixelResolver";
import { fonts, Colors, FontSize } from "../../../theme";

const styles = {
  mainView: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: getWidth(22)
  },
  headingView: {
    marginTop: getHeight(18),
    flexDirection: "row",
    alignItems: "center"
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
  languageSelect: {
    flexDirection: "row",
    paddingHorizontal: getWidth(18),
    justifyContent: "space-between",
    marginTop: getHeight(30)
  },
  languageText: {
    color: Colors.textBlack,
    fontSize: FontSize.base,
    fontFamily: fonts.WorkSansSemiBold
  }
};
export default styles;
