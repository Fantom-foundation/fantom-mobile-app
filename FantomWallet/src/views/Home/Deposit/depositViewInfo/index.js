// @flow
/* eslint-disable no-return-assign */
// Library
import React, { useState, useEffect, useRef } from "react";
import {
  ScrollView,
  View,
  Text,
  Keyboard,
  Clipboard,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

// Style
import styles from "./styles";
// Components
import QRGenerator from "~/components/QRCode/QRCodeGenerator";
import QRCodeSave from "~/components/QRCode/QRCodeSave";
import BillingAmountScreen from "../billingAmountView/index";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "~/common/constants";
import { setDopdownAlert } from "~/redux/notification/actions";

type Props = {
  publicKey: string,
  setAlert: (string, string) => void
};

/**
 * DepositViewInfo: This component is meant for redering deposit screen related information.
 */
export const DepositViewInfoContainer = (props: TDepositViewInfoTypes) => {
  const { publicKey, setAlert } = props;
  const [amount, setAmount] = useState("");
  const [qrAddress, setQrAddress] = useState("");
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
    setAlert("custom", "Copied");
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
  const onShare = () => qrcode.current.onPress();

  const qrLink = qrAddress;
  const headerText = "FTM";

  return (
    <ScrollView
      ref={scrollView}
      style={styles.scroll}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* QR code */}
      <View style={styles.qrGeneratorstyle}>
        <QRGenerator
          titleText="Address QR Code"
          qrLink={qrLink}
          billingAmount={amount}
        />
        <QRCodeSave content={qrLink} amount={amount} ref={qrcode} />
      </View>
      {qrLink ? (
        <TouchableOpacity
          onPress={() => onCopyAddress()}
          style={styles.qrLinkViewStyle}
        >
          <MaterialIcons name="content-copy" color="rgb(0,177,251)" size={16} />
          <Text style={styles.qrLinkTextStyle}>{qrLink}</Text>
        </TouchableOpacity>
      ) : null}
      <BillingAmountScreen
        onAmountChange={onAmountChange}
        onTextFieldFocus={onTextFieldFocus}
        onTextFieldBlur={onTextFieldBlur}
        headerText={headerText}
      />
      <View style={styles.confirmContainer}>
        <TouchableOpacity
          style={styles.confirmButtonOuterContainer}
          onPress={onShare}
        >
          <View style={styles.confirmButtonInnerContainer}>
            <EvilIcons
              name="share-apple"
              color="#FFF"
              size={DEVICE_WIDTH * 0.09}
            />
          </View>
        </TouchableOpacity>
        <Text style={styles.confirmTextStyle}>Share</Text>
      </View>
    </ScrollView>
  );
};

export default connect(
  state => ({
    publicKey: state.keys.publicKey
  }),
  {
    setAlert: setDopdownAlert
  }
)(DepositViewInfoContainer);
