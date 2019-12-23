import { StyleSheet } from "react-native";
import { Metrics, getHeight, getWidth } from "../../../utils/pixelResolver";
import { Colors, fonts, FontSize } from "../../../theme";

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
    justifyContent: "space-between",
    paddingHorizontal: getWidth(12)
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
  ...stakingModal
});
