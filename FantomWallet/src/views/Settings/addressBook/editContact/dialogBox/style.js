import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(242,242,242,0.9)',
    background: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subContainer: {
    position: 'absolute',
    backgroundColor: 'white',
    borderColor: '#f2f2f2',
    borderWidth: 1,
  },
  addressTextContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 48,
    paddingBottom: 48,
    paddingLeft: 24,
    paddingRight: 24,
  },
  confirmContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    height: 44,
  },
  confirmText: {
    color: 'white',
    fontSize: 24,
  },
});
