import { StyleSheet } from "react-native";
import { DEVICE_HEIGHT, DEVICE_WIDTH, iPhoneXHeight } from "~/common/constants";

const isPhoneX = DEVICE_HEIGHT >= iPhoneXHeight;

export default StyleSheet.create({
  mainContainerStyle: {
    flex: 1,
    backgroundColor: "black"
  },
  tabInfoStyle: {
    flex: 1,
    marginBottom: isPhoneX ? 78 : 64
  },
  navigationTabStyle: {
    position: "absolute",
    width: DEVICE_WIDTH,
    flexDirection: "row",
    bottom: 0,
    // shadowOffset: { width: 0, height: -5 },
    // shadowColor: "black",
    // shadowOpacity: 0.1,
    elevation: 12,
    alignItems: "center"
  }
});
