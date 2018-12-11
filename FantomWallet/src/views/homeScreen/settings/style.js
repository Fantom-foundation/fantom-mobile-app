import { Platform } from 'react-native';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '../../../common/constants';

const isIOS = Platform.OS === 'ios';

const style = {
  container: {
    flex: 1,
    backgroundColor: 'rgb(14,14,18)',
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: DEVICE_WIDTH * 0.88,
    paddingTop: 15,
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  addressBookContainer: {
    borderWidth: 1,
    borderColor: 'rgb(200,200,200)',
    padding: 20,
    backgroundColor: 'rgb(244,244,244)',
    marginTop: 30,
  },
  addressBookText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  customerSupportContainer: {
    borderWidth: 1,
    borderColor: 'rgb(200,200,200)',
    padding: 20,
    backgroundColor: 'rgb(244,244,244)',
    marginTop: 30,
  },
  customerSupportText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  aboutAppContainer: {
    borderWidth: 1,
    borderColor: 'rgb(200,200,200)',
    padding: 20,
    backgroundColor: 'rgb(244,244,244)',
    marginTop: 30,
  },
  aboutAppText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  cardContainer: {
    width: DEVICE_WIDTH * 0.4,
    height: DEVICE_WIDTH * 0.4,
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outerCircularView: {
    height: DEVICE_WIDTH * 0.2,
    width: DEVICE_WIDTH * 0.2,
    borderRadius: (DEVICE_WIDTH * 0.2) / 2,
    backgroundColor: 'rgb(29,33,38)',
    marginBottom: DEVICE_WIDTH * 0.03,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircularView: {
    height: DEVICE_WIDTH * 0.16,
    width: DEVICE_WIDTH * 0.16,
    borderRadius: (DEVICE_WIDTH * 0.16) / 2,
    backgroundColor: 'rgb(44,52,58)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconImageStyle: {
    height: DEVICE_WIDTH * 0.06,
    width: DEVICE_WIDTH * 0.06,
  },
  optionTextStyle: {
    color: '#FFF',
    fontFamily: 'SFProDisplay-Semibold',
    fontSize: 12,
  },
  backgroundImageStyle: {
    width: DEVICE_WIDTH * 0.5,
    height: DEVICE_HEIGHT * 0.6,
    top: DEVICE_HEIGHT * 0.18,
    position: 'absolute',
    opacity: isIOS ? 0.03 : 0.02,
    right: -((DEVICE_WIDTH * 0.45) / 2),
  },
};

export default style;
