// @flow
// Library
import React from 'react';
import { View } from 'react-native';
// Components
import styles from './styles';
import DepositViewInfo from '../depositViewInfo';

type Props = {
  renderToastNotification: () => void,
  navigation: any,
};

/**
 * DepositNavigationBar: This component is meant for handling deposit screen.
 */
const DepositNavigationBar = ({ navigation, renderToastNotification }: Props) => (
  <View style={styles.mainContainerStyle}>
    <DepositViewInfo renderToastNotification={renderToastNotification} navigation={navigation} />
  </View>
);

export default DepositNavigationBar;
