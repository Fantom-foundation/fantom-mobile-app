// Library
import React, { Component } from 'react';
import { ScrollView, View, Text, Keyboard, Clipboard, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
// Style
import style from './style';
// Components
import QRCodeShare from '../qrShareCode/index';
import BillingAmountScreen from '../billingAmountView/index';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '../../../../common/constants';

/**
 * DepositViewInfo: This component is meant for redering deposit screen related information.
 */
class DepositViewInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: '',
      qrAddress: '',
    };
    this.onAmountChange = this.onAmountChange.bind(this);
    this.shareData = {};
  }

  componentDidMount() {
    this.timeout = setTimeout(() => {
      this.setState({
        qrAddress: this.props.publicKey,
      });
    }, 500);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  onAmountChange(amount) {
    this.setState({
      amount: amount.trim(),
    });
  }

  async onCopyAddress() {
    // Copies address to clipboard
    const string = this.state.qrAddress;
    await Clipboard.setString(string);
  }

  onTextFieldFocus() {
    let moveBy = 930 - DEVICE_HEIGHT;
    if (moveBy > 0) {
      this.scrollView.scrollTo({ x: 0, y: moveBy, animated: true });
    }
  }

  onTextFieldBlur() {
    Keyboard.dismiss();
    this.scrollView.scrollToEnd();
  }

  onShare() {
    // called on click of share button
    this.qrcode.shareQR();
  }

  renderConfirmButton() {
    return (
      <View style={style.confirmContainer}>
        <TouchableOpacity style={style.confirmButtonOuterContainer} onPress={() => this.onShare()}>
          <View style={style.confirmButtonInnerContainer}>
            <EvilIcons name="share-apple" color="#FFF" size={DEVICE_WIDTH * 0.09} />
          </View>
        </TouchableOpacity>
        <Text style={style.confirmTextStyle}>Share</Text>
      </View>
    );
  }

  render() {
    const qrLink = this.state.qrAddress;
    let headerText = 'FTM';

    return (
      <ScrollView
        ref={scroll => (this.scrollView = scroll)}
        style={style.fantomViewStyle}
        showsVerticalScrollIndicator={false}
      >
        <QRCodeShare
          ref={refObj => (this.qrcode = refObj)}
          copyAddress={() => this.onCopyAddress()}
          qrLink={qrLink}
          billingAmount={this.state.amount}
        />
        <BillingAmountScreen
          onAmountChange={this.onAmountChange}
          onTextFieldFocus={() => this.onTextFieldFocus()}
          onTextFieldBlur={() => this.onTextFieldBlur()}
          headerText={headerText}
        />
        {this.renderConfirmButton()}

        <View style={{ height: DEVICE_HEIGHT * 0.15, marginBottom: 10 }} />
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  publicKey: state.keyReducer.publicKey,
});

// const mapDispatchToProps = dispatch => ({});

DepositViewInfo.propTypes = {
  publicKey: PropTypes.string,
};

export default connect(
  mapStateToProps
  // ,   mapDispatchToProps
)(DepositViewInfo);
