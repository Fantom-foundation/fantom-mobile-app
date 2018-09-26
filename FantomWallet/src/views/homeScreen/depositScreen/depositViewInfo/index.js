import React, { Component } from 'react';
import { ScrollView, View, Text, Keyboard, Clipboard } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import style from './style';

import QRCodeShare from '../qrShareCode/index';
import BillingAmountScreen from '../billingAmountView/index';
import Button from '../../../../general/button';

import { DEVICE_HEIGHT } from '../../../../common/constants';

/**
 * DepositViewInfo: This component is meant for redering deposit screen related information.
 */
class DepositViewInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
      qrAddress: '',
    };
    this.onAmountChange = this.onAmountChange.bind(this);
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

  onQRShare() {
    console.warn('share QR');
  }

  onAmountChange(amount) {
    amount = amount.trim();
    this.setState({
      amount,
    });
  }

  async onCopyAddress() {
    const string = this.state.qrAddress;
    console.warn('copy address', string);
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

  render() {
    const balanceText = '(1,000\\ = 1.00002312FTM)';
    const qrLink = this.state.qrAddress;
    let headerText = 'FTM';
    // if (this.props.selectedTab === 'Fantom') {
    //   headerText = 'FTM';
    // }

    return (
      <ScrollView
        ref={scroll => (this.scrollView = scroll)}
        style={style.fantomViewStyle}
        showsVerticalScrollIndicator={false}
      >
        {/* <View style={style.amountDisplayStyle}>
          <Text>{balanceText} </Text>
        </View> */}
        <QRCodeShare
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
        <View style={style.buttonViewStyle}>
          <Button
            text="Copy Address"
            buttonStyle={{ backgroundColor: '#EEBD12' }}
            textStyle={{ color: '#000' }}
            onPress={() => this.onCopyAddress()}
          />
        </View>
        <View style={{ height: 40, marginBottom: 10 }} />
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
  //   navigation: PropTypes.object,
  selectedTab: PropTypes.string,
};

export default connect(
  mapStateToProps
  // ,   mapDispatchToProps
)(DepositViewInfo);
