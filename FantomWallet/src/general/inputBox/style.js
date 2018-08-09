

import { Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const style = {
    textBox:{
        width:deviceWidth*0.9,height:44,borderWidth:1
    },
    phraseNumber:{
        marginBottom: deviceHeight* 0.02,
        color:'#0270c0'
        
    }
}

export default style;