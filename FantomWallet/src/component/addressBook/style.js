
import { Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const style = {
    mainContainerStyle: {
        flex: 1,
        backgroundColor:'white'
    },
    add: { flex: 1, alignItems: 'center', height: 40, justifyContent: 'center',backgroundColor:'rgb(232,232,232)' },
    favorites: { flex: 1, alignItems: 'center', height: 40, justifyContent: 'center',backgroundColor:'rgb(232,232,232)' },
    addressList:{
        flex: 1
    },
    subHeader:{
        flexDirection: 'row'
    },
    textInputContainer:{
        borderWidth: 1, borderColor: 'rgb(110,110,110)', padding: 15, marginTop: 15, flexDirection: 'row'
    },
    imageSize:{
        width: 20, height: 20
    },
    displaySearch:{
        paddingLeft: 10, paddingRight: 10
    }
}

export default style;