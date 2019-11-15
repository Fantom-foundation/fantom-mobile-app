import { StyleSheet } from 'react-native';

import { DEVICE_HEIGHT, DEVICE_WIDTH } from '~/common/constants';

export default StyleSheet.create({
  scroll: {
    height: '100%',
  },
  scrollContent: {
    paddingBottom: 100,
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
});
