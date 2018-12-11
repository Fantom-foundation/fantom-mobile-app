import { Platform } from 'react-native';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '../../../../common/constants';

const isIOS = Platform.OS === 'ios';
const style = {
  container: {
    flex: 1,
  },
  innerContainerStyle: {
    paddingTop: 32,
    backgroundColor: 'rgb(14,14,18)',
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH,
    alignItems: 'center',
  },
  detailsContainer: {
    width: DEVICE_WIDTH - 32,
    marginBottom: 22,
  },
  detailsHeaderContainer: {
    backgroundColor: 'rgb(50,59,66)',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: 25,
    paddingVertical: 15,
  },
  innerDetailsContainer: {
    backgroundColor: 'rgb(44,52,58)',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: 25,
    paddingVertical: 20,
  },
  detailHeaderText: {
    fontFamily: 'SFProDisplay-Medium',
    color: '#FFFFFF',
    fontSize: 16,
  },
  detailsInnerText: {
    fontFamily: 'SFProDisplay-Medium',
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 6,
  },
  backgroundImageStyle: {
    width: DEVICE_WIDTH * 0.4,
    height: DEVICE_HEIGHT * 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    position: 'absolute',
    opacity: isIOS ? 0.03 : 0.02,
    right: -((DEVICE_WIDTH * 0.3) / 2),
  },
};

export default style;
