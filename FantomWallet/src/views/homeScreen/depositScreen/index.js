/* eslint-disable*/
import React, { PureComponent } from 'react';
import { View, Image } from 'react-native';
// Style
import style from './style';
// Component
import DepositView from './depositView/index';
// Image
import BackgroundIcon from '../../../images/BackgroundIcon.png';
/**
 * To Display DepositTab related tasks
 */
export default class DepositScreen extends PureComponent {
  render() {
    return (
      <View style={style.depositViewStyle}>
        <View style={style.depositScreenStyle}>
          <Image style={style.backgroundIconStyle} source={BackgroundIcon} resizeMode="contain" />
          <DepositView />
        </View>
      </View>
    );
  }
}
