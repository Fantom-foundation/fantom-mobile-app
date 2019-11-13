// @flow
import React, { useRef } from 'react';
import { View, Alert } from 'react-native';
import Web3 from 'web3';
import type { NavigationScreenProp } from 'react-navigation';

import { NavigationService } from '~/navigation/helpers';
import Header from '~/components/Header/index';
import QRCodeScanner from '.';
import styles from './styles';

type Props = {
  navigation: NavigationScreenProp
}

const ScanScreen = ({ navigation }: Props) => {
  const scanner = useRef<any>(null);

  const onSuccess = ({ data }: { data: string }) => {
    const successFunc = navigation.getParam('onScanSuccess', null);
    if (data) {
      const dataStr = data.trim();
      const isValid = Web3.utils.isAddress(dataStr);
      if (!isValid) {
        Alert.alert('Error', 'Please scan a valid QR code.', [
          {
            text: 'Ok',
            onPress: () => {
              scanner.current._setScanning(false); // eslint-disable-line
            },
            style: 'cancel',
          },
        ]);
        return;
      }
      if (successFunc) {
        successFunc(data);
        NavigationService.pop();
      }
    }
  };

  const onLeftIconPress = () => {
    NavigationService.pop();
  };

  return (
    <View style={styles.mainContainerStyle}>
      <Header
        text="QR Scan"
        leftButtonIcon="chevron-left"
        leftIconColor="#fff"
        leftIconSize={30}
        onLeftIconPress={onLeftIconPress}
        textStyle={styles.headerComponentText}
        headerStyle={styles.headerComponent}
      />
      <QRCodeScanner
        ref={scanner}
        // $FlowFixMe
        onRead={onSuccess}
      />
    </View>
  );
};
export default ScanScreen;