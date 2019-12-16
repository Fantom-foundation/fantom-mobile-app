import { StyleSheet } from "react-native";
import { Metrics, getHeight, getWidth } from "../../utils/pixelResolver";
import { Colors, fonts, FontSize } from "../../theme";

const crauselStyle = {
  crauselView: {
    marginTop: getHeight(58)
  },
  walletView: {
    backgroundColor: "pink",
    paddingTop: getHeight(22),
    paddingBottom: getHeight(51),
    borderRadius: getWidth(22)
  }
};

const headingStyles = {
  stakingTextView: {
    marginHorizontal: getWidth(22),
    flexDirection: "row",
    marginTop: getHeight(63),
    justifyContent: "space-between",
    alignItems: "center"
  },
  stakingText: {
    fontSize: getHeight(FontSize.xLarge + 4),
    fontFamily: fonts.WorkSansBold,
    color: Colors.blackOpacity
  },
  imagestyle: {
    width: 20,
    height: 20,
    borderRadius: 10
  }
};

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  ...headingStyles,
  ...crauselStyle
});
