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
    backgroundColor: "#416ed5"
  },
  cardHeaderText: {
    fontFamily: fonts.WorkSansSemiBold,
    fontSize: FontSize.base,
    color: Colors.white
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
    fontSize: FontSize.xLarge,
    color: Colors.white,
    textAlign: "right"
  },
  bottomCardSubText: {
    fontFamily: fonts.WorkSansSemiBold,
    fontSize: FontSize.small,
    color: Colors.white,
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
    position: "absolute",
    opacity: 0.8
  },
  cardIndicatorStyle: {
    width: getWidth(12),
    height: getHeight(140),
    position: "absolute",
    justifyContent: "center",
    borderWidth: 3
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
 backgroundColor: "#416ed5",
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
 fontFamily: fonts.WorkSansSemiBold,
    fontSize: FontSize.base,
    color: Colors.textBlack,
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

const stickyHeaderStyles = StyleSheet.create({
  stickyHeaderStyle: {
    height: getHeight(80),
    borderRadius: 12,
    overflow: "hidden",
 backgroundColor: "#416ed5",
    paddingHorizontal: getWidth(22),
    //marginHorizontal:getWidth(22),
    paddingVertical:getHeight(10)
  },
  stickyHeaderImageStyle: {
    height: getHeight(100),
    width: getWidth(80),
    top: 15,
   left: getWidth(20),
    position: "absolute",
    opacity:0.2
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
    paddingBottom:getHeight(50)
    // paddingHorizontal: getWidth(22)
  },
  headerContainer: {
    height: getHeight(70),
    marginTop: getHeight(40),
 
  },
  headerItems: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems:'center'
  },
  headerText: {
    fontFamily: fonts.WorkSansBold,
    fontSize: FontSize.huge - 4,
    color: Colors.textBlack
  },
  eyeIcon:{
    width: getWidth(21),
    height: getHeight(21),
    tintColor:Colors.textBlack
  },
  iconStyle: {
    top: getHeight(15),
    opacity:0.7
  },
  subHeading: {
    fontFamily: fonts.WorkSansSemiBold,
    fontSize: FontSize.mediumSmall,
    color: Colors.textBlack,
    opacity: 0.5
  },
  listHeader: {
    // marginVertical: getHeight(40),
    height: getHeight(44),
    flexDirection: "row",
    justifyContent: "space-between",
    //paddingHorizontal: getWidth(22),
   //marginHorizontal: getWidth(22)
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
  stickyHeaderContainer: {
    height: getHeight(220)
  },
  ...cardStyles,
  ...cardListItemStyles,
  ...listViewStyles,
  ...stickyHeaderStyles
});
