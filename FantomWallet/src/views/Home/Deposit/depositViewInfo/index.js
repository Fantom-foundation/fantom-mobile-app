// @flow
/* eslint-disable no-return-assign */
// Library
import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, View, Text, Keyboard, Clipboard, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

// Style
import styles from './styles';
// Components
import QRCodeShare from '~/components/QRCodeShare';
import BillingAmountScreen from '../billingAmountView/index';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '~/common/constants';

type Props = {
  publicKey: string,
  renderToastNotification: (string) => void,
}

/**
 * DepositViewInfo: This component is meant for redering deposit screen related information.
 */
export const DepositViewInfoContainer = ({ publicKey, renderToastNotification }: Props) => {
  const [amount, setAmount] = useState('');
  const [qrAddress, setQrAddress] = useState('');
  const scrollView = useRef<any>(null);
  const qrcode = useRef<any>(null);
  // eslint-disable-next-line no-unused-vars

  useEffect(() => {
    const timeout = setTimeout(() => setQrAddress(publicKey));
    return () => clearTimeout(timeout);
  }, []);

  const onAmountChange = text => setAmount(text.trim());

  const onCopyAddress = async () => {
    // Copies address to clipboard
    await Clipboard.setString(qrAddress);
    renderToastNotification('Copied');
  };

  const onTextFieldFocus = () => {
    const moveBy = 930 - DEVICE_HEIGHT;
    if (moveBy > 0) {
      scrollView.current.scrollTo({ x: 0, y: moveBy, animated: true });
    }
  };

  const onTextFieldBlur = () => {
    Keyboard.dismiss();
    scrollView.current.scrollToEnd();
  };

  // called on click of share button
  const onShare = () => qrcode.current.shareQR();

  const qrLink = qrAddress;
  const headerText = 'FTM';

  return (
    <ScrollView
      ref={scrollView}
      style={styles.fantomViewStyle}
      showsVerticalScrollIndicator={false}
    >
      <QRCodeShare
        ref={qrcode}
        copyAddress={() => onCopyAddress()}
        qrLink={qrLink}
        billingAmount={amount}
      />
      <BillingAmountScreen
        onAmountChange={onAmountChange}
        onTextFieldFocus={onTextFieldFocus}
        onTextFieldBlur={onTextFieldBlur}
        headerText={headerText}
      />
      <View style={styles.confirmContainer}>
        <TouchableOpacity style={styles.confirmButtonOuterContainer} onPress={onShare}>
          <View style={styles.confirmButtonInnerContainer}>
            <EvilIcons name="share-apple" color="#FFF" size={DEVICE_WIDTH * 0.09} />
          </View>
        </TouchableOpacity>
        <Text style={styles.confirmTextStyle}>Share</Text>
      </View>

      <View style={{ height: DEVICE_HEIGHT * 0.15, marginBottom: 10 }} />
    </ScrollView >
  );
};

const mapStateToProps = state => ({
  publicKey: state.keys.publicKey,
});

export default connect(mapStateToProps)(DepositViewInfoContainer);
