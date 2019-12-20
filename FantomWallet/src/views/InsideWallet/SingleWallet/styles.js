import { StyleSheet } from "react-native";
import { Colors, fonts, FontSize } from "~/theme";
import { getHeight, getWidth } from "~/utils/pixelResolver";
import { DEVICE_WIDTH } from "~/common/constants";

export default StyleSheet.create({
  containerStyle: { backgroundColor: Colors.white, flex: 1 },
  colorThemeBox: {
    height: getHeight(150),
    width: DEVICE_WIDTH,
    position: "absolute",
    top: 0
  },
  safeAreaView: { flex: 1 },
  safeAreaViewContainer: {
    paddingTop: getHeight(10),
    paddingBottom: getHeight(17),
    paddingHorizontal: getWidth(22)
  },
  walletTitle: {
    fontSize: FontSize.huge - 3,
    fontFamily: fonts.WorkSansBold
  },
  walletIDWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: getHeight(5)
  },
  walletID: {
    fontSize: FontSize.xSmall + 1,
    fontFamily: fonts.WorkSansRegular,
    opacity: 0.5
  },
  copyIcon: { marginRight: getWidth(21), opacity: 0.5 },
  activityContainer: { flex: 1, justifyContent: "flex-end" },
  activityWrapper: {
    backgroundColor: Colors.white,
    marginHorizontal: getWidth(10),
    shadowColor: Colors.black,
    shadowOffset: {
      height: 0,
      width: 0
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    borderRadius: getHeight(20),
    paddingVertical: getHeight(30),
    paddingHorizontal: getWidth(12),
    flex: 1,
    marginBottom: 10
  },
  lineOnEye: { marginRight: getWidth(18), alignSelf: "flex-end" },
  ftmText: {
    textAlign: "center",
    marginTop: getHeight(16),
    color: Colors.textBlack,
    fontFamily: fonts.WorkSansBold,
    fontSize: FontSize.huge - 4
  },
  amountText: {
    textAlign: "center",
    marginTop: getHeight(11),
    color: "rgb(140, 149, 162)",
    fontFamily: fonts.WorkSansMedium,
    fontSize: FontSize.base
  },
  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: getHeight(46)
  },
  buttonStyle: {
    width: getWidth(152),
    height: null,
    paddingVertical: getHeight(15),
    borderRadius: getHeight(30)
  },
  textStyle: {
    color: Colors.textBlack,
    fontFamily: fonts.WorkSansSemiBold,
    fontSize: FontSize.base + 2
  },
  activityListWrapper: {
    marginHorizontal: getWidth(18),
    marginTop: getHeight(46)
  },
  activityText: {
    color: "rgb(137, 145, 159)",
    fontFamily: fonts.WorkSansBold,
    fontSize: FontSize.small - 1
  },
  activityListView: {
    height: getHeight(310),
    paddingVertical: 25
  },
  emptyListWrapper: {
    marginTop: getHeight(14),
    alignItems: "center",
    flex: 1
  },
  emptyListText: {
    textAlign: "center",
    marginBottom: getHeight(60),
    fontFamily: fonts.WorkSansMedium,
    fontSize: FontSize.base,
    color: Colors.textBlack
  },
  listWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  dateText: {
    fontFamily: fonts.WorkSansMedium,
    fontSize: FontSize.small,
    color: Colors.textBlack
  },
  activityAmountText: {
    fontFamily: fonts.WorkSansBold,
    fontSize: FontSize.mediumSmall,
    color: Colors.textBlack
  },
  modalStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  modalBackground: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: Colors.whiteOpacity
  },
  modalShadow: {
    marginHorizontal: getWidth(22),
    shadowColor: Colors.black,
    shadowOffset: {
      height: 0,
      width: 0
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5
  },
  modalWrapper: {
    backgroundColor: Colors.white,
    borderRadius: getHeight(22),
    overflow: "hidden"
  },
  themeStripe: {
    height: getHeight(14)
  },
  detailsContainer: {
    marginHorizontal: getWidth(18),
    marginTop: getHeight(12)
  },
  modalText: {
    fontFamily: fonts.WorkSansSemiBold,
    fontSize: FontSize.base,
    color: Colors.textBlack,
    textAlign: "center",
    marginBottom: getHeight(10)
  },
  modalAmount: {
    fontFamily: fonts.WorkSansBold,
    fontSize: FontSize.xLarge,
    color: Colors.textBlack,
    textAlign: "center",
    marginBottom: getHeight(32)
  },
  modalTransaction: {
    fontFamily: fonts.WorkSansSemiBold,
    fontSize: FontSize.base,
    color: Colors.textBlack,
    opacity: 0.5,
    marginBottom: getHeight(6)
  },
  modalTransactionText: {
    fontFamily: fonts.WorkSansSemiBold,
    fontSize: FontSize.small,
    color: Colors.textBlack,
    marginBottom: getHeight(30)
  },
  shareIconWrapper: { marginBottom: getHeight(30), alignSelf: "center" },
  shareIcon: { alignSelf: "center" }
});
