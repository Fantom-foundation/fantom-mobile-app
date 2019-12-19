import { StyleSheet } from "react-native";
import { Colors, fonts, FontSize } from "~/theme";
import { getHeight, getWidth } from "~/utils/pixelResolver";
import { DEVICE_WIDTH } from "~/common/constants";

export default StyleSheet.create({
  containerStyle: { backgroundColor: Colors.white, flex: 1 },
  safeAreaView: { flex: 1},
  buttonContainer:{
    paddingHorizontal:getWidth(20),
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginTop: getHeight(40),
  },
  flashImage:{
    width:20,
    height:20,
    tintColor:Colors.white
  },
  middleView:{
    borderRadius:20,
  },
  cameraStyle:{
    marginTop: getHeight(20),
    marginHorizontal: getWidth(20),
    backgroundColor: Colors.white,
    width: getWidth(316),
    height: getHeight(316),
    borderRadius: 19,
    overflow:'hidden',
    alignSelf: 'center'
  },
  imageView:{
    marginTop:getHeight(20),
    paddingHorizontal:getWidth(22),
    flexDirection:'row',
    justifyContent:'flex-end'
  },
  qrImage:{
    width:100,
    height:50,
  },
  myCodeText:{
    marginTop:getHeight(13),
    fontFamily:fonts.WorkSansMedium,
    fontSize:FontSize.base
  }
});
