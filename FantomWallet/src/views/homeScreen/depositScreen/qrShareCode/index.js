import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import style from './style';
import QRGenerator from '../../../../views/qr/generator/index';

/**
 * QRCodeShare: This component is meant for displaying QR code and QR address.
 */
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
                    <QRGenerator titleText={titleText} qrLink={qrLink} billingAmount={this.props.billingAmount} />
                </View>
                <TouchableOpacity style={style.qrLinkViewStyle}>
                    <Text style={style.qrLinkTextStyle}> {qrLink}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

QRCodeShare.propTypes = {
    qrLink: PropTypes.string,
}
export default QRCodeShare;