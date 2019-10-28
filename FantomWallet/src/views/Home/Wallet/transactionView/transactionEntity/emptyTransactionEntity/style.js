// Components
import { DEVICE_HEIGHT } from '~/common/constants';

const style = {
  mainViewStyle: {
    flex: 1,
    marginTop: 45,
    alignItems: 'center',
  },
  headingInfoStyle: {
    margin: 4,
    fontSize: 16,
    color: '#fff',
    fontFamily: 'SFProDisplay-Bold',
  },
  outerIconContainer: {
    height: DEVICE_HEIGHT * 0.14,
    width: DEVICE_HEIGHT * 0.14,
    backgroundColor: 'rgb(33,36,40)',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: (DEVICE_HEIGHT * 0.14) / 2,
    marginBottom: 10,
  },
  innerIconContainer: {
    backgroundColor: 'rgb(44,52,58)',
    height: DEVICE_HEIGHT * 0.12,
    width: DEVICE_HEIGHT * 0.12,
    borderRadius: (DEVICE_HEIGHT * 0.12) / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInfoStyle: {
    color: 'rgb(255,255,255)',
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 12,
  },
};

export default style;
