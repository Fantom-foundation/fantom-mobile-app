import { Platform, StyleSheet } from 'react-native';

const isIOS = Platform.OS === 'ios';

export default StyleSheet.create({
  walletScreenStyle: {
    flex: 1,
    backgroundColor: 'rgb(14,14,18)',
  },
  backgroundImgStyle: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '45%',
    height: '85%',
    top: 0,
    opacity: isIOS ? 0.03 : 0.02,
    right: '-15%',
  },
});
