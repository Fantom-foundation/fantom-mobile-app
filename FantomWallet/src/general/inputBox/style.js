import { Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const style = {
  textBox: {
    width: deviceWidth * 0.9,
    height: 44,
    borderWidth: 1,
    padding: 10,
    fontFamily: 'SegoeUI-SemiBold',
    borderColor: 'rgb(223,224,224)',
  },
  phraseNumber: {
    marginBottom: deviceHeight * 0.01,
    color: 'black',
  },
  error: {
    color: '#f7965e',
    alignSelf: 'flex-end',
    fontSize: 12,
    fontFamily: 'SegoeUI',
  },
};

export default style;
