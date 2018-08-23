import { Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const style = {
   mainContainerStyle: {
       flex: 1,
       backgroundColor:'#fff'
   },
   progressContainer:{
       marginTop: deviceHeight * 0.05
   },
   arrowContainer:{
       marginTop: deviceHeight * 0.02,
       marginLeft: deviceHeight * 0.02,
   },
   headerContainer:{
       alignItems:'center'
   },
   captchaText:{
     fontSize: 24, fontWeight: 'bold',fontFamily:'SegoeUI' 
   },
   subHeadContainer:{
     marginTop: 20, alignItems: 'center' 
   },
   pleaseText:{
    fontSize: deviceWidth * 0.045, fontFamily:'SegoeUI-SemiBold'
   },
   phraseText:{
    fontSize: deviceWidth * 0.045,fontFamily:'SegoeUI-SemiBold'
   },
   textBoxContainer:{
    marginTop: deviceHeight * 0.03
   },
   mid : {
       padding: deviceHeight * 0.03
   },
   textBox:{
       marginBottom: deviceHeight * 0.03,
   },
   footerStyle: {
       position: 'absolute',
       bottom: 0,
       flexDirection: 'row',
   },
}

export default style;