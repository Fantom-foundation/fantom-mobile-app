import { StyleSheet } from "react-native";
import { Metrics, getHeight, getWidth } from "../../utils/pixelResolver";
import { Colors, fonts, FontSize } from "../../theme";

const keyPadStyle = {
  keyPadView: {
    marginTop: getHeight(49),
    paddingHorizontal: getWidth(19)
  },
  numberButton: {
    flex: 1,
    margin: 1,
    flexDirection: "column",
    width: getWidth(54),
    height: getHeight(54),
    justifyContent: "center"
  },
  numberText: {
    fontSize: FontSize.large + 1,
    color: Colors.white,
    fontFamily: fonts.WorkSansBold,
    textAlign: "center"
  }
};

const availableAmount = {
  availableAmountView: {
    marginTop: 12,
    flexDirection: "row",
    paddingHorizontal: getWidth(22),
    justifyContent: "space-between",
    alignItems: "center"
  },
  validatorNode: {
    marginTop: getHeight(22),
    paddingHorizontal: getWidth(22),
    fontFamily: fonts.WorkSansSemiBold,
    fontSize: FontSize.base,
    color: Colors.lightGrey
  },

  availablePrice: {
    fontFamily: fonts.WorkSansSemiBold,
    fontSize: FontSize.small,
    color: Colors.lightGrey,
    width: getWidth(250),
    flexWrap: "wrap"
  },
  stakinSpace: {
    marginTop: 4,
    paddingHorizontal: getWidth(22),
    fontFamily: fonts.WorkSansSemiBold,
    fontSize: FontSize.small,
    color: Colors.lightGrey
  },
  maxButton: {
    width: getWidth(50),
    height: 26,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
    borderRadius: 13,
    backgroundColor: Colors.lightGrey
  },
  maxButtonText: {
    color: Colors.white,
    fontFamily: fonts.WorkSansBold,
    fontSize: FontSize.small
  }
};
const buttonStyles = {
  stakeButton: {
    marginTop: getHeight(33),
    alignSelf: "center",
    width: getWidth(152),
    height: getHeight(50),
    borderRadius: getHeight(25),
    backgroundColor: Colors.lightGrey,
    alignItems: "center",
    justifyContent: "center"
  },
  stakeText: {
    fontSize: FontSize.mediumlarge,
    fontFamily: fonts.WorkSansSemiBold,
    color: Colors.white
  }
};

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.royalBlue
  },
  crossButton: {
    marginLeft: getWidth(22)
  },

  sendPrice: {
    fontSize: getHeight(72),
    fontFamily: fonts.WorkSansBold,
    color: Colors.white,
    flexWrap: "wrap",
    width: getWidth(200),
    textAlign: "center",
    marginTop: 18,
    alignSelf: "center"
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: Colors.transparent
  },
  ...keyPadStyle,
  ...availableAmount,
  ...buttonStyles
});
