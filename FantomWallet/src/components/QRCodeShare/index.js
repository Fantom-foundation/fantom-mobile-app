// @flow
import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';
import QRGenerator from '~/components/QRCodeGenerator';

type Props = {
  qrLink: string,
  billingAmount: string,
  copyAddress: () => void
}
/**
 * QRCodeShare: This component is meant for displaying QR code and QR address.
 */
const QRCodeShare = ({ qrLink = '', billingAmount, copyAddress }: Props, ref) => {
  const _generator = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    shareQR: () => _generator.current.onPress(),
  }));
  return (
    <View style={styles.containerViewStyle}>
      {/* QR code */}
      <View style={styles.qrGeneratorstyle}>
        <QRGenerator
          titleText="Address QR Code"
          qrLink={qrLink}
          billingAmount={billingAmount}
          ref={_generator}
        />
      </View>
      {/* Copy Address Field */}
      {qrLink && qrLink !== '' && qrLink !== undefined && qrLink !== null ? (
        <TouchableOpacity onPress={() => copyAddress()} style={styles.qrLinkViewStyle}>
          <MaterialIcons name="content-copy" color="rgb(0,177,251)" size={16} />
          <Text style={styles.qrLinkTextStyle}>{qrLink}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};
// $FlowFixMe
export default forwardRef(QRCodeShare);

