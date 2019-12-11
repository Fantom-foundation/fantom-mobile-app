import { StyleSheet } from "react-native";
import { getHeight, getWidth } from "../../../utils/pixelResolver";
import { Colors, FontSize, fonts } from "../../../theme";

const cardStyles = StyleSheet.create({
  cardStyle: {
    height: getHeight(200),
    overflow: "hidden",
    borderRadius: 22,
    backgroundColor: Colors.orange,
   padding: getWidth(20)
  },
  cardHeaderText: {
    fontFamily: fonts.WorkSansSemiBold,
    fontSize: FontSize.base,
    color: Colors.textBlack
  },
  cardSecretText: {
    fontFamily: fonts.WorkSansMedium,
    fontSize: FontSize.xSmall,
    color: Colors.textBlack,
    opacity: 0.5,
    marginVertical: getHeight(6)
  },
  bottomCardText: {
    fontFamily: fonts.WorkSansBold,
    fontSize: FontSize.xLarge,
    color: Colors.textBlack,
    textAlign: "right"
  },
  bottomCardSubText: {
    fontFamily: fonts.WorkSansSemiBold,
    fontSize: FontSize.small,
    color: Colors.textBlack,
    textAlign: "right",
    opacity: 0.5
  },
  cardBottomTextContainer: {
    flex: 1,
    justifyContent: "flex-end"
  },
  cardImageStyle: {
    height: getHeight(100),
    width: getWidth(80),
    bottom: -10,
    left: getWidth(20),
    position: "absolute"
  }
});

const cardListItemStyles = StyleSheet.create({
  listItemContainer: {
    height: getHeight(70),
    marginVertical: getHeight(12),
    marginHorizontal: getWidth(2),
    borderRadius: getHeight(11),
    flex: 1,
    padding: getWidth(6),
    paddingHorizontal: getWidth(8),
    borderLeftWidth: getWidth(8),
    borderLeftColor: Colors.orange,
    justifyContent: "space-between",
    shadowColor: Colors.blackOpacity,
    backgroundColor: Colors.white,
    //borderWidth:0.3,
    shadowOffset: {
      width: 0,
      height: 7
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5
  },

  listItemTitle: {
    ...cardStyles.cardHeaderText,
    lineHeight: getHeight(24)
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

export default StyleSheet.create({
  mainContainer: {
    flex: 1
    // paddingHorizontal: getWidth(22)
  },
  headerContainer: {
    height: getHeight(70),
    marginTop: getHeight(40),
    paddingHorizontal: getWidth(22)
  },
  headerItems: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  headerText: {
    fontFamily: fonts.WorkSansBold,
    fontSize: FontSize.huge - 4,
    color: Colors.textBlack
  },
  iconStyle: {
    top: getHeight(15)
  },
  subHeading: {
    fontFamily: fonts.WorkSansSemiBold,
    fontSize: FontSize.mediumSmall,
    color: Colors.textBlack,
    opacity: 0.5
  },
  listHeader: {
    marginVertical: getHeight(40),
    height: getHeight(44),
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: getWidth(22)
  },
  listContainer: {
    marginHorizontal: getWidth(22)
  },
  listScrollView: {
    //flex: 1,

    width: getWidth(330)
  },
  itemSeperatorStyle: {
    marginHorizontal: getWidth(10)
    // marginVertical: getHeight(30),
    // height: getHeight(140),
    // overflow: "hidden",
    // borderBottomLeftRadius: 22,
    // borderTopStartRadius: 22,
    // marginRight: -getWidth(12),
    // marginLeft: getWidth(12),
    // //  backgroundColor: Colors.orange,
    // borderLeftWidth: getWidth(24),
    // borderLeftColor: "red"
  },
  ...cardStyles,
  ...cardListItemStyles
});
