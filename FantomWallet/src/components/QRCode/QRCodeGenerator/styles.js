import { StyleSheet, Dimensions } from 'react-native';

export const DEVICE_WIDTH = Dimensions.get('window').width;
export const DEVICE_HEIGHT = Dimensions.get('window').height;

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    borderRadius: 5,
    padding: 5,
  },

  addressTitleViewStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    width: DEVICE_WIDTH - 32,
    borderRadius: 4,
    marginBottom: 24,

    backgroundColor: 'rgb(44,52,58)',
  },
  addressTitleTextStyle: {
    color: '#FFF',
    fontFamily: 'SFProDisplay-Semibold',
    fontSize: 16,
  },
  addressShareIconStyle: {
    flex: 1,
    alignItems: 'flex-end',
  },
  addressShareImageIconStyle: {
    width: 45,
    height: 45,
  },
  loaderStyle: {
    height: 350,
    flexDirection: 'row',
    alignSelf: 'center',
  },
});
