import { StyleSheet } from "react-native";
import { getHeight, getWidth } from "../../utils/pixelResolver";
import { Colors, FontSize, fonts } from "../../theme";

export default StyleSheet.create({
  imgStyle: {
    width: getWidth(20),
    height: getWidth(20),
    tintColor:Colors.black
  },
  checkBoxStyle: {
    borderColor: Colors.black,
    borderWidth: 1.5,
    width: getWidth(21),
    height: getWidth(21),
    borderRadius:2,
    alignItems:"center"
  }
});
