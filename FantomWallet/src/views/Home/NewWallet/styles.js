import { StyleSheet } from "react-native";
import { getHeight, getWidth } from "../../../utils/pixelResolver";
import { Colors, FontSize, fonts } from "../../../theme";

const cardStyles = StyleSheet.create({
  cardStyle: {
    height: getHeight(200),
    overflow: "hidden",
    borderRadius: 22,
    padding: getWidth(20),
    marginHorizontal: getWidth(6),
    backgroundColor: Colors.royalBlue
  },

  cardHeaderText: {
    fontFamily: fonts.WorkSansSemiBold,
    fontSize: FontSize.base,
    color: Colors.white,
    marginTop: getHeight(2)
  },
  cardSecretText: {
    fontFamily: fonts.WorkSansMedium,
    fontSize: FontSize.xSmall,
    color: Colors.white,
    opacity: 0.5,
    marginVertical: getHeight(6)
  },
  bottomCardText: {
    fontFamily: fonts.WorkSansBold,
    fontSize: FontSize.base,
    color: Colors.white,
    alignSelf: "flex-end"
  },
  bottomCardSubText: {
    fontFamily: fonts.WorkSansSemiBold,
    fontSize: FontSize.small,
    color: Colors.white,
    alignSelf: "flex-end",
    opacity: 0.5,
    marginVertical: getHeight(2)
  },
  cardBottomTextContainer: {
    flex: 1,
    justifyContent: "flex-end"
  },
  cardImageStyle: {
    height: getHeight(120),
    width: getWidth(80),
    bottom: -20,
    left: getWidth(20),
    position: "absolute",
    opacity: 0.2
  },
  cardIndicatorStyle: {
    width: getWidth(12),
    height: getHeight(140),
    position: "absolute",
    justifyContent: "center",
    borderWidth: 3
  },
  gridIcon: {
    top: getHeight(6),
    justifyContent: "center",
    alignSelf: "center"
  }
});

const cardListItemStyles = StyleSheet.create({
  listItemContainer: {
    height: getHeight(70),
    marginVertical: getHeight(15),
    marginHorizontal: getWidth(2),
    borderRadius: getHeight(11),
    flex: 1,
    padding: getWidth(6),
    paddingHorizontal: getWidth(8),
    borderLeftWidth: getWidth(8),
    borderLeftColor: Colors.royalBlue,
    justifyContent: "center",
    shadowColor: Colors.blackOpacity,
    backgroundColor: Colors.white,
    shadowOffset: {
      width: 0,
      height: 7
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5
  },
  listItemTitle: {
    fontFamily: fonts.WorkSansSemiBold,
    fontSize: FontSize.base,
    color: Colors.textBlack,
    alignSelf: "flex-end",
    lineHeight: getHeight(24)
  },
  selfText: {
    fontFamily: fonts.WorkSansSemiBold,
    fontSize: FontSize.mediumSmall,
    color: Colors.blackOpacity
  },
  titleContainer: {
    justifyContent: "space-between",
    flexDirection: "row"
  },
  balanceText: {
    fontFamily: fonts.WorkSansMedium,
    fontSize: FontSize.small,
    color: Colors.textBlack,
    opacity: 0.5
  }
});

const stickyHeaderStyles = StyleSheet.create({
  stickyHeaderStyle: {
    height: getHeight(95),
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#416ed5",
    paddingHorizontal: getWidth(15),
    paddingVertical: getHeight(2)
  },
  stickyHeaderImageStyle: {
    height: getHeight(100),
    width: getWidth(80),
    top: getHeight(15),
    left: getWidth(20),
    position: "absolute",
    opacity: 0.2
  }
});

const listViewStyles = StyleSheet.create({
  listViewContainer: {
    height: getHeight(56),
    marginVertical: getHeight(4),
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
    paddingHorizontal: getWidth(14),
    alignItems: "center",
    backgroundColor: "#416ed5"
  },
  listTitleText: {
    fontFamily: fonts.WorkSansSemiBold,
    fontSize: FontSize.small,
    color: Colors.white
  },
  rightTextStyle: {
    fontFamily: fonts.WorkSansSemiBold,
    fontSize: FontSize.base,
    color: Colors.white,
    lineHeight: getHeight(24)
  }
});

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingBottom: getHeight(50)

    // paddingHorizontal: getWidth(22)
  },
  headerContainer: {
    height: getHeight(70),
    marginTop: getHeight(40)
  },
  headerItems: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  headerText: {
    fontFamily: fonts.WorkSansBold,
    fontSize: FontSize.huge - 4,
    color: Colors.textBlack
  },
  eyeIcon: {
    width: getWidth(25),
    height: getHeight(25),
    tintColor: Colors.textBlack
  },
  eyeOffIcon: {
    width: getWidth(25),
    height: getHeight(25),
    tintColor: Colors.textBlack
  },
  iconStyle: {
    top: getHeight(15),
    opacity: 0.7
  },
  subHeading: {
    fontFamily: fonts.WorkSansSemiBold,
    fontSize: FontSize.mediumSmall,
    color: Colors.textBlack,
    opacity: 0.5
  },
  listHeader: {
    height: getHeight(44),
    flexDirection: "row",
    justifyContent: "space-between"
  },
  listContainer: {
    // marginHorizontal: getWidth(22)
  },
  listScrollView: {
    // marginHorizontal: getWidth(22)
  },
  itemSeperatorStyle: {
    marginHorizontal: getWidth(10)
  },
  marginHorizontal: {
    marginHorizontal: getWidth(22)
  },
  stickyHeaderContainer: {
    height: getHeight(220)
  },
  modalStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  ...cardStyles,
  ...cardListItemStyles,
  ...listViewStyles,
  ...stickyHeaderStyles,
  safeAreaStyle: {
    flex: 1,
    backgroundColor: Colors.white
  }
});
