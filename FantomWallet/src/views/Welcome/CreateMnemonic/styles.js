// import { StyleSheet, Platform } from 'react-native';

// import { DEVICE_HEIGHT, DEVICE_WIDTH } from '~/common/constants';

// const isIOS = Platform.OS === 'ios';

// export default StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//     backgroundColor: '#111',
//   },
//   progressContainer: {
//     marginTop: DEVICE_HEIGHT * 0.03,
//   },
//   arrowContainer: {
//     marginTop: DEVICE_HEIGHT * 0.02,
//     marginLeft: DEVICE_HEIGHT * 0.02,
//   },
//   mid: {
//     paddingTop: DEVICE_HEIGHT * 0.02,
//     flex: 1,
//     // backgroundColor: 'red',
//   },
//   warningContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   secretText: {
//     fontSize: DEVICE_WIDTH <= 320 ? 16 : 20,
//     color: 'rgb(166,225,100)', // Green
//     fontFamily: 'SFProDisplay-Semibold',
//     marginTop: 10,
//   },
//   text: {
//     fontSize: DEVICE_WIDTH <= 320 ? 12 : 14,
//     fontFamily: 'SFProDisplay-Medium',
//     color: 'rgb(0,177,251)', // Blue
//   },
//   activityIndicatorContainerStyle: {
//     height: DEVICE_HEIGHT * 0.25,
//     flexDirection: 'row',
//     alignSelf: 'center',
//   },
//   textContainer: {
//     marginTop: DEVICE_HEIGHT * 0.05,
//     marginBottom: DEVICE_HEIGHT * 0.07,
//     width: DEVICE_WIDTH - 32,
//     alignSelf: 'center',
//     borderWidth: 1,
//     borderColor: '#fff',
//     borderStyle: 'dashed',
//     borderRadius: 10,
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'rgb(38,44,50)',
//     paddingVertical: 15,
//   },
//   wordWrap: {
//     width: DEVICE_WIDTH * 0.2,
//     height: DEVICE_HEIGHT * 0.05,
//     marginBottom: DEVICE_WIDTH * 0.03,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   infoContainer: {
//     marginBottom: DEVICE_HEIGHT * 0.05,
//     alignItems: 'center',
//   },
//   messageContainer: {
//     marginTop: DEVICE_HEIGHT * 0.03,
//     alignItems: 'center',
//     marginHorizontal: DEVICE_WIDTH * 0.1,
//   },
//   instructionTextStyle: {
//     fontSize: DEVICE_WIDTH * 0.037,
//     fontFamily: 'SFProDisplay-Thin',
//     color: '#FFF',
//   },
//   clipBoardContainer: {
//     marginTop: DEVICE_HEIGHT * 0.04,
//     height: DEVICE_WIDTH * 0.25,
//     width: DEVICE_WIDTH * 0.25,
//     backgroundColor: 'rgb(33,36,40)',
//     alignItems: 'center',
//     alignSelf: 'center',
//     justifyContent: 'center',
//     borderRadius: (DEVICE_WIDTH * 0.25) / 2,
//     marginBottom: 10,
//   },
//   copyIconContainerStyle: {
//     height: DEVICE_WIDTH * 0.2,
//     width: DEVICE_WIDTH * 0.2,
//     backgroundColor: 'rgb(44,52,58)',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: (DEVICE_WIDTH * 0.2) / 2,
//   },
//   clipBoardText: {
//     fontSize: DEVICE_WIDTH <= 320 ? 12 : 14,
//     fontFamily: 'SFProDisplay-Regular',
//     color: '#fff',
//   },
//   line: {
//     backgroundColor: 'rgb(243,243,243)',
//     marginTop: DEVICE_HEIGHT * 0.05,
//     height: 2,
//   },
//   lastMessageContainer: {
//     width: DEVICE_WIDTH - 32,
//     alignSelf: 'center',
//     // backgroundColor: 'rgb(31,38,53)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 10,
//     paddingVertical: 15,
//   },
//   warningTextStyle: {
//     fontSize: DEVICE_WIDTH <= 320 ? 12 : 14,
//     fontFamily: 'SFProDisplay-Light',
//     color: '#fff',
//   },
//   backgroundImage: {
//     width: DEVICE_WIDTH * 0.6,
//     height: DEVICE_HEIGHT * 0.77,
//     top: DEVICE_HEIGHT * 0.07,
//     opacity: isIOS ? 0.03 : 0.02,
//     right: -((DEVICE_WIDTH * 0.45) / 2),
//     position: 'absolute',
//   },
//   footerStyle: {
//     position: 'absolute',
//     bottom: 0,
//     width: DEVICE_WIDTH,
//   },
//   empty: { height: DEVICE_HEIGHT * 0.15 },
// });
import { Dimensions } from "react-native";

import { StyleSheet } from "react-native";
import { getHeight, getWidth } from "../../../utils/pixelResolver";
import { Colors, FontSize, fonts } from "../../../theme";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const style = {
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff"
  },
  progressContainer: {
    marginTop: deviceHeight * 0.03
  },
  arrowContainer: {
    marginTop: deviceHeight * 0.02,
    marginLeft: deviceHeight * 0.02
  },
  mid: {
    padding: deviceHeight * 0.06,
    paddingTop: deviceHeight * 0.02,
    flex: 1
  },
  warningContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  secretText: {
    fontSize: deviceHeight * 0.03,
    fontWeight: "bold",
    color: "rgb(233,177,18)",
    fontFamily: "Futura"
  },
  text: {
    fontSize: deviceWidth < 320 ? 12 : 14,
    fontFamily: "Futura"
  },
  textContainer: {
    marginTop: deviceHeight * 0.03,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  wordWrap: {
    borderWidth: 1,
    borderColor: "rgb(145,145,145)",
    width: deviceWidth * 0.25,
    height: deviceHeight * 0.05,
    marginLeft: deviceWidth * 0.01,
    marginBottom: deviceWidth * 0.03,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  messageContainer: {
    marginTop: deviceHeight * 0.03,
    alignItems: "center"
  },
  clipBoardContainer: {
    backgroundColor: "rgb(216,216,216)",
    alignItems: "center",
    marginTop: deviceHeight * 0.04,
    padding: 5
  },
  clipBoardText: {
    fontSize: 20,
    fontFamily: "Futura"
  },
  line: {
    backgroundColor: "rgb(243,243,243)",
    marginTop: deviceWidth * 0.12,
    height: 2
  },
  lastMessageContainer: {
    marginTop: deviceWidth * 0.03,
    paddingBottom: 30,
    flexDirection: "row",
    justifyContent: "center"
  },
  footerStyle: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row"
  }
};

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
  wordText: {
    fontSize: FontSize.base,
    color: Colors.textBlack,
    lineHeight: getHeight(24),
    fontFamily: fonts.WorkSansMedium
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
    backgroundColor: Colors.royalBlue
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  indexStyle: {
    fontSize: FontSize.mediumlarge,
    color: Colors.royalBlue,
    fontFamily: fonts.WorkSansRegular,
    marginRight: 4
  }
});
