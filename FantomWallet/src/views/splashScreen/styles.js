import { StyleSheet, Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  imageBackground: {
    width: deviceWidth,
    height: deviceHeight,
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
