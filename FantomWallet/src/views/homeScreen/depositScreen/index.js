/* eslint-disable*/
import React, { PureComponent } from 'react';
import { View } from 'react-native';

import style from './style';

import DepositView from './depositView/index';
/**
 * To Display DepositTab related tasks
 */
export default class DepositScreen extends PureComponent {
  render() {
    return (
      <View style={style.depositViewStyle}>
        <View style={style.depositScreenStyle}>
          <DepositView />
        </View>
      </View>
    );
  }
}
