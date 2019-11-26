// @flow
import React from 'react';
import { View, Text, ActivityIndicator, Dimensions } from 'react-native';

import QRCodeWithLogo from '~/components/QRCode/QRCodeWithLogo';

import styles from './styles';

export const DEVICE_WIDTH = Dimensions.get('window').width;
export const DEVICE_HEIGHT = Dimensions.get('window').height;

type Props = {
  qrLink: ?string,
  titleText: string,
};

const QRGenerator = ({ qrLink, titleText }: Props) => {
  const renderLoader = (color: string = "#FFF") => (
    <View style={styles.loaderStyle}>
      <ActivityIndicator size="large" color={color} />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Top heading */}
      <View style={styles.addressTitleViewStyle}>
        <Text style={styles.addressTitleTextStyle}> {titleText} </Text>
      </View>

      {qrLink ? <QRCodeWithLogo content={qrLink} /> : renderLoader()}

    </View>
  );
};

export default QRGenerator;
