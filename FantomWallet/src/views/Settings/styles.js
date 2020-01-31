import { StyleSheet, Platform } from "react-native";
import { DEVICE_HEIGHT, DEVICE_WIDTH, iPhoneXHeight } from "~/common/constants";
import { Colors } from "../../theme/colors";
import { FontSize } from "../../theme/fontSize";
import { fonts } from "../../theme/font";
import { getWidth, getHeight, Metrics } from "../../utils/pixelResolver";
const isPhoneX = DEVICE_HEIGHT >= iPhoneXHeight;
const isIOS = Platform.OS === "ios";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: getWidth(15)
  },
  mainContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    width: DEVICE_WIDTH * 0.88,
    paddingTop: 15,
    alignSelf: "center",
    justifyContent: "space-between"
  },
  scrollView: {
    flex: 1,
    // backgroundColor: 'red',
    marginBottom: isPhoneX ? 60 : 48
  },
  headerComponent: {
    backgroundColor: "rgb(44,52,58)",
    height: DEVICE_HEIGHT < 810 ? 84 : (106 / 812) * DEVICE_HEIGHT
  },
  headerComponentText: { fontFamily: "SFProDisplay-Semibold" },

  listContainer: {
    height: DEVICE_HEIGHT
  },

  addressBookContainer: {
    borderWidth: 1,
    borderColor: "rgb(200,200,200)",
    padding: 20,
    backgroundColor: "rgb(244,244,244)",
    marginTop: 30
  },
  addressBookText: {
    fontWeight: "bold",
    fontSize: 16
  },
  customerSupportContainer: {
    borderWidth: 1,
    borderColor: "rgb(200,200,200)",
    padding: 20,
    backgroundColor: "rgb(244,244,244)",
    marginTop: 30
  },
  customerSupportText: {
    fontWeight: "bold",
    fontSize: 16
  },
  aboutAppContainer: {
    borderWidth: 1,
    borderColor: "rgb(200,200,200)",
    padding: 20,
    backgroundColor: "rgb(244,244,244)",
    marginTop: 30
  },
  aboutAppText: {
    fontWeight: "bold",
    fontSize: 16
  },
  cardContainer: {
    width: DEVICE_WIDTH * 0.4,
    height: DEVICE_WIDTH * 0.4,
    backgroundColor: "rgba(255,255,255,0.05)",
    marginVertical: 14,
    justifyContent: "center",
    alignItems: "center"
  },
  outerCircularView: {
    height: DEVICE_WIDTH * 0.2,
    width: DEVICE_WIDTH * 0.2,
    borderRadius: (DEVICE_WIDTH * 0.2) / 2,
    backgroundColor: "rgb(29,33,38)",
    marginBottom: DEVICE_WIDTH * 0.03,
    alignItems: "center",
    justifyContent: "center"
  },
  innerCircularView: {
    height: DEVICE_WIDTH * 0.16,
    width: DEVICE_WIDTH * 0.16,
    borderRadius: (DEVICE_WIDTH * 0.16) / 2,
    backgroundColor: "rgb(44,52,58)",
    alignItems: "center",
    justifyContent: "center"
  },
  iconImageStyle: {
    height: DEVICE_WIDTH * 0.06,
    width: DEVICE_WIDTH * 0.06
  },
  optionTextStyle: {
    color: "#FFF",
    fontFamily: "SFProDisplay-Semibold",
    fontSize: 12
  },
  backgroundImageStyle: {
    width: DEVICE_WIDTH * 0.5,
    height: DEVICE_HEIGHT * 0.6,
    top: DEVICE_HEIGHT * 0.25,
    position: "absolute",
    opacity: isIOS ? 0.03 : 0.02,
    right: -((DEVICE_WIDTH * 0.45) / 2)
  },
  empty: { height: DEVICE_HEIGHT * 0.08 },
  mainView: {
    flex: 1
  },
  settingView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: getHeight(20),
    alignItems: "center"
  },
  settingText: {
    color: Colors.textBlack,
    fontSize: FontSize.large + 1,
    fontFamily: fonts.WorkSansBold,
    marginLeft: getWidth(33)
  },
  crossIcon: {
    width: 16,
    height: 16,
    tintColor: Colors.textBlack
  },
  mainContainer: {
    flex: 1
    // backgroundColor:'yellow',
  },
  rowsView: {
    flexDirection: "row",
    justifyContent: "space-between"
    // marginVertical: getHeight(21),
  },
  leftView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  languageView: {
    marginLeft: getWidth(-50)
  },
  textStyle: {
    fontFamily: fonts.WorkSansSemiBold,
    fontSize: FontSize.base,
    marginLeft: 18,
    width: getWidth(216),
    color: "#2b3954"
  },
  bottomView: {
    flexDirection: "row",
    flex: 1,
    width: getWidth(150),
    alignSelf: "center",
    justifyContent: "space-between",
    marginTop: getHeight(60),
    marginBottom: 10
  },
  imageStyle: {
    marginHorizontal: getWidth(10),
    width: 24,
    height: 20
  },
  iconStyle: {
    width: 20,
    height: 20
  }
});
