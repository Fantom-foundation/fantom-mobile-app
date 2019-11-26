// @flow
import React from 'react';
import { View, Image } from 'react-native';
// Style
import styles from './styles';
// Component
import DepositViewInfo from './DepositViewInfo';
// Image
import BackgroundIcon from '~/images/BackgroundIcon.png';
/**
 * To Display DepositTab related tasks
 */
export default () => (
  <View style={styles.depositScreenStyle}>
    <Image style={styles.backgroundIconStyle} source={BackgroundIcon} resizeMode="contain" />
    <DepositViewInfo />
  </View>

);

