import { StyleSheet } from 'react-native'
import { DEVICE_WIDTH } from '~/common/constants';

export default StyleSheet.create({
  tabStyle: {
    flex: 1,
    height: 44,
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    borderBottomWidth: 3,
  },
  tabTextStyle: { fontSize: DEVICE_WIDTH < 320 ? 12 : 16 },
})