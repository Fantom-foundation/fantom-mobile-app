import { StyleSheet } from "react-native";
import { DEVICE_HEIGHT, iPhoneXHeight } from "~/common/constants";
import { Metrics } from "../../../utils/pixelResolver";
const isPhoneX = DEVICE_HEIGHT >= iPhoneXHeight;

export default StyleSheet.create({
  tabStyle: {
    flex: 1,
    height: isPhoneX ? 60 : 48,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Metrics.screenHeight >= 812 ? 25 : 0
  },
  tabIconStyle: {
    width: 20,
    height: 20
  }
});
