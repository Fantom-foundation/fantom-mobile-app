import { StyleSheet } from 'react-native'
import { DEVICE_HEIGHT } from '~/common/constants';

export default StyleSheet.create({
  mainContainerStyle: {
    flex: 1,
  },
  fantomViewStyle: {
    height: DEVICE_HEIGHT,
    backgroundColor: 'rgb(14,14,18)',
  },
})
