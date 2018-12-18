// Library
import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Image,
  Alert,
} from 'react-native';
import Web3 from 'web3';
import PropTypes from 'prop-types';

import { DEVICE_HEIGHT, DEVICE_WIDTH } from '../../../common/constants';
// Images
import person from '../../../images/person_whiteOutline.png';
import qrCode from '../../../images/QR.png';
import BackgroundIcon from '../../../images/BackgroundIcon.png';
import SendIcon from '../../../images/sendWhite.png';

import style from './style';
/**
 * To Display WithdrawTab related tasks
 */
export default class WithdrawScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      val: 'FTM',
      address: '',
      amount: '',
      fees: '',
      memo: '',
    };
  }

  onContactPress() {
    this.props.navigation.navigate('AddressBook', {
      isEditMode: true,
      onSelection: this.onScanSuccess.bind(this),
    });
  }

  onFocus() {
    // const moveBy = DEVICE_HEIGHT <= 568 ? 690 - DEVICE_HEIGHT : 740 - DEVICE_HEIGHT;
    // if (moveBy > 0) {
    this.scrollView.scrollTo({ x: 0, y: DEVICE_HEIGHT * 0.18, animated: true });
    // }
  }

  onBlur() {
    Keyboard.dismiss();
    this.scrollView.scrollTo({ x: 0, y: 0, animated: true });
  }

  /**
   * onScanSuccess()  : This function is meant to set address when user clicks on scanner button.
   */
  onScanSuccess(address) {
    this.setState({
      address,
    });
  }

  onScannerPress() {
    this.props.navigation.navigate('QRScanner', { onScanSuccess: this.onScanSuccess.bind(this) });
  }

  /**
   *  handleSendMoney()  : This function is meant for handling input box validations ,
   *  and navigate to SendMoney screen if all fields are filled.
   */
  handleSendMoney() {
    const { address, amount, fees, memo, actualAmount } = this.state;
    const ftmBalance = Number(this.props.maxFantomBalance);
    if (Number(actualAmount) === 0) {
      Alert.alert('Error', 'Please enter valid amount');
    } else if (actualAmount > ftmBalance) {
      Alert.alert('Error', 'Insufficient balance');
    } else {
      const coin = this.state.val;
      let message = '';
      if (address === '') {
        message = 'Please enter address.';
      } else if (!Web3.utils.isAddress(address)) {
        message = 'Please enter valid address.';
      } else if (amount === '') {
        message = 'Please enter valid amount';
      }
      if (message !== '') {
        Alert.alert('Error', message);
      }
      this.props.navigation.navigate('SendMoney', {
        address,
        amount: actualAmount,
        coin,
        memo,
        fees,
        reload: this.reload.bind(this),
        maxFantomBalance: this.props.maxFantomBalance,
      });
    }
  }

  /**
   * reload() :  on screen reload reset the fields.
   */
  reload() {
    this.setState({
      val: 'FTM',
      address: '',
      amount: '',
      actualAmount: '',
      fees: '',
      memo: '',
    });
  }

  toFixed(num, fixed) {
    const re = new RegExp(`^-?\\d+(?:.\\d{0,${fixed || -1}})?`);
    return num.toString().match(re)[0];
  }

  renderAmountContainer() {
    const ftmBalanceFixed = this.toFixed(this.props.maxFantomBalance, 4);
    return (
      <View style={style.amtContainer}>
        <View style={style.balanceHeadingContainer}>
          <Text style={style.balanceHeadingTextStyle}>Balance</Text>
        </View>
        <View style={style.balanceViewText}>
          <Text numberOfLines={1} style={style.balanceViewTextOne}>
            {ftmBalanceFixed} {this.state.val}
          </Text>
        </View>
      </View>
    );
  }

  renderAddressContainer() {
    return (
      <View style={style.addressContainer}>
        <Text style={style.inputTextHeading}>Address to send</Text>
        <View style={style.textInputContainer}>
          <TextInput
            onChangeText={address => this.setState({ address })}
            value={this.state.address}
            style={style.enteredTextStyle}
            placeholder="Enter Address"
            placeholderTextColor="rgba( 255, 255, 255, 0.2)"
            autoCorrect={false}
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
            underlineColorAndroid="transparent"
          />
          <TouchableOpacity style={style.iconContainer} onPress={() => this.onScannerPress()}>
            <Image source={qrCode} style={{ width: 25, height: 25 }} resizeMode="contain" />
          </TouchableOpacity>
          <TouchableOpacity style={style.iconContainer} onPress={() => this.onContactPress()}>
            <Image
              source={person}
              style={{ width: 22, height: 22, marginRight: 3 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderPriceContainer() {
    const FixedBalance = this.toFixed(this.props.maxFantomBalance, 4);
    const ftmBalance = Number(this.props.maxFantomBalance);
    return (
      <View style={style.addressContainer}>
        <Text style={style.inputTextHeading}>Price</Text>
        <View style={style.textInputContainer}>
          <TextInput
            style={style.enteredTextStyle}
            placeholderTextColor="rgba( 255, 255, 255, 0.2)"
            autoCorrect={false}
            onChangeText={amount => this.setState({ amount, actualAmount: amount })}
            value={`${this.state.amount}`}
            placeholder="Enter Amount"
            keyboardType="decimal-pad"
            autoCapitalize="none"
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
            underlineColorAndroid="transparent"
          />
          <View style={style.priceSubContainer}>
            <Text style={style.priceTextStyle}>FTM</Text>
          </View>
          <TouchableOpacity
            style={[style.priceSubContainer, { backgroundColor: 'rgb(0,177,251)' }]}
            onPress={() => this.setState({ amount: FixedBalance, actualAmount: ftmBalance })}
          >
            <Text style={[style.priceTextStyle, { fontFamily: 'SFProDisplay-Semibold' }]}>ALL</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderMemoContainer() {
    return (
      <View style={style.addressContainer}>
        <Text style={style.inputTextHeading}>Memo</Text>
        <View style={style.memoTextInputContainer}>
          <TextInput
            style={style.enteredTextStyle}
            placeholderTextColor="rgba( 255, 255, 255, 0.2)"
            autoCorrect={false}
            onChangeText={memo => this.setState({ memo })}
            value={this.state.memo}
            placeholder="Enter Memo"
            autoCapitalize="none"
            onFocus={() => this.onFocus()}
            onBlur={() => this.onBlur()}
            multiline
            underlineColorAndroid="transparent"
          />
        </View>
      </View>
    );
  }

  renderConfirmButton() {
    return (
      <View style={style.confirmContainer}>
        <TouchableOpacity
          style={style.confirmButtonOuterContainer}
          onPress={() => this.handleSendMoney()}
        >
          <View style={style.confirmButtonInnerContainer}>
            <Image
              source={SendIcon}
              style={{
                height: DEVICE_WIDTH * 0.09,
                width: DEVICE_WIDTH * 0.09,
              }}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
        <Text style={style.confirmTextStyle}>Send</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={style.mainContainerStyle}>
        <Image style={style.backgroundIconStyle} source={BackgroundIcon} resizeMode="contain" />
        <ScrollView
          ref={scroll => {
            this.scrollView = scroll;
          }}
          style={{ height: DEVICE_HEIGHT }}
          showsVerticalScrollIndicator={false}
        >
          <View style={style.topMarginContainer} />
          {this.renderAmountContainer()}
          {/* Address to send */}
          {this.renderAddressContainer()}
          {/* Price container */}
          {this.renderPriceContainer()}
          {/* Memo container */}
          {this.renderMemoContainer()}
          {/* Confirm container */}
          {this.renderConfirmButton()}
          <View style={{ height: DEVICE_HEIGHT * 0.3 }} />
        </ScrollView>
      </View>
    );
  }
}

WithdrawScreen.propTypes = {
  navigation: PropTypes.object,
};
