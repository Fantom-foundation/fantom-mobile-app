import { DEVICE_WIDTH, DEVICE_HEIGHT } from '~/common/constants/index';

const style = {
  containerViewStyle: {
    flex: 1,
    marginBottom: DEVICE_HEIGHT * 0.02,
  },
  qrGeneratorstyle: {
    marginTop: 12,
    padding: 16,
    marginBottom: DEVICE_HEIGHT * 0.02,
  },
  // Link style
  qrLinkViewStyle: {
    width: DEVICE_WIDTH - 32,
    padding: 12,
    backgroundColor: 'rgb(32, 37, 42)',
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  qrLinkTextStyle: {
    textAlign: 'center',
    fontFamily: 'SFProDisplay-Semibold',
    color: '#fff',
    fontSize: 14,
    paddingLeft: 5,
  },
};
export default style;
