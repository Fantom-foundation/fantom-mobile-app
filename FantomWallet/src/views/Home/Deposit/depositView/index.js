// @flow
// Library
import React from 'react';
import { View } from 'react-native';
// Components
import styles from './styles';
import DepositViewInfo from '../DepositViewInfo';

/**
 * DepositNavigationBar: This component is meant for handling deposit screen.
 */
const DepositNavigationBar = () => (
  <View style={styles.mainContainerStyle}>
    <DepositViewInfo />
  </View>
);

export default DepositNavigationBar;
