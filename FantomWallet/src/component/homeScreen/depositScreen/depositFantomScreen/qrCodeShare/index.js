import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import style from './style';
import uploadQR from '../../../../../images/uploading.png';
import QRGenerator from '../../../../qr/generator/';


import { QRCode } from 'react-native-custom-qr-codes';
import ViewShot from "react-native-view-shot";
import Share from 'react-native-share';
import VersionCheck from 'react-native-version-check';

class QRCodeShare extends Component {

    onQRShare() {
        console.warn('share QR');
    }

    render() {
        const qrLink = this.props.qrLink;
        const titleText = 'Address QR Code';
        return (
            <View style={style.containerViewStyle}>
                <View style={style.addressTitleViewStyle}>
                    <Text style={style.addressTitleTextStyle}> {titleText} </Text>
                    <TouchableOpacity style={style.addressShareIconStyle} onPress={this.onQRShare.bind(this)}>
                        <Image source={uploadQR} style={style.addressShareImageIconStyle} />
                    </TouchableOpacity>
                </View>
                <View style={style.qrGeneratorstyle}>
                    <QRGenerator />
                </View>
                <TouchableOpacity style={style.qrLinkViewStyle}>
                    <Text style={style.qrLinkTextStyle}> {qrLink}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default QRCodeShare;