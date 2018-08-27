import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import style from './style';
import QRGenerator from '../../../component/qr/generator';


class QRCodeShare extends Component {
    onQRShare() {
        console.warn('share QR');
    }
    render() {
        const qrLink = this.props.qrLink;
        const titleText = 'Address QR Code';
        return (
            <View style={style.containerViewStyle}>
                <View style={style.qrGeneratorstyle}>
                    <QRGenerator titleText={titleText} qrLink={qrLink} />
                </View>
                <TouchableOpacity style={style.qrLinkViewStyle}>
                    <Text style={style.qrLinkTextStyle}> {qrLink}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default QRCodeShare;