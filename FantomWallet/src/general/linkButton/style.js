import { Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const styles = {
    text: {
        marginLeft: deviceWidth * 0.2,
        textDecorationLine: 'underline',
        color: '#8064a2'
    },
}
export default styles;