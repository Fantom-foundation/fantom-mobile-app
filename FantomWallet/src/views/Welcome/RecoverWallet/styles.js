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
 
  },
  textInput: {
    width: getWidth(270),
    paddingVertical: 4,
 },

  pasteButton: {
    marginLeft: 2,
    width: getWidth(60),
    alignItems: "center",
    height:24,
    justifyContent: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.blackOpacity,
    alignSelf:'center'
  },
  pasterText: {
    color: Colors.blackOpacity,
    fontSize: FontSize.small,
    fontFamily: fonts.WorkSansSemiBold,
   
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
    alignItems:'center',
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
