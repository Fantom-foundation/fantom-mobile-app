import { Dimensions, StyleSheet } from "react-native";
import { Colors, FontSize, fonts } from "../../theme";
import { Metrics, getHeight, getWidth } from "../../utils/pixelResolver";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20
  },
  headingView: {
    marginTop: getHeight(63)
  },
  headingText: {
    fontSize: FontSize.xLarge + 4,
    fontFamily: fonts.WorkSansBold,
    color: Colors.textBlack
  },
  addressText: {
    marginTop: getHeight(40),
    fontSize: FontSize.base,
    fontFamily: fonts.WorkSansMedium,
    color: Colors.textBlack
  },
  codeView: {
    flexDirection: "row",
    marginTop: getHeight(6),
    alignItems: "center",
    justifyContent: "space-between"
  },
  codeText: {
    fontSize: FontSize.mediumlarge,
    fontFamily: fonts.WorkSansBold,
    color: Colors.textBlack,
    width: Metrics.screenWidth * 0.72,
    flexWrap: "wrap"
  },
  textInput: {
    borderBottomWidth: 0.3,
    borderBottomColor: Colors.grey,
    width: Metrics.screenWidth * 0.72,
    height: getHeight(50),
    fontFamily: fonts.WorkSansBold,
    fontSize: FontSize.mediumlarge
  },
  modalStyle: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight * 0.54,
    position: "absolute",
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: Colors.blackOpacity,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 11,
      width: 0
    },
    shadowRadius: 8,
    elevation: 7
  },
  colorsView: {
    width: getWidth(50),
    height: getWidth(50),
    borderRadius: getWidth(25),
    backgroundColor: "green"
  },
  colorsListContiner: {
    flex: 1,
    top: getHeight(12),
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  colorItemStyle: {
    width: getWidth(50),
    height: getWidth(50),
    marginVertical: getHeight(12),
    marginRight: getHeight(10),
    borderRadius: getWidth(25)
  },
  colorModalView: {
    backgroundColor: "red",
    justifyContent: "space-between",
    flexDirection: "row"
  },
  buttonContainer: {
    flex: 1,
    //alignSelf:"flex-end",
    marginVertical: getHeight(30),
    justifyContent: "flex-end"
  },
  buttonStyle: {
    borderRadius: 25,
    height: getHeight(60),
    backgroundColor: Colors.royalBlue
  },
  buttonText: {
    fontSize: FontSize.base,
    color: Colors.white,
    fontFamily: fonts.WorkSansBold
  },
  penIcon: {
    width: 14,
    height:14
  }
});
export default styles;
