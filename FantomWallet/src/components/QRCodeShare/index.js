import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';
import QRGenerator from '~/components/QRCodeGenerator';

/**
 * QRCodeShare: This component is meant for displaying QR code and QR address.
 */
class QRCodeShare extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.shareQR = this.shareQR.bind(this);
  }

  shareQR() {
    this.generator.onPress();
  }

  renderQRLinkContainer(qrLink) {
    if (qrLink && qrLink !== '' && qrLink !== undefined && qrLink !== null) {
      return (
        <TouchableOpacity onPress={() => this.props.copyAddress()} style={styles.qrLinkViewStyle}>
          <MaterialIcons name="content-copy" color="rgb(0,177,251)" size={16} />
          <Text style={styles.qrLinkTextStyle}> {qrLink}</Text>
        </TouchableOpacity>
      );
    }
    return null;
  }

  render() {
    const { qrLink } = this.props;

    const titleText = 'Address QR Code';
    return (
      <View style={styles.containerViewStyle}>
        {/* QR code */}
        <View style={styles.qrGeneratorstyle}>
          <QRGenerator
            ref={refObj => (this.generator = refObj)}
            titleText={titleText}
            qrLink={qrLink}
            billingAmount={this.props.billingAmount}
          />
        </View>
        {/* Copy Address Field */}
        {this.renderQRLinkContainer(qrLink)}
      </View>
    );
  }
}

QRCodeShare.propTypes = {
  qrLink: PropTypes.string,
};
export default QRCodeShare;
