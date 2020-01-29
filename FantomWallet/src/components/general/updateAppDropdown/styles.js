import {StyleSheet } from 'react-native';
import { getHeight, getWidth } from "../../../utils/pixelResolver";
import { Colors, fonts, FontSize } from "../../../theme";


export default StyleSheet.create({
  wrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    height: getHeight(100),
    right: 0,
    backgroundColor: Colors.royalBlue,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: getWidth(10),
    elevation: 3,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    shadowColor: Colors.black,
    shadowOffset: {
      height: 0,
      width: 0
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5
  },
  updateView: {
    flexDirection: 'row', width: getWidth(320), flexWrap: 'wrap',
 
  },
  updateText: {
    color: Colors.white,
    fontFamily: fonts.MuliSemiBold,
    fontSize: FontSize.base,
},
  updateNow: {
    textDecorationLine: 'underline',
    color: Colors.white,
    fontFamily: fonts.MuliSemiBold,
    fontSize: FontSize.base,
    marginLeft:4

  },
  cancelButton: {
    backgroundColor: Colors.blackOpacity,

      }
});
