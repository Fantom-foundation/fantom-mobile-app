import { Dimensions, Platform } from 'react-native';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const style = {
  listContainerStyle: {
    position: 'absolute',
    backgroundColor: 'white',
    top: Platform.OS === 'ios' ? 193 : 200,
    right: 15,
    width: deviceWidth * 0.7,
    shadowColor: 'blue',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    zIndex: 2,
    elevation: 1,
  },

  altListContainerStyle: {
    backgroundColor: '#fff',
    marginLeft: deviceWidth * 0.27,
    position: 'absolute',
    top: 45,
    // top: deviceHeight * 0.061,
    width: deviceWidth * 0.7,
    shadowColor: 'blue',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    zIndex: 2,
    elevation: 1,
  },
  listStyle: {
    paddingLeft: deviceHeight * 0.03,
    paddingRight: deviceHeight * 0.03,
    paddingTop: deviceHeight * 0.02,
    paddingBottom: deviceHeight * 0.02,
    alignContent: 'center',
    // shadowColor: 'white',
    // shadowOffset: { width: 2, height: 2 }
  },
  listItemStyle: {
    flexDirection: 'row',
    // backgroundColor: 'rgb(232,236,243)',
    // backgroundColor: '#fff',
    // borderWidth: 2,
    // borderColor: 'white',
    // padding: 8
    padding: deviceHeight * 0.002,
  },
  listButtonStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  uncheckedButtonStyle: {
    // color: '#EEBD12',
    color: 'rgb(129,118,118)',
    fontSize: 28,
  },
  checkedButtonStyle: {
    color: '#EEBD12',
    fontSize: 28,
  },
};

export default style;
