import { DEVICE_HEIGHT, DEVICE_WIDTH } from '~/common/constants';

const style = {
  fantomViewStyle: {
    height: DEVICE_HEIGHT,
  },
  amountDisplayStyle: {
    backgroundColor: '#fff',
    padding: 8,
    alignItems: 'flex-end',
    shadowOffset: { width: 0, height: 5 },
    shadowColor: 'rgb(246,243,250)',
    shadowOpacity: 1,
    elevation: 2,
  },
  buttonViewStyle: {
    marginLeft: 60,
    marginRight: 60,
    marginBottom: 20,
  },
  confirmButtonOuterContainer: {
    height: DEVICE_WIDTH * 0.2,
    width: DEVICE_WIDTH * 0.2,
    backgroundColor: 'rgb(29,33,38)',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: (DEVICE_WIDTH * 0.2) / 2,
    marginBottom: 10,
  },
  confirmButtonInnerContainer: {
    height: DEVICE_WIDTH * 0.16,
    width: DEVICE_WIDTH * 0.16,
    backgroundColor: 'rgb(44,52,58)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: (DEVICE_WIDTH * 0.16) / 2,
  },
  confirmTextStyle: {
    color: '#FFF',
    fontFamily: 'SFProDisplay-Semibold',
    fontSize: 16,
  },
  confirmContainer: {
    marginTop: DEVICE_HEIGHT * 0.03,
    alignItems: 'center',
  },
};
export default style;
