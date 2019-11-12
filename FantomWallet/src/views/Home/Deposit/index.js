/* eslint-disable*/
import React, { useRef } from 'react';
import { View, Image } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
// Style
import styles from './styles';
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
    <View style={styles.depositViewStyle}>
      <View style={styles.depositScreenStyle}>
        <Image style={styles.backgroundIconStyle} source={BackgroundIcon} resizeMode="contain" />
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

