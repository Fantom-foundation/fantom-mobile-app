import { StyleSheet, Platform } from 'react-native';

const isAndroid = Platform.OS === 'android';
export default StyleSheet.create({
  depositScreenStyle: {
    flex: 1,
    backgroundColor: 'rgb(14,14,18)',
  },
  backgroundIconStyle: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '45%',
    height: '85%',
    top: 0,
    opacity: !isAndroid ? 0.03 : 0.02,
    right: '-15%',
  },
});
