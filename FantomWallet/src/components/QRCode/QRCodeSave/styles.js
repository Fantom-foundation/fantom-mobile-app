import { StyleSheet, Dimensions } from 'react-native';

export const DEVICE_WIDTH = Dimensions.get('window').width;
export const DEVICE_HEIGHT = Dimensions.get('window').height;

export default StyleSheet.create({
  loader: {
    height: 350,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  viewShot: {
    position: 'absolute',
    left: -(DEVICE_WIDTH * 5),
    top: -(DEVICE_HEIGHT * 5),
    backgroundColor: 'white',
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: 'rgb(50, 50, 50)',
    margin: 10,
  },
  textAmount: {
    margin: 10,
    marginTop: 0,
    fontSize: 16,
    fontWeight: 'bold',
    width: 230,
  },
});