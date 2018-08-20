

import { Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const style = {
    textBox:{
        width:deviceWidth*0.9,height:44,borderWidth:1,
        padding:10
    },
    phraseNumber:{
        marginBottom: deviceHeight* 0.01,
        color:'black'
        
    },
    error:{
        color:'#f7965e',
        alignSelf:'flex-end',
        fontSize:12
    }
}

export default style;