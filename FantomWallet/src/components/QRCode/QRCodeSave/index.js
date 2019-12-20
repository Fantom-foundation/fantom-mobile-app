// @flow
import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { View, Text, Alert, ActivityIndicator } from 'react-native';
import Share from 'react-native-share';
import ViewShot from 'react-native-view-shot';

import QRCodeWithLogo from '~/components/QRCode/QRCodeWithLogo';
import styles from './styles';


const QRCodeSave = (props: TQrCodeSaveTypes, ref: any) => {
  const { content, amount } = props;
  const viewShot: any = useRef(null);

  const renderLoader = (color: string = "#FFF") => (
    <View style={styles.loader}>
      <ActivityIndicator size="large" color={color} />
    </View>
  );

  const save = () => {
    if (!amount || amount === '0') {
      Alert.alert('Error', 'Please enter billing amount.');
      return;
    }
    viewShot.current.capture().then(uri => {
      const message = '';
      Share.open({ url: uri, title: 'Fantom', message })
        .then(() => { })
        .catch(() => { });
    });
  };

  useImperativeHandle(ref, () => ({
    onPress: save,
  }));

  return (
    <ViewShot
      ref={viewShot}
      options={{ format: 'jpg' }}
      style={styles.viewShot}
    >
      <>
        {content
          ? <QRCodeWithLogo content={content} />
          : renderLoader('#000')}
        <View style={styles.line} />
        <Text style={styles.textAmount}>
          Billing amount: {Math.round(Number(amount) * 10000) / 10000} FTM
          </Text>
      </>
    </ViewShot>
  );
};

// $FlowFixMe
export default forwardRef(QRCodeSave);