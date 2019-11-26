// @flow
import React from 'react';
import { View, Image } from 'react-native';
import { QRCode } from 'react-native-custom-qr-codes';

import FantomLogoTranparentWhite from '~/images/fantom_logo_TranparentWhite.png';


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

type Props = {
  content: string,
}

export default ({ content }: Props) => (
  <View style={{ flex: 1 }}>
    <QRCode content={content} ecl="M" backgroundColor="white" color="rgb(14,14,18)" />
    <View style={logoConatinerStyle}>
      <Image
        source={FantomLogoTranparentWhite} // eslint-disable-line
        style={logoImgStyle}
        resizeMode="contain"
      />
    </View>
  </View>
);
