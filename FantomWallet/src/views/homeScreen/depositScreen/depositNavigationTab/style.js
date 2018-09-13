import { DEVICE_WIDTH } from '../../../../common/constants/index';

const style = {
  tabStyle: {
    flex: 1,
    height: 44,
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    borderBottomWidth: 3,
  },
  tabTextStyle: { fontSize: DEVICE_WIDTH < 320 ? 12 : 16 },
};
export default style;
