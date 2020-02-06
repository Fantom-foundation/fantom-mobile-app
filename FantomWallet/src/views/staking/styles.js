import { StyleSheet, Dimensions, Platform } from "react-native";
import { Metrics, getHeight, getWidth } from "../../utils/pixelResolver";
import { Colors, fonts, FontSize } from "../../theme";

const deviceHeight = Dimensions.get("window").height;

const crauselStyle = {
  crauselView: {
    marginTop: getHeight(30)
  },
  contentContainerStyle: {
    paddingHorizontal: getWidth(25)
  },

  walletView: {
    marginHorizontal: Platform.OS === "android" ? getWidth(10) : 0,
    paddingTop: getHeight(22),
    paddingBottom: getHeight(51),
    borderRadius: getWidth(22),
    width: getWidth(260),

    height: Metrics.screenHeight <= 600 ? getHeight(580) : getHeight(540),
    backgroundColor: Colors.royalBlue,
    shadowColor: Colors.black,
    shadowOffset: {
      height: 0,
      width: 0
    },
    shadowOpacity: 0.3,
    shadowRadius: 5
    //  elevation: 1
  },
  titleView: {
    fontSize: FontSize.base,
    fontFamily: fonts.WorkSansSemiBold,
    paddingHorizontal: getWidth(22),
    color: Colors.white
  },
  amountStyle: {
    textAlign: "right",
    marginTop: getHeight(30),
    width: getWidth(216),

    alignSelf: "flex-end",
    fontFamily: fonts.WorkSansBold,
    fontSize: FontSize.large + 1,
    color: Colors.white
  },
  stakingCard: {
    paddingHorizontal: 22
  },
  walletTextStyle: {
    textAlign: "right",
    marginTop: 4,
    width: getWidth(150),
    alignSelf: "flex-end",
    fontFamily: fonts.WorkSansSemiBold,
    fontSize: FontSize.small,
    color: Colors.white
  },
  bottomTextStyle: {
    // textAlign: "right",
    marginTop: 4,
    // width: getWidth(150),
    alignSelf: "flex-end",
    fontFamily: fonts.WorkSansSemiBold,
    fontSize: FontSize.small,
    color: Colors.white
  },
  buttonUnstakeView: {
    width: getWidth(121),
    height: getHeight(50),
    //backgroundColor: Colors.white,
    backgroundColor: "rgb(248,248,248)",
    borderBottomRightRadius: getHeight(25),
    borderTopRightRadius: getHeight(25),
    marginRight: -2,
    alignItems: "center",
    alignSelf: "flex-start",
    justifyContent: "center"
  },
  buttonStakeView: {
    width: getWidth(121),
    height: getHeight(50),
    backgroundColor: "rgb(248,248,248)",
    //backgroundColor: Colors.white,
    borderBottomLeftRadius: getHeight(25),
    borderTopLeftRadius: getHeight(25),
    //right: -1,
    borderColor: "white",
    alignItems: "center",
    alignSelf: "flex-end",
    justifyContent: "center"
  },
  withdraw: {
    right: getWidth(-23),
    marginTop: getHeight(40)
  },
  buttonView: {
    marginTop: getHeight(31),
    flexDirection: "row",
    justifyContent: "space-between"
  },
  buttonText: {
    fontSize: FontSize.mediumlarge,
    fontFamily: fonts.WorkSansSemiBold,
    color: Colors.royalBlue
  }
};

const headingStyles = {
  stakingTextView: {
    marginHorizontal: getWidth(22),
    flexDirection: "row",
    marginTop: getHeight(63),
    justifyContent: "space-between",
    alignItems: "center"
  },
  stakingText: {
    fontSize: getHeight(FontSize.xLarge + 4),
    fontFamily: fonts.WorkSansBold,
    color: Colors.blackOpacity
  },
  imagestyle: {
    width: 20,
    height: 20,
    borderRadius: 10
  }
};

const stakingModal = {
  stakingModalView: {
    paddingVertical: getHeight(32),

    zIndex: 100,
    borderRadius: getWidth(22),
    width: getWidth(300),
    backgroundColor: Colors.white,
    position: "absolute",
    top: getHeight(260),
    alignSelf: "center",
    shadowColor: Colors.black,
    shadowOffset: {
      height: 0,
      width: 0
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5
  },
  backgroundView: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    backgroundColor: "rgba(255 ,255 ,255 ,0.5)"
  },
  modalTextStyle: {
    textAlign: "center",
    fontFamily: fonts.WorkSansSemiBold,
    fontSize: FontSize.base,
    color: Colors.blackOpacity,
    marginHorizontal: getWidth(20)
  },
  backButtonStyle: {
    width: getWidth(132),
    height: getHeight(50),
    borderRadius: getHeight(25),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: Colors.blackOpacity
  },
  notEnoughSpaceButtonView: {
    marginTop: getHeight(40),
    alignSelf: "center"
  },
  backButton: {
    fontSize: FontSize.base,
    fontFamily: fonts.WorkSansSemiBold,
    color: Colors.blackOpacity
  },
  unstakeView: {
    marginTop: getHeight(80),
    flexDirection: "row",
    paddingHorizontal: getWidth(10),
    justifyContent: "space-between"
  },
  unstakeOuterView: {
    borderWidth: 2,
    borderColor: Colors.red
  },
  unstakeButton: {
    width: getWidth(132),
    height: getHeight(50),
    borderRadius: getHeight(25),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.red,
    borderWidth: 0
  },
  unStakeText: {
    fontSize: FontSize.base,
    fontFamily: fonts.WorkSansSemiBold,
    color: Colors.white
  }
};

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  ...headingStyles,
  ...crauselStyle,
  ...stakingModal
});
