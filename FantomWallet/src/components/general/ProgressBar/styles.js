import { Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const style = {
  wrapper: {
    height: 7,
    width: deviceWidth,
    flexDirection: 'row',
    marginTop: deviceHeight * 0.01,
    borderWidth: 0.1,
  },
};

export default style;
