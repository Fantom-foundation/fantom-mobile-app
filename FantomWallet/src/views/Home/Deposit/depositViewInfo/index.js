// @flow
/* eslint-disable no-return-assign */
// Library
import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, View, Text, Keyboard, Clipboard, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import DropdownAlert from 'react-native-dropdownalert';

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
export const DepositViewInfo = ({ publicKey, renderToastNotification }: Props) => {
  const [amount, setAmount] = useState('');
  const [qrAddress, setQrAddress] = useState('');
  let scrollView = useRef(null);
  let qrcode = useRef(null);
  // eslint-disable-next-line no-unused-vars
  let dropdown = useRef(null);

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
      scrollView.scrollTo({ x: 0, y: moveBy, animated: true });
    }
  };

  const onTextFieldBlur = () => {
    Keyboard.dismiss();
    scrollView.scrollToEnd();
  };

  // called on click of share button
  const onShare = () => qrcode.shareQR();

  const qrLink = qrAddress;
  const headerText = 'FTM';

  return (
    <ScrollView
      ref={scroll => (scrollView = scroll)}
      style={styles.fantomViewStyle}
      showsVerticalScrollIndicator={false}
    >
      <QRCodeShare
        ref={refObj => (qrcode = refObj)}
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
      <View style={{ position: 'absolute', top: 0, flex: 1, width: DEVICE_WIDTH }}>
        <DropdownAlert
          containerStyle={{ backgroundColor: 'rgb(0,168,251)' }}
          ref={ref => (dropdown = ref)}
          style={{ backgroundColor: 'red' }}
        />
      </View>
    </ScrollView>
  );
};

const mapStateToProps = state => ({
  publicKey: state.keys.publicKey,
});

export default connect(mapStateToProps)(DepositViewInfo);
