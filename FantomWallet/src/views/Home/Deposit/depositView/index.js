// @flow
// Library
import React from 'react';
import { View } from 'react-native';
// Components
import style from './style';
import DepositViewInfo from '../depositViewInfo';

type Props = {
  renderToastNotification: () => void,
  navigation: any,
};

/**
 * DepositNavigationBar: This component is meant for handling deposit screen.
 */
const DepositNavigationBar = ({ navigation, renderToastNotification }: Props) => (
  <View style={style.mainContainerStyle}>
    <DepositViewInfo renderToastNotification={renderToastNotification} navigation={navigation} />
  </View>
);

export default DepositNavigationBar;
