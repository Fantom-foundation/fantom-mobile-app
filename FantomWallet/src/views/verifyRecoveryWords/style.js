import { StyleSheet } from "react-native";
import { getHeight, getWidth } from "../../utils/pixelResolver";
import { Colors, FontSize, fonts } from "../../theme";
import { Dimensions } from "react-native";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

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
     marginTop: getHeight(43)
  },
  mainHeading: {
    textAlign: "center",
    fontSize: FontSize.huge - 4,
    color: Colors.royalBlue,
    fontFamily: fonts.WorkSansBold
  },
  subHeadingContainer: {
    marginTop: 15,
    alignContent: "center"
  },
  subHeading: {
    textAlign: "center",
    lineHeight: getHeight(24),
    fontSize: FontSize.base,
    color: Colors.textBlack,
    fontFamily: fonts.WorkSansMedium
  },
  verfiyContainer: {
    backgroundColor: Colors.greyOpacity,
    borderWidth: 3,
    borderRadius: 11,
    padding: getWidth(16),
    marginVertical: getHeight(15)
  },
  selectedTextView: {
    fontSize: FontSize.base,
    color: Colors.textBlack,
    lineHeight: getHeight(24),
    fontFamily: fonts.WorkSansMedium
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
    position:'absolute',
     top:getHeight(590)
  },
  checkBoxContainer: {
    flexDirection: "row"
  },
  textContainer: {
    marginTop: deviceHeight * 0.03,
    flexDirection: "row",
    flexWrap: "wrap",
   // justifyContent: "center",

  },
  wordWrap: {
    width: deviceWidth * 0.25,
    height: deviceHeight * 0.05,
    marginLeft: deviceWidth * 0.01,
    marginBottom: deviceWidth * 0.03,
    flexDirection: "row"
    //alignItems: "center",
    //justifyContent: "center"
  },
  errorText: {
    fontSize: FontSize.base,
    color: Colors.red,
    fontFamily: fonts.WorkSansSemiBold,
    textAlign: "center"
  },

});
