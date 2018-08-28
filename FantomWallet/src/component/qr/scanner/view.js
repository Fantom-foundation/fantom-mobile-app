'use strict';

import React, { Component } from 'react';

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  StatusBar,
  Alert,
} from 'react-native';
import arrowLeftButton from '../../../images/arrowLeft_White.png';
import Header from '../../../general/header/index';
import Web3 from 'web3';
import QRCodeScanner from './';

export default class ScanScreen extends Component {

  onSuccess(e) {
    const successFunc = this.props.navigation.getParam('onScanSuccess', null);
    const data = e.data;
    if (data) {
      const isValid = Web3.utils.isAddress(address);
      if (!isValid) {
        Alert.alert('Error', 'Please enter valid address.');
        return;
      }
      if (successFunc) {
        successFunc(data);
        this.props.navigation.goBack();
      }
    }
    
  }

  onLeftIconPress() {
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={styles.mainContainerStyle}>
      <StatusBar barStyle="light-content" />
      <Header text='Scan QR' leftButtonIcon={arrowLeftButton} onLeftIconPress={this.onLeftIconPress.bind(this)} leftIconSize={30} headerStyle={{ backgroundColor: 'rgb(233,177,18)' }} leftButtonStyle={{ backgroundColor: 'rgb(233,177,18)' }} />
      <QRCodeScanner
        onRead={this.onSuccess.bind(this)}
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
  mainContainerStyle: {
    flex: 1,
},
});