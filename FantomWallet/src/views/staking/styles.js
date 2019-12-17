import { StyleSheet } from "react-native";
import { Metrics, getHeight, getWidth } from "../../utils/pixelResolver";
import { Colors, fonts, FontSize } from "../../theme";

const crauselStyle = {
  crauselView: {
    marginTop: getHeight(58)
  },
  walletView: {
    paddingTop: getHeight(22),
    paddingBottom: getHeight(51),
    borderRadius: getWidth(22),
    width: getWidth(260)
  },
  titleView: {
    fontSize: FontSize.base,
    fontFamily: fonts.WorkSansSemiBold,
    paddingHorizontal: getWidth(22)
  },
  amountStyle: {
    textAlign: "right",
    marginTop: 40,
    width: getWidth(150),
    alignSelf: "flex-end",
    fontFamily: fonts.WorkSansBold,
    fontSize: FontSize.large + 1
  },
  walletTextStyle: {
    textAlign: "right",
    marginTop: 4,
    width: getWidth(150),
    alignSelf: "flex-end",
    fontFamily: fonts.WorkSansSemiBold,
    fontSize: FontSize.small
  },
  buttonStakeView: {
    width: getWidth(121),
    height: getHeight(50),
    backgroundColor: Colors.white,
    borderBottomRightRadius: getHeight(25),
    borderTopRightRadius: getHeight(25),
    marginRight: -2,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonUnstakeView: {
    width: getWidth(121),
    height: getHeight(50),
    backgroundColor: Colors.white,
    borderBottomLeftRadius: getHeight(25),
    borderTopLeftRadius: getHeight(25),
    right: -1,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonView: {
    marginTop: getHeight(31),
    flexDirection: "row",
    justifyContent: "space-between"
  },
  buttonText: {
    fontSize: FontSize.mediumlarge,
    fontFamily: fonts.WorkSansSemiBold
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
