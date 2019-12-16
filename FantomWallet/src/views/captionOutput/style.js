import { Dimensions } from 'react-native';

import { StyleSheet } from "react-native";
import { getHeight, getWidth } from "../../utils/pixelResolver";
import { Colors, FontSize, fonts } from "../../theme";

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const style = {
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    progressContainer: {
        marginTop: deviceHeight * 0.03
    },
    arrowContainer: {
        marginTop: deviceHeight * 0.02,
        marginLeft: deviceHeight * 0.02,
    },
    mid: {
        padding: deviceHeight * 0.06,
        paddingTop: deviceHeight * 0.02,
        flex: 1
    },
    warningContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    secretText: {
        fontSize: deviceHeight * 0.03,
        fontWeight: 'bold',
        color: 'rgb(233,177,18)',
        fontFamily: 'Futura'
    },
    text: {
        fontSize: deviceWidth < 320 ? 12 : 14,
        fontFamily: 'Futura'
    },
    textContainer: {
        marginTop: deviceHeight * 0.03,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    wordWrap: {
        borderWidth: 1,
        borderColor: 'rgb(145,145,145)',
        width: deviceWidth * 0.25,
        height: deviceHeight * 0.05,
        marginLeft: deviceWidth * 0.01,
        marginBottom: deviceWidth * 0.03,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    messageContainer: {
        marginTop: deviceHeight * 0.03,
        alignItems: 'center'
    },
    clipBoardContainer: {
        backgroundColor: 'rgb(216,216,216)',
        alignItems: 'center',
        marginTop: deviceHeight * 0.04,
        padding: 5
    },
    clipBoardText: {
        fontSize: 20,
        fontFamily: 'Futura'
    },
    line: {
        backgroundColor: 'rgb(243,243,243)',
        marginTop: deviceWidth * 0.12,
        height: 2
    },
    lastMessageContainer: {
        marginTop: deviceWidth * 0.03,
        paddingBottom: 30,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    footerStyle: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
    },
}



export default StyleSheet.create({
  mainContainerStyle: {
    flex: 1,
    paddingHorizontal: getWidth(22),
    backgroundColor: Colors.white,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  flex1: {
    flex: 1,
    justifyContent: "center"
  },
  mainHeadingContainer: {
    // marginTop: getHeight(40)
  },
  mainHeading: {
    textAlign: "center",
    fontSize: FontSize.huge - 4,
    color: Colors.royalBlue,
    fontFamily: fonts.WorkSansBold
  },
  subHeadingContainer: {
    marginTop: getHeight(12),
    alignContent: "center"
  },
  subHeading: {
    textAlign: "center",
    lineHeight: getHeight(24),
    fontSize: FontSize.base,
    color: Colors.textBlack,
    fontFamily: fonts.WorkSansMedium
  },
  termsContainer: {
    borderColor: Colors.red,
    borderWidth: getWidth(4),
    borderRadius: 21,
    padding: getWidth(16)
  },
  wordText: {
    fontSize: FontSize.base,
    color: Colors.textBlack,
    //lineHeight: getHeight(24),
    fontFamily: fonts.WorkSansMedium
  },
  buttonText: {
    fontSize: FontSize.base,
    color: Colors.white,
    fontFamily: fonts.WorkSansBold
  },
  buttonStyle: {
    borderRadius: 25,
    height: getHeight(60),
    marginTop: getHeight(25),
    backgroundColor: Colors.royalBlue
  },
  checkBoxContainer: {
    flexDirection: "row"
  },
  textContainer: {
    marginTop: deviceHeight * 0.03,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  wordWrap: {
    width: deviceWidth * 0.25,
    height: deviceHeight * 0.05,
    marginLeft: deviceWidth * 0.01,
    marginBottom: deviceWidth * 0.03,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  indexStyle: {
    fontSize: FontSize.mediumlarge,
    color: Colors.royalBlue,
    fontFamily: fonts.WorkSansRegular,
    marginRight:4
  }
});
