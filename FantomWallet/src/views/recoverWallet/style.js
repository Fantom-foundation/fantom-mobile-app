// const style= {
//     containerStyle:{ flex: 1, backgroundColor: 'white' },
//     mainViewStyle:{ flex: 1, marginTop: 24, },
//     backButtonStyle:{
//         paddingTop: 12,
//         paddingBottom: 12,
//         paddingLeft: 2,
//         width: 50,
//     },
//     textViewStyle: {
//         margin: 4,
//         borderWidth: 1,
//         borderColor: 'black'
//     },
//     textFieldStyle:{ height: 100, padding: 8, },
//     messageTextStyle:{ flex: 1, height: 20, padding: 8 },
//     buttonViewStyle:{
//         flex: 1,
//         justifyContent: 'flex-end',
//         alignContent: 'center'
//     },
//     errorTextStyle: { color: 'red' }
// }
// export default style;

import { StyleSheet } from "react-native";
import { Metrics, getHeight, getWidth } from "../../utils/pixelResolver";
import { Colors, fonts, FontSize } from "../../theme";

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
  ...privateKeyStyles
});
