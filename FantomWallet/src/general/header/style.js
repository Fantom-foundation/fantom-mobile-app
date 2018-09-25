import { Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;

const style = {
  headerStyle: {
    backgroundColor: '#000',
    // marginTop: 25,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  rightButtonStyle: {
    position: 'absolute',
    right: 5,
    padding: 8,
  },
  leftButtonStyle: {
    position: 'absolute',
    left: 5,
    padding: 8,
  },
  mainViewStyle: {
    width: deviceWidth,
    position: 'absolute',
    bottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftImageStyle: {
    width: 30,
    height: 20,
  },
  rightImageStyle: {
    width: 30,
    height: 20,
  },
  secondaryImageStyle: {
    width: 30,
    height: 20,
  },
  secondaryButtonStyle: {
    position: 'absolute',
    right: 5,
    padding: 38,
  },
  fantomIconStyle: {
    width: 100,
    height: 25,
    paddingRight: 30,
  },
  headerIconTextStyle: {
    flexDirection: 'row',
  },
};
export default style;
