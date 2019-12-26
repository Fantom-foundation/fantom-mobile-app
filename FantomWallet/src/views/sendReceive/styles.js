import { StyleSheet } from "react-native";
import { Metrics, getHeight, getWidth } from "../../utils/pixelResolver";
import { Colors, fonts, FontSize } from "../../theme";
import { DEVICE_HEIGHT, iPhoneXHeight } from "../../common/constants";
const isPhoneX = DEVICE_HEIGHT >= iPhoneXHeight;

const qrCode = {
  qrCodeButton: {
    position: "absolute",
    left: 20,
    top: getHeight(40)
  },
  qrImage: {
    width: getHeight(30),
    height: getHeight(30),
    tintColor: Colors.white
  }
};
const priceText = {
  sendPrice: {
    fontFamily: fonts.WorkSansBold,
    color: Colors.white,
    flexWrap: "wrap",
    width: getWidth(200),
    textAlign: "center",
    marginTop: getHeight(142),
    alignSelf: "center"
  },
  sendPriceExample: {
    fontSize: FontSize.mediumSmall,
    fontFamily: fonts.WorkSansBold,
    color: Colors.lightBlue,
    textAlign: "center",
    marginTop: 4
  },
  walletButton: {
    position: "absolute",
    top: getHeight(228),
    right: getWidth(22)
  },
  walletText: {
    fontFamily: fonts.WorkSansSemiBold,
    fontSize: FontSize.base,
    color: Colors.white,
    textAlign: "right"
  },
  walletAmountText: {
    fontSize: FontSize.mediumSmall,
    fontFamily: fonts.WorkSansBold,
    color: Colors.lightBlue,
    textAlign: "right",
    marginTop: 15,
    flexWrap: "wrap",
    width: getWidth(150)
  }
};
const keyPadStyle = {
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
};

const modalStyles = {
  modalView: {
    // position: "absolute",
    // bottom: 0,
    zIndex: 100,
    backgroundColor: Colors.white,
    width: Metrics.screenWidth,
    //flex: 1,
    height: Metrics.screenHeight,
    //bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
    // paddingTop: getHeight(400)
  },
  crossSendView: {
    paddingVertical: getHeight(14),
    width: Metrics.screenWidth,
    paddingHorizontal: getWidth(22),
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderGrey
  },
  sendText: {
    fontSize: FontSize.base,
    fontFamily: fonts.WorkSansSemiBold
  },
  modalTextStyle: {
    textAlign: "center",
    flexWrap: "wrap",
    fontFamily: fonts.WorkSansSemiBold,
    fontSize: FontSize.base,
    color: Colors.blackOpacity,
    marginHorizontal: getWidth(20)
  },
  sendTextStyle: {
    color: Colors.white
  },
  sendButton: {
    backgroundColor: Colors.royalBlue,
    borderWidth: 0
  },
  sendButtonView: {
    marginTop: getHeight(80),
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: getWidth(12)
  },
  toView: {
    // justifyContent: "space-between",
    height: getHeight(60),
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderGrey,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: getWidth(22)
  },
  toText: {
    fontSize: FontSize.base,
    fontFamily: fonts.WorkSansSemiBold,
    color: Colors.royalBlue
  },
  sendTo: {
    flex: 1,
    // width: getWidth(175),
    marginLeft: 3,
    flexWrap: "wrap",
    fontSize: FontSize.base,
    fontFamily: fonts.WorkSansRegular,
    marginTop: -5
  },
  pasteButton: {
    width: getWidth(60),
    height: getHeight(30),
    borderRadius: getHeight(15),
    alignItems: "center",
    justifyContent: "center",
    marginLeft: getWidth(5),
    borderWidth: 1,
    borderColor: Colors.blackOpacity
  },
  pasteText: {
    color: Colors.blackOpacity,
    fontSize: FontSize.mediumSmall,
    fontFamily: fonts.WorkSansSemiBold
  },
  memoTextInput: {
    flex: 1,
    marginLeft: 3,
    fontSize: FontSize.base,
    fontFamily: fonts.WorkSansRegular
  },
  qrSendImage: {
    width: getHeight(30),
    height: getHeight(30)
  },
  qrButton: {
    marginLeft: getWidth(18)
  }
};
const SendReceiveButton = {
  sendReceiveView: {
    flexDirection: "row",
    marginHorizontal: getWidth(21),
    justifyContent: "space-between",
    marginTop: getHeight(33)
  },
  buttonStyle: {
    width: getWidth(152),
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    backgroundColor: Colors.lightBlue
  },
  buttonText: {
    fontSize: FontSize.mediumlarge,
    color: Colors.white,
    fontFamily: fonts.WorkSansSemiBold
  }
};

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.royalBlue
  },
  keyBoardAvoidingView: {
    height: getHeight(750)
  },

  safeAreaView: {
    flex: 1,
    backgroundColor: Colors.transparent,
    paddingBottom: isPhoneX ? 60 : 48
  },
  ...priceText,
  ...keyPadStyle,
  ...SendReceiveButton,
  ...qrCode,
  ...modalStyles
});
