import { Platform } from 'react-native'
const style = {
    headerStyle: {
        backgroundColor: '#000',
        height: (Platform.OS === 'ios') ? 64 : 44,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textStyle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    rightButtonStyle: {
        backgroundColor: 'black',
        position: 'absolute',
        right: 5,
        padding: 8,

    },
    leftButtonStyle: {
        backgroundColor: 'black',
        position: 'absolute',
        left: 5,
        padding: 8,
    }
}
export default style;