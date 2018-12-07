import { WHITE_COLOR, DEVICE_WIDTH, DEVICE_HEIGHT } from '../../../../common/constants';

const style = {
  mainContainerStyle: {
    height: DEVICE_HEIGHT,
    backgroundColor: WHITE_COLOR,
    justifyContent: 'flex-end',
  },
  tabInfoStyle: {
    flex: 1,
  },
  navigationTabStyle: {
    backgroundColor: 'white',
    width: DEVICE_WIDTH,
    flexDirection: 'row',
    height: 44,
    alignItems: 'center',
  },
};
export default style;
