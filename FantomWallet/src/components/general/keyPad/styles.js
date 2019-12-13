import { StyleSheet } from "react-native";
import { getHeight, getWidth } from "../../../utils/pixelResolver";
import { Colors, fonts, FontSize } from "../../../theme";

export default StyleSheet.create({
  keyPadView: {
    marginTop: getHeight(49),
    paddingHorizontal: getWidth(41)
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
});
