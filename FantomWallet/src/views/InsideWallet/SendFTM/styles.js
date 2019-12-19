import { StyleSheet } from "react-native";
import { Colors, fonts, FontSize } from "~/theme";
import { getHeight, getWidth } from "~/utils/pixelResolver";
import { DEVICE_WIDTH } from "~/common/constants";

export default StyleSheet.create({
  containerStyle: { backgroundColor: Colors.white, flex: 1 },
  safeAreaView: { flex: 1 },
  buttonsWrapper: {
    flex: 1,
    marginHorizontal: getWidth(22),
    marginTop: getHeight(21)
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: getHeight(27),
    marginBottom: getHeight(20)
  },
  sendPrice: {
    fontSize: getHeight(72),
    fontFamily: fonts.WorkSansBold,
    color: Colors.white,
    flexWrap: "wrap",
    width: getWidth(200),
    textAlign: "center",
    marginTop: getHeight(142),
    alignSelf: "center"
  },
  sendText: {
    color: Colors.royalBlue,
    fontFamily: fonts.WorkSansSemiBold,
    fontSize: FontSize.base
  },
  horizontalRow: {
    height: 2,
    width: DEVICE_WIDTH,
    backgroundColor: Colors.textBlack,
    alignSelf: "center",
    opacity: 0.3
  },
  toWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: getHeight(18)
  },
  flexDirectionRow: { flexDirection: "row" },
  toText: {
    color: Colors.royalBlue,
    fontFamily: fonts.WorkSansSemiBold,
    fontSize: FontSize.base
  },
  toId: {
    color: Colors.textBlack,
    fontFamily: fonts.WorkSansRegular,
    fontSize: FontSize.small,
    marginLeft: 5
  },
  buttonStyle: {
    height: null,
    paddingVertical: getHeight(4),
    paddingHorizontal: getWidth(12),
    width: null,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
    borderColor: Colors.textBlack,
    borderWidth: 1,
    borderRadius: getHeight(18),
    marginRight: getWidth(18)
  },
  textStyle: {
    color: Colors.textBlack,
    fontFamily: fonts.WorkSansSemiBold,
    fontSize: FontSize.mediumSmall
  },
  amountText: {
    fontFamily: fonts.MuliBold,
    fontSize: FontSize.massive * 2,
    color: Colors.textBlack,
    flex: 1,
    flexWrap: "wrap",

    textAlign: "center"
  },
  unit: {
    fontFamily: fonts.WorkSansSemiBold,
    fontSize: FontSize.base,
    alignSelf: "flex-end",
    paddingBottom: getHeight(20)
  },
  amount: {
    fontFamily: fonts.MuliBold,
    fontSize: FontSize.mediumSmall,
    alignSelf: "center",
    color: Colors.textBlack,
    opacity: 0.5,
    marginBottom: getHeight(66)
  },
  centerContent: {
    alignItems: "center",
    justifyContent: "space-between"
  },
  flex: {
    flex: 1
  },
  keypadButtonWrapper: {
    height: getHeight(54),
    width: getHeight(54),
    alignItems: "center",
    justifyContent: "center",
    marginTop: getHeight(17)
  },
  keypadItem: {
    fontFamily: fonts.WorkSansBold,
    fontSize: FontSize.large + 1,
    textAlign: "center",
    color: Colors.textBlack
  },
  modalStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
