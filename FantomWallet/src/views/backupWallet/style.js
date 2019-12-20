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
  headerTextView:{
      flex: 1,
      paddingTop:getHeight(20)
  },
  mainHeadingContainer: {
   // top:0
  },
  mainHeading: {
    textAlign: "center",
    fontSize: FontSize.huge - 4,
    marginHorizontal: getWidth(22),
    color: Colors.royalBlue,
    fontFamily: fonts.WorkSansBold
  },
  subHeadingContainer: {
    marginTop: getHeight(12),
    alignContent: "center"
  },
  subHeading: {
    textAlign: "center",
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
    marginTop: getHeight(25)
  },
  checkBoxContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  headerStyle:{
    backgroundColor:Colors.transparent,
    top:getHeight(0),
    padding:0,
    height:getHeight(40)
  }
});
