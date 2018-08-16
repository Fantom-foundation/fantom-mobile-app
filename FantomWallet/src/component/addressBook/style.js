
import { Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const style = {
    mainContainerStyle: {
        flex: 1,
        backgroundColor:'white'
    },
    add: { flex: 1, alignItems: 'center', height: 40, justifyContent: 'center' },
    favorites: { flex: 1, alignItems: 'center', height: 40, justifyContent: 'center' }
    
}

export default style;