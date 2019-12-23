import { StyleSheet } from 'react-native';
import { Colors, fonts, FontSize } from '~/theme';
import { getHeight, getWidth } from '~/utils/pixelResolver';
import { DEVICE_WIDTH } from '~/common/constants';

export default StyleSheet.create({
  containerStyle: {
    flex: 1
  },
  safeAreaView: {
    flex: 1
  },
  backButton: {
    marginHorizontal: getWidth(24),
    marginTop: getHeight(20)
  },
  qrContainer: {
    // paddingTop: getHeight(43),
    // paddingBottom: getHeight(19),
    width: DEVICE_WIDTH - getWidth(44),
    marginHorizontal: getWidth(22),
    borderRadius: getHeight(19),
    marginVertical: getHeight(35),
    backgroundColor: Colors.white,
    padding:getWidth(43)
  },
  qrWrapper: {
    alignSelf: 'center',
    width: 250,
    height: 200,
    alignItems: 'center',
    justifyContent:'center'
  },
  textWrapper: { width: getWidth(230), alignSelf: 'center',marginTop:getHeight(13) },
  qrText: {
    fontFamily: fonts.WorkSansMedium,
    fontSize: FontSize.xSmall,
    color: Colors.textBlack,
    opacity: 0.5,
    marginTop: getHeight(13)
  },
  actionsView: {
    backgroundColor: Colors.white,
    flex: 1,
    borderTopLeftRadius: getHeight(22),
    borderTopRightRadius: getHeight(22)
  },
  actionsWrapper: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: getHeight(87)
  },
  actionItemWrapper: {
    width: getWidth(82),
    alignItems: 'center'
  },
  actionIconBackground: {
    backgroundColor: Colors.textBlack,
    height: getHeight(50),
    width: getHeight(50),
    borderRadius: getHeight(25),
    alignItems: 'center',
    justifyContent: 'center'
  },
  actionText: {
    fontFamily: fonts.WorkSansMedium,
    fontSize: FontSize.small,
    color: Colors.textBlack,
    textAlign: 'center',
    marginTop: getHeight(12)
  }
});
