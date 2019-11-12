import { Dimensions, StyleSheet } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  wrapper: {
    height: 7,
    width: deviceWidth,
    flexDirection: 'row',
    marginTop: deviceHeight * 0.01,
    borderWidth: 0.1,
  },
});
