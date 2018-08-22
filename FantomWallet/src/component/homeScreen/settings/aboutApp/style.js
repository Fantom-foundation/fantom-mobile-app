
import { Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const style = {
    container: {
        backgroundColor: 'white', flex: 1
    },
    body:{
        padding: 20
    },
    bold:{
        fontWeight: 'bold'
    },
    margin20:{
        marginTop: 20
    }
    
}

export default style;