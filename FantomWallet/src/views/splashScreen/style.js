import { Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const style = {
  imageBackground: {
    width: deviceWidth,
    height: deviceHeight,
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default style;
