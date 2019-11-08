import React, { Component } from 'react';

import { View, StyleSheet, Alert } from 'react-native';
import Web3 from 'web3';
import { DEVICE_HEIGHT } from '~/common/constants';
import Header from '~/components/Header/index';
import QRCodeScanner from '.';

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

  headerComponent: {
    backgroundColor: 'rgb(44,52,58)',
    height: DEVICE_HEIGHT < 810 ? 84 : (106 / 812) * DEVICE_HEIGHT,
  },
  headerComponentText: {
    fontFamily: 'SFProDisplay-Semibold',
  },
});

export default class ScanScreen extends Component {
  onSuccess(e) {
    const successFunc = this.props.navigation.getParam('onScanSuccess', null);
    const { data } = e;
    if (data) {
      const dataStr = data.trim();
      const isValid = Web3.utils.isAddress(dataStr);
      if (!isValid) {
        Alert.alert('Error', 'Please scan a valid QR code.', [
          {
            text: 'Ok',
            onPress: () => {
              this.scanner._setScanning(false); // eslint-disable-line
            },
            style: 'cancel',
          },
        ]);
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
        <Header
          text="QR Scan"
          leftButtonIcon="chevron-left"
          leftIconColor="#fff"
          leftIconSize={30}
          onLeftIconPress={() => this.onLeftIconPress()}
          textStyle={styles.headerComponentText}
          headerStyle={styles.headerComponent}
        />
        <QRCodeScanner
          ref={scanner => {
            this.scanner = scanner;
          }}
          onRead={e => this.onSuccess(e)}
        />
      </View>
    );
  }
}