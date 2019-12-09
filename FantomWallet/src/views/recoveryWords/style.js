import { StyleSheet } from "react-native";
import { getHeight, getWidth } from "../../utils/pixelResolver";
import { Colors, FontSize, fonts } from "../../theme";

export default StyleSheet.create({
  mainContainerStyle: {
    flex: 1,
    paddingHorizontal: getWidth(22),
    backgroundColor: Colors.white,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  flex1: {
    flex: 1,
    justifyContent: "center"
  },
  mainHeadingContainer: {
    // marginTop: getHeight(40)
  },
  mainHeading: {
    textAlign: "center",
    fontSize: FontSize.huge - 4,
    color: Colors.royalBlue,
    fontFamily: fonts.WorkSansBold
  },
  subHeadingContainer: {
    marginTop: getHeight(12),
    alignContent: "center"
  },
  subHeading: {
    textAlign: "center",
    lineHeight: getHeight(24),
    fontSize: FontSize.base,
    color: Colors.textBlack,
    fontFamily: fonts.WorkSansMedium
  },
  termsContainer: {
    borderColor: Colors.red,
    borderWidth: getWidth(4),
    borderRadius: 21,
    padding: getWidth(16)
  },
  termsText: {
    fontSize: FontSize.base,
    color: Colors.textBlack,
    lineHeight: getHeight(24),
    fontFamily: fonts.WorkSansSemiBold
  },
  buttonText: {
    fontSize: FontSize.base,
    color: Colors.white,
    fontFamily: fonts.WorkSansBold
  },
  buttonStyle: {
    borderRadius: 25,
    height: getHeight(60),
    marginTop: getHeight(25),
    backgroundColor: Colors.royalBlue,
    top:getHeight(0)
  },
  checkBoxContainer: {
    flexDirection: "row"
  }
});
