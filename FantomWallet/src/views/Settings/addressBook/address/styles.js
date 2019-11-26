import { Dimensions, StyleSheet } from 'react-native';

const deviceWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {
    width: deviceWidth - 32,
    alignSelf: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    backgroundColor: 'rgb(32,37,42)',
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 1,
  },
  subContainer: {
    paddingLeft: 10,
  },
  subSubContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgb(32,37,42)',
  },
  leftContainerStyle: {
    alignSelf: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: 'row',
  },
  lineSeparatorStyle: {
    borderRightWidth: 1,
    borderRightColor: 'rgba(255,255,255,0.2)',
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  nameContainer: {
    fontSize: 14,
    fontFamily: 'SFProDisplay-Medium',
    color: '#FFF',
  },
  addressTextStyle: {
    fontSize: 12,
    fontFamily: 'SFProDisplay-Regular',
    color: '#FFF',
  },
  mark: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    height: 48,
    borderColor: 'rgb(140,165,190)',
    borderWidth: 2,
  },
  markText: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  mid: {
    flexDirection: 'column',
    flex: 3,
    justifyContent: 'center',
    marginLeft: 14,
  },
  iconsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'rgb(44,52,58)',
  },
  optionButtonStyle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
