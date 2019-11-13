// @flow
import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { QRCode } from 'react-native-custom-qr-codes';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import { View, Image, Text, ActivityIndicator, Alert, Dimensions } from 'react-native';
import FantomLogoTranparentWhite from '~/images/fantom_logo_TranparentWhite.png';

import styles from './styles';

export const DEVICE_WIDTH = Dimensions.get('window').width;
export const DEVICE_HEIGHT = Dimensions.get('window').height;

type Props = {
  qrLink: ?string,
  titleText: string,
  billingAmount: string,
};

const QRGenerator = ({ qrLink, titleText, billingAmount }: Props, ref) => {
  let viewShot = useRef(null);

  useImperativeHandle(ref, () => ({
    onPress: () => {
      if (!billingAmount || billingAmount === '0') {
        Alert.alert('Error', 'Please enter billing amount.');
        return;
      }
      // $FlowFixMe:
      viewShot.capture().then(uri => {
        const message = '';
        Share.open({ url: uri, title: 'Fantom', message })
          .then(() => { })
          .catch(() => { });
      });
    },
  }));

  const renderLogo = () => {
    if (qrLink) {
      const size = 250;
      const logoWidth = 146;
      const logoHeight = 35;
      const logoConatinerStyle = {
        flexDirection: 'row',
        width: logoWidth,
        height: logoHeight,
        position: 'absolute',
        left: size / 2 - logoWidth / 2,
        top: size / 2 - logoHeight / 2,
        padding: 15,
        backgroundColor: 'rgb(14,14,18)',
      };
      const logoImgStyle = {
        alignSelf: 'center',
        backgroundColor: 'rgb(14,14,18)',
        flex: 1,
        height: logoHeight,
      };
      return (
        <View style={logoConatinerStyle}>
          <Image
            source={FantomLogoTranparentWhite} // eslint-disable-line
            style={logoImgStyle}
            resizeMode="contain"
          />
        </View>
      );
    }
    return null;
  };

  const renderLoader = () => (
    <View style={styles.loaderStyle}>
      <ActivityIndicator size="large" color="#FFF" />
    </View>
  );

  const renderQrCode = () => {
    if (qrLink) {
      // return null;
      return <QRCode content={qrLink} ecl="M" backgroundColor="white" color="rgb(14,14,18)" />;
    }
    // If link is not present, start loader
    return renderLoader();
  };

  const updatedBillingAmount = Math.round(Number(billingAmount) * 10000) / 10000;
  return (
    <View style={styles.container}>
      {/* Top heading */}
      <View style={styles.addressTitleViewStyle}>
        <Text style={styles.addressTitleTextStyle}> {titleText} </Text>
      </View>

      <View style={{ flex: 1 }}>
        {renderQrCode()}

        {/* Displays fantom log in center of QR code */}
        {renderLogo()}
      </View>

      {/* For sharing */}
      <ViewShot
        ref={_viewShot => {
          viewShot = _viewShot;
        }}
        options={{ format: 'jpg' }}
        style={{
          position: 'absolute',
          left: -(DEVICE_WIDTH * 5),
          top: -(DEVICE_HEIGHT * 5),
          backgroundColor: 'white',
        }}
      >
        <>
          {!!qrLink && (
            <QRCode content={qrLink} ecl="M" backgroundColor="white" color="rgb(14,14,18)" />
          )}
          {renderLogo()}
          {(qrLink === undefined || qrLink === '') && (
            <View style={styles.loaderStyle}>
              <ActivityIndicator size="large" color="#000" />
            </View>
          )}
          <View style={{ height: 2, backgroundColor: 'rgb(50, 50, 50)', flex: 1, margin: 10 }} />
          <Text style={{ margin: 10, marginTop: 0, fontSize: 16, fontWeight: 'bold', width: 230 }}>
            Billing amount: {updatedBillingAmount} FTM
          </Text>
        </>
      </ViewShot>
    </View>
  );
};
// $FlowFixMe
export default forwardRef(QRGenerator);
