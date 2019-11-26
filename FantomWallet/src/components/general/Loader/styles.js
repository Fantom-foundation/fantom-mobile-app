import { StyleSheet, Dimensions } from 'react-native';

// Calculate  max height and width of device
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  overlayView: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 1.0,
    backgroundColor: 'rgba(100, 100, 100, 0)',
    width: deviceWidth,
    height: deviceHeight,
    zIndex: 12200,
  },
  activityIndicator: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
  },
});
