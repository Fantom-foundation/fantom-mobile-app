/* eslint-disable*/
import React, { useRef } from 'react';
import { View, Image } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
// Style
import style from './style';
// Component
import DepositView from './depositView/index';
// Image
import BackgroundIcon from '~/images/BackgroundIcon.png';
/**
 * To Display DepositTab related tasks
 */
export default () => {
  const renderToastNotification = (text) => {
    this.dropdown.alertWithType('custom', text.toUpperCase(), '');
  }
  const dropdown = useRef(null);
  return (
    <View style={style.depositViewStyle}>
      <View style={style.depositScreenStyle}>
        <Image style={style.backgroundIconStyle} source={BackgroundIcon} resizeMode="contain" />
        <DepositView renderToastNotification={renderToastNotification} />
      </View>
      <DropdownAlert
          containerStyle={{ backgroundColor: 'rgb(0,168,251)' }}
          ref={ref => (this.dropdown = ref)}
          style={{ backgroundColor: 'red' }}
        />
    </View>
  );
}

