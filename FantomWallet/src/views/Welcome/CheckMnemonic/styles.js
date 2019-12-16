// // Library
// import { Platform, StyleSheet } from "react-native";
// // Component
// import { DEVICE_HEIGHT, DEVICE_WIDTH } from "~/common/constants";
// // To check device platform
// const isIOS = Platform.OS === "ios";
// // Styling
// export default StyleSheet.create({
//   mainContainerStyle: {
//     flex: 1,
//     backgroundColor: "#000"
//   },
//   progressContainer: {
//     marginTop: DEVICE_HEIGHT * 0.03
//   },
//   arrowContainer: {
//     marginTop: 8,
//     marginLeft: 8,
//     alignSelf: "flex-start"
//   },
//   backgroundImageStyle: {
//     width: DEVICE_WIDTH * 0.6,
//     height: DEVICE_HEIGHT * 0.77,
//     top: DEVICE_HEIGHT * 0.07,
//     position: "absolute",
//     opacity: isIOS ? 0.03 : 0.03,
//     right: -((DEVICE_WIDTH * 0.45) / 2)
//   },
//   headerContainer: {
//     alignItems: "center"
//   },
//   captchaText: {
//     fontSize: 24,
//     fontWeight: "bold",
//     fontFamily: "SFProDisplay-Medium",
//     color: "#fff"
//   },
//   subHeadContainer: {
//     marginTop: 20,
//     alignItems: "center",
//     width: DEVICE_WIDTH * 0.8
//   },
//   textContainer: {
//     marginTop: 24,
//     minHeight: 82,
//     width: DEVICE_WIDTH - 32,
//     alignSelf: "center",
//     borderWidth: 1,
//     borderColor: "#fff",
//     borderStyle: "dashed",
//     borderRadius: 10,
//     flexDirection: "row",
//     flexWrap: "wrap",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "rgb(27,29,33)",
//     paddingVertical: 15
//   },
//   wordWrap: {
//     width: DEVICE_WIDTH * 0.2,
//     height: DEVICE_HEIGHT * 0.05,
//     marginBottom: DEVICE_WIDTH * 0.03,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center"
//   },
//   messageContainer: {
//     marginTop: DEVICE_HEIGHT * 0.03,
//     alignItems: "center",
//     marginHorizontal: DEVICE_WIDTH * 0.1
//   },
//   backupPhrase: {
//     color: "#fff"
//   },
//   displayMnemonicView: {
//     marginTop: DEVICE_HEIGHT * 0.08,
//     alignItems: "center"
//   },
//   pleaseText: {
//     fontSize: DEVICE_WIDTH * 0.045,
//     fontFamily: "SFProDisplay-Thin",
//     paddingHorizontal: 0,
//     textAlign: "center",
//     fontWeight: "300",
//     color: "#fff"
//   },
//   orderTextStyle: {
//     marginTop: DEVICE_HEIGHT * 0.05,
//     color: "rgb(166,225,100)",
//     width: DEVICE_WIDTH * 0.5,
//     textAlign: "center",
//     fontSize: 16
//   },
//   mnemonicBtnMainView: {
//     width: DEVICE_WIDTH * 0.9,
//     marginTop: 16,
//     flexDirection: "row",
//     flexWrap: "wrap",
//     alignSelf: "center",
//     justifyContent: "center",
//     overflow: "hidden"
//   },
//   phraseText: {
//     fontSize: DEVICE_WIDTH * 0.045,
//     fontFamily: "SegoeUI-SemiBold"
//   },
//   textBoxContainer: {
//     marginTop: DEVICE_HEIGHT * 0.03
//   },
//   mid: {
//     height: isIOS ? DEVICE_HEIGHT : DEVICE_HEIGHT - 24,
//     alignItems: "center"
//   },
//   textBox: {
//     marginBottom: DEVICE_HEIGHT * 0.03
//   },
//   mnemonicBtn: {
//     alignItems: "center",
//     justifyContent: "center",
//     paddingHorizontal: 5,
//     height: 30,
//     backgroundColor: "rgb(0,177,251)",
//     borderRadius: 4,
//     overflow: "hidden"
//   },
//   mnemonicBtnContainer: {
//     margin: 10,
//     borderWidth: 1,
//     borderRadius: 4
//   },
//   mnemonicBtnText: { color: "#fff", fontWeight: "600", textAlign: "center" },
//   footerStyle: {
//     position: "absolute",
//     bottom: 0,
//     width: DEVICE_WIDTH
//   }
// });
import { StyleSheet } from "react-native";
import { getHeight, getWidth } from "../../../utils/pixelResolver";
import { Colors, FontSize, fonts } from "../../../theme";
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
    position: "absolute",
    top: getHeight(590)
  },
  checkBoxContainer: {
    flexDirection: "row"
  },
  textContainer: {
    marginTop: deviceHeight * 0.03,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center"
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
  }
});
