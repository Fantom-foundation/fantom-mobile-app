// import { Platform, StyleSheet } from 'react-native';
// import { DEVICE_HEIGHT, DEVICE_WIDTH } from '~/common/constants';

// const isIOS = Platform.OS === 'ios';

// export default StyleSheet.create({
//   containerStyle: {
//     flex: 1,
//     backgroundColor: 'rgb(14,14,18)',
//   },
//   backgroundImageStyle: {
//     width: DEVICE_WIDTH * 0.6,
//     height: DEVICE_HEIGHT * 0.85,
//     opacity: isIOS ? 0.03 : 0.02,
//     top: DEVICE_HEIGHT * 0.1,
//     right: -((DEVICE_WIDTH * 0.48) / 2),
//     position: 'absolute',
//   },
//   mainViewStyle: {
//     width: DEVICE_WIDTH,
//     height: DEVICE_HEIGHT,
//   },
//   headerComponent: {
//     backgroundColor: 'rgb(44,52,58)',
//     height: DEVICE_HEIGHT < 810 ? 84 : (106 / 812) * DEVICE_HEIGHT,
//   },
//   headerComponentText: {
//     fontFamily: 'SFProDisplay-Semibold',
//   },
//   headerComponentIcon: {
//     // marginLeft: -10,
//   },

//   headingContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   headingTextStyle: {
//     color: '#FFF',
//     fontFamily: 'SFProDisplay-Medium',
//     fontSize: 24,
//   },
//   detailsContainerStyle: {
//     width: DEVICE_WIDTH - 32,
//     alignSelf: 'center',
//     marginTop: DEVICE_HEIGHT * 0.06,
//   },
//   containerHeadingText: {
//     color: '#FFF',
//     fontFamily: 'SFProDisplay-Regular',
//     fontSize: 16,
//     paddingLeft: 12,
//   },
//   textFieldStyle: {
//     height: 120,
//     padding: 8,
//     borderRadius: 6,
//     borderWidth: 0.7,
//     borderStyle: 'dashed',
//     borderColor: '#fff',
//     backgroundColor: 'rgb(38,44,50)',
//     marginTop: DEVICE_HEIGHT * 0.02,
//   },
//   enteredTextStyle: {
//     fontSize: 12,
//     paddingLeft: 12,
//     color: '#fff',
//     fontFamily: 'SFProDisplay-Regular',
//     textAlignVertical: 'top',
//   },
//   instructionsContainer: {
//     width: DEVICE_WIDTH - 32,
//     alignSelf: 'center',
//     marginTop: DEVICE_HEIGHT * 0.05,
//     paddingHorizontal: DEVICE_HEIGHT * 0.03,
//   },
//   instructionTextStyle: {
//     fontFamily: 'SFProDisplay-Semibold',
//     color: 'rgb(246,246,246)',
//     textAlign: 'center',
//     fontSize: 14,
//   },
//   warningContainer: {
//     width: DEVICE_WIDTH - 32,
//     alignSelf: 'center',
//     marginTop: DEVICE_HEIGHT * 0.05,
//     paddingHorizontal: DEVICE_HEIGHT * 0.03,
//     backgroundColor: 'rgb(44,52,58)',
//     borderRadius: 6,
//     padding: 12,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   warningTextStyle: {
//     color: 'rgb(255,0,0)',
//     fontSize: 14,
//     fontFamily: 'SFProDisplay-Medium',
//   },
//   confirmButtonOuterContainer: {
//     height: DEVICE_WIDTH * 0.2,
//     width: DEVICE_WIDTH * 0.2,
//     backgroundColor: 'rgb(29,33,38)',
//     alignItems: 'center',
//     alignSelf: 'center',
//     justifyContent: 'center',
//     borderRadius: (DEVICE_WIDTH * 0.2) / 2,
//     marginBottom: 10,
//   },
//   confirmButtonInnerContainer: {
//     height: DEVICE_WIDTH * 0.16,
//     width: DEVICE_WIDTH * 0.16,
//     backgroundColor: 'rgb(44,52,58)',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: (DEVICE_WIDTH * 0.16) / 2,
//   },
//   confirmTextStyle: {
//     color: '#FFF',
//     fontFamily: 'SFProDisplay-Semibold',
//     fontSize: 16,
//   },
//   confirmContainer: {
//     marginTop: DEVICE_HEIGHT * 0.06,
//     alignItems: 'center',
//   },
//   backButtonStyle: {
//     paddingTop: 12,
//     paddingBottom: 12,
//     paddingLeft: 2,
//     width: 50,
//   },
//   textViewStyle: {
//     margin: 4,
//     borderWidth: 1,
//     borderColor: 'black',
//     backgroundColor: '#fff',
//   },
//   messageTextStyle: {
//     flex: 1,
//     height: 20,
//     padding: 8,
//   },
//   buttonViewStyle: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     alignContent: 'center',
//   },
//   errorTextStyle: {
//     paddingTop: 10,
//     paddingLeft: 12,
//     color: 'red',
//     fontSize: 12,
//     fontFamily: 'SFProDisplay-Regular',
//   },

