import { Dimensions } from "react-native";
import { getHeight } from "../../../utils/pixelResolver";
import { Colors } from "../../../theme/colors";
import { FontSize } from "../../../theme/fontSize";
import { fonts } from "../../../theme/font";
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const styles = {
  mainContainer: {
    padding: deviceHeight * 0.05,
    flex: 1,
    backgroundColor: Colors.royalBlue
  },
  imageBackground: {
    width: deviceWidth,
    height: deviceHeight,
    backgroundColor: Colors.black
  },
  headerContainer: {
    alignItems: "center",
    marginTop: getHeight(98)
  },
  fantomText: {
    fontSize: FontSize.massive + 9,
    fontFamily: fonts.MuliBold,
    color: Colors.white
  },
  fantomLogo: {
    width: 250,
    height: 200
  },
  subHeaderContainer: {
    marginTop: getHeight(84),
    alignItems: "center"
  },
  subHeaderText1: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: FontSize.huge,
    marginTop: deviceHeight * 0.05,
    fontFamily: "SegoeUI"
  },
  subHeaderText2: {
    marginTop: deviceHeight * 0.02,
    fontSize: FontSize.mediumlarge,
    fontWeight: "bold",
    color: "rgb(158,162,166)",
    fontFamily: "SegoeUI"
  },
  subHeaderText3: {
    fontSize: FontSize.mediumlarge,
    color: "rgb(158,162,166)",
    fontFamily: "SegoeUI",
    fontWeight: "bold"
  },
  walletSetup: {
    position: "absolute",
    // bottom: deviceHeight * 0.13,
    bottom: deviceHeight * 0.16,
    alignItems: "center",
    alignSelf: "center",
    marginTop: deviceHeight * 0.1,
    backgroundColor: Colors.white,
    width: deviceWidth * 0.8,
    alignSelf: "center",
    borderRadius: 25
  },
  walletSetupText: {
    fontSize: FontSize.mediumlarge,
    marginTop: deviceHeight * 0.02,
    marginBottom: deviceHeight * 0.02,
    fontFamily: fonts.WorkSansSemiBold,
    color: Colors.royalBlue
  },
  footer: {
    position: "absolute",
    bottom: deviceHeight * 0.05,
    flexDirection: "row",
    width: deviceWidth - 40,
    justifyContent: "space-between",
    alignSelf: "center"
  },
  footerText1: {
    // marginLeft: deviceWidth * 0.2,
    color: Colors.white,
    fontFamily: fonts.WorkSansBold,
    fontSize: FontSize.base
  },
  division: {
    width: 1,
    backgroundColor: Colors.white
  },
  footerText2: {
    color: Colors.white,
    fontWeight: "bold"
  },
  recoverWalletStyle: {
    alignItems: "center",
    position: "absolute",
    bottom: deviceHeight * 0.1,
    width: deviceWidth
  },
  recoverWalletTextStyle: {}
};
export default styles;
