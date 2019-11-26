// @flow
/* eslint-disable react/sort-comp */
// Library
import React, { useState, useRef } from 'react';
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
import { connect } from 'react-redux';

import { NavigationService, routes } from '~/navigation/helpers';
import { DEVICE_HEIGHT, GAS_PRICE } from '~/common/constants';
import { estimationMaxFantomBalance, toFixed } from '~/utils/converts';
// Images
import person from '~/images/person_whiteOutline.png';
import qrCode from '~/images/QR.png';
import BackgroundIcon from '~/images/BackgroundIcon.png';
import SendIcon from '~/images/sendWhite.png';

import styles from './styles';

type Props = {
  balance: string,
  navigation: {
    navigate: (string, any) => void,
  },
};

/**
 * To Display WithdrawTab related tasks
 */
export const Withdraw = ({ balance }: Props) => {
  const scrollView = useRef<any>(null);
  const [val, setVal] = useState('FTM');
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [actualAmount, setActualAmount] = useState('');
  const [fees, setFees] = useState('');
  const [memo, setMemo] = useState('');

  const maxFantomBalance = estimationMaxFantomBalance(balance, GAS_PRICE);

  const onFocus = () => {
    scrollView.current.scrollTo({ x: 0, y: DEVICE_HEIGHT * 0.18, animated: true });
  };

  const onBlur = () => {
    Keyboard.dismiss();
    scrollView.current.scrollTo({ x: 0, y: 0, animated: true });
  };

  /**
   * onScanSuccess()  : This function is meant to set address when user clicks on scanner button.
   */
  const onScanSuccess = (_address: string) => setAddress(_address);

  const onContactPress = () => {
    NavigationService.navigate(routes.root.AddressBook, {
      isEditMode: true,
      onSelection: onScanSuccess.bind(this),
    });
  };

  const onScannerPress = () => {
    NavigationService.navigate(routes.root.QRScanner, { onScanSuccess });
  };

  /**
   * reload() :  on screen reload reset the fields.
   */
  const reload = () => {
    setVal('FTM');
    setAddress('');
    setAmount('');
    setActualAmount('');
    setFees("");
    setMemo('');
  };

  /**
   *  handleSendMoney()  : This function is meant for handling input box validations ,
   *  and navigate to SendMoney screen if all fields are filled.
   */
  const handleSendMoney = () => {
    if (Number(actualAmount) === 0) {
      Alert.alert('Error', 'Please enter valid amount');
    } else if (actualAmount > maxFantomBalance) {
      Alert.alert('Error', 'Insufficient balance');
    } else {
      const coin = val;
      let message = '';
      if (address === '') message = 'Please enter address.';
      else if (!Web3.utils.isAddress(address)) message = 'Please enter valid address.';
      else if (amount === '') message = 'Please enter valid amount';

      if (message !== '') Alert.alert('Error', message);
      if (address && Web3.utils.isAddress(address) && amount) {
        NavigationService.navigate(routes.root.SendMoney, {
          address,
          amount: actualAmount,
          coin,
          memo,
          fees,
          reload,
          balance,
        });
      }
    }
  };

  const callAmountClicked = () => {
    setAmount(maxFantomBalance);
    setActualAmount(maxFantomBalance);
  };

  const changeAmount = (_amount: string) => {
    setAmount(_amount);
    setActualAmount(_amount);
  };

  const ftmBalanceFixed = toFixed(balance, 4);
  return (
    <View style={styles.mainContainerStyle}>
      <Image style={styles.backgroundIconStyle} source={BackgroundIcon} resizeMode="contain" />
      <ScrollView
        ref={scrollView}
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topMarginContainer} />
        <View style={styles.amtContainer}>
          <View style={styles.balanceHeadingContainer}>
            <Text style={styles.balanceHeadingTextStyle}>Balance</Text>
          </View>
          <View style={styles.balanceViewText}>
            <Text numberOfLines={1} style={styles.balanceViewTextOne}>
              {ftmBalanceFixed} {val}
            </Text>
          </View>
        </View>
        {/* Address to send */}
        <View style={styles.addressContainer}>
          <Text style={styles.inputTextHeading}>Address to send</Text>
          <View style={styles.textInputContainer}>
            <TextInput
              onChangeText={setAddress}
              value={address}
              style={styles.enteredTextStyle}
              placeholder="Enter Address"
              placeholderTextColor="rgba( 255, 255, 255, 0.2)"
              autoCorrect={false}
              onSubmitEditing={Keyboard.dismiss}
              underlineColorAndroid="transparent"
            />
            <TouchableOpacity style={styles.iconContainer} onPress={onScannerPress}>
              <Image source={qrCode} style={styles.qrCode} resizeMode="contain" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconContainer} onPress={onContactPress}>
              <Image
                source={person}
                style={styles.contactIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* Price container */}
        <View style={styles.addressContainer}>
          <Text style={styles.inputTextHeading}>Amount</Text>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.enteredTextStyle}
              placeholderTextColor="rgba( 255, 255, 255, 0.2)"
              autoCorrect={false}
              onChangeText={changeAmount}
              value={`${amount}`}
              placeholder="Enter Amount"
              keyboardType="decimal-pad"
              autoCapitalize="none"
              onSubmitEditing={() => {
                Keyboard.dismiss();
              }}
              underlineColorAndroid="transparent"
            />
            <View style={[styles.priceSubContainer, styles.priceSubContainerColor]}>
              <Text style={styles.priceTextStyle}>FTM</Text>
            </View>
            <TouchableOpacity
              style={styles.priceSubContainer}
              onPress={callAmountClicked}
            >
              <Text style={[styles.priceTextStyle, styles.priceTextStyleAll]}>ALL</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Memo container */}
        <View style={styles.addressContainer}>
          <Text style={styles.inputTextHeading}>Memo</Text>
          <View style={styles.memoTextInputContainer}>
            <TextInput
              style={styles.enteredTextStyle}
              placeholderTextColor="rgba( 255, 255, 255, 0.2)"
              autoCorrect={false}
              onChangeText={setMemo}
              value={memo}
              placeholder="Enter Memo"
              autoCapitalize="none"
              onFocus={onFocus}
              onBlur={onBlur}
              multiline
              underlineColorAndroid="transparent"
            />
          </View>
        </View>
        {/* Confirm container */}
        <View style={styles.confirmContainer}>
          <TouchableOpacity
            style={styles.confirmButtonOuterContainer}
            onPress={handleSendMoney}
          >
            <View style={styles.confirmButtonInnerContainer}>
              <Image
                source={SendIcon}
                style={styles.sendImage}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
          <Text style={styles.confirmTextStyle}>Send</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = state => ({
  balance: state.wallet.balance,
});

export default connect(mapStateToProps)(Withdraw);