//   empty: { height: 32 },
//   emptyRate: { height: DEVICE_HEIGHT * 0.08 },
// });

import { StyleSheet } from "react-native";
import { Metrics, getHeight, getWidth } from "../../../utils/pixelResolver";
import { Colors, fonts, FontSize } from "../../../theme";

const headerStyles = {
  headerView: {
    backgroundColor: Colors.royalBlue,
    height: getHeight(140) + Metrics.getStatusBarHeight(),
    width: Metrics.screenWidth,
    paddingVertical: 18,
    shadowColor: Colors.blackOpacity,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.4,
    shadowRadius: 0,
    elevation: 0
  },
  headingTitle: {
    textAlign: "center",
    fontSize: FontSize.base,
    color: Colors.white,
    fontFamily: fonts.WorkSansBold
  },
  headerStyle: {
    backgroundColor: Colors.transparent
  },
  buttonView: {
    flexDirection: "row",
    bottom: 0,
    height: 25,
    position: "absolute",
    width: "100%"
  },
  phraseAndPrivateButton: {
    width: "50%",
    alignItems: "center"
  },
  phraseAndPrivateButtonText: {
    fontSize: FontSize.mediumSmall,
    fontFamily: fonts.WorkSansSemiBold
  }
};

const error = {
  errorView: {
    position: "absolute",
    top: Metrics.getStatusBarHeight(),
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: Colors.whiteOpacity,

    paddingHorizontal: 22
  },
  errorModalView: {
    backgroundColor: Colors.white,
    paddingVertical: getHeight(35),
    borderRadius: 22,
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colors.red,
    marginTop: getHeight(270)
  },
  errorTextHeading: {
    fontSize: FontSize.base,
    color: Colors.blackOpacity,
    fontFamily: fonts.WorkSansSemiBold
  },
  backButton: {
    marginTop: getHeight(36),
    width: getWidth(130),
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.blackOpacity,
    alignItems: "center",
    justifyContent: "center"
  },
  backText: {
    fontSize: FontSize.base,
    color: Colors.blackOpacity,
    fontFamily: fonts.WorkSansSemiBold
  }
};

const phraseView = {
  phraseContainer: {
    flex: 1,
    paddingHorizontal: 22,
    marginTop: 10
  },
  phraseHeading: {
    color: Colors.greyHeading,
    fontSize: FontSize.small,
    fontFamily: fonts.WorkSansBold
  },
  inputView: {
    flexDirection: "row",
    borderBottomWidth: 2,
    marginTop: getHeight(84),
    borderBottomColor: Colors.blackOpacity,
    paddingBottom: 6
  },
  textInput: {
    width: getWidth(270)
  },

  pasteButton: {
    marginLeft: 2,
    width: getWidth(60),
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.blackOpacity
  },
  pasterText: {
    color: Colors.blackOpacity,
    fontSize: FontSize.small,
    fontFamily: fonts.WorkSansSemiBold
  },
  noteText: {
    marginTop: 6,
    fontSize: FontSize.small,
    fontFamily: fonts.WorkSansRegular,
    color: Colors.blackOpacity
  },
  buttonStyle: {
    borderRadius: 25,
    height: 50,
    marginTop: 20,
    backgroundColor: Colors.royalBlue
  },
  buttonText: {
    fontSize: FontSize.base,
    color: Colors.white,
    fontFamily: fonts.WorkSansBold
  }
};
const privateKeyStyles = {
  privateInputView: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: Colors.blackOpacity,
    paddingBottom: 6
  }
};

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  ...headerStyles,
  ...phraseView,
  ...privateKeyStyles,
  ...error
});
