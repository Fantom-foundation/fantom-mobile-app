import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Dimensions,
  Image,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Web3 from 'web3';
import PropTypes from 'prop-types';

import SortMenuCard from '../../../general/sortMenuCard/index';
import Button from '../../../general/button';

import style from './style';
import qrCode from '../../../images/QR_code.png';
import user from '../../../images/user.png';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

/**
 * To Display WithdrawTab related tasks
 */

export default class WithdrawScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openSortMenu: false,
      data: [
        { id: 0, key: 'FANTOM', sc: 'FTM' },
        { id: 1, key: 'FANTOM POINT', sc: 'FP' },
        { id: 2, key: 'ETHEREUM', sc: 'ETH' },
      ],
      val: 'FTM',
      index: 0,
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
    const moveBy = deviceHeight <= 568 ? 690 - deviceHeight : 740 - deviceHeight;
    if (moveBy > 0) {
      this.scrollView.scrollTo({ x: 0, y: moveBy, animated: true });
    }
  }

  onBlur() {
    Keyboard.dismiss();
    this.scrollView.scrollToEnd();
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

  setAllAmountToPrice() {
    const { maxFantomBalance } = this.props;
    const ftmBalance = Number(maxFantomBalance)
      .toFixed(4)
      .toString();
    const maxFantomBalanceStr = maxFantomBalance.toString();
    this.setState({
      amount: ftmBalance,
      actualAmount: maxFantomBalanceStr,
    });
  }

  handleClickOnScreen() {
    const { openSortMenu } = this.state;
    if (openSortMenu) {
      this.setState({
        openSortMenu: !openSortMenu,
      });
    }
  }

  handleSortMenu(item) {
    const { openSortMenu } = this.state;
    this.setState({
      openSortMenu: !openSortMenu,
    });
    if (item && item.sc) {
      this.setState({
        val: item.sc,
        index: item.id,
      });
    }
  }

  /**
   *  handleSendMoney()  : This function is meant for handling input box validations ,
   *  and navigate to SendMoney screen if all fields are filled.
   */
  handleSendMoney() {
    const { address, amount, fees, memo, actualAmount } = this.state;
    const coin = this.state.val;
    let message = '';
    if (address === '') {
      message = 'Please enter address.';
    } else if (!Web3.utils.isAddress(address)) {
      message = 'Please enter valid address.';
    } else if (amount === '') {
      message = 'Please enter valid amount';
    }
    // else if (fees === '') {
    //   message = 'Please enter valid fees.';
    // }
    if (message !== '') {
      Alert.alert('Error', message);
      return;
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

  render() {
    const dynamicStyle = this.state.openSortMenu ? { opacity: 0.2 } : '';
    const ViewUse = this.state.openSortMenu ? TouchableOpacity : View;
    const ftmBalance = Number(this.props.maxFantomBalance).toFixed(4);
    return (
      <ViewUse
        activeOpacity={1}
        style={style.withdrawViewStyle}
        onPress={() => this.handleClickOnScreen()}
      >
        <ScrollView
          ref={scroll => {
            this.scrollView = scroll;
          }}
          style={[{ flex: 1 }, dynamicStyle]}
          showsVerticalScrollIndicator={false}
        >
          <View style={style.sendContainer}>
            <Text style={style.sendText}>Send</Text>
          </View>

          <View style={style.addressContainer}>
            <Text style={style.addressText}>Address to send</Text>
            <View style={style.addressTextInputContainer}>
              <TextInput
                onChangeText={address => this.setState({ address })}
                value={this.state.address}
                style={style.addressTextInput}
                placeholder="Enter Address"
                placeholderTextColor="#a7a7a7"
                autoCapitalize="none"
              />
              <View
                style={{
                  flexDirection: 'row',
                  padding: 5,
                  justifyContent: 'space-around',
                  width: 80,
                }}
              >
                <TouchableOpacity
                  onPress={() => this.onScannerPress()}
                  style={{ width: 40, height: 28, alignItems: 'center' }}
                >
                  <Image source={qrCode} style={{ width: 28, height: 28 }} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.onContactPress()}
                  style={{ width: 40, height: 28, alignItems: 'center' }}
                >
                  <Image source={user} style={{ width: 26, height: 26 }} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={style.priceContainer}>
            <View style={style.priceTextContainer}>
              <Text style={style.price}>Price</Text>
            </View>
            <View style={style.addressTextInputContainer}>
              <TextInput
                onChangeText={amount => this.setState({ amount, actualAmount: amount })}
                value={`${this.state.amount}`}
                style={style.priceTextInput}
                placeholder="Enter Amount"
                keyboardType="decimal-pad"
                placeholderTextColor="#a7a7a7"
                autoCapitalize="none"
              />
              <TouchableOpacity
                onPress={() => this.handleSortMenu()}
                style={{ flexDirection: 'row', padding: 2 }}
              >
                <View style={style.sc}>
                  <Text>{this.state.val}</Text>
                </View>
                <Icon name="arrow-drop-down" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <View style={style.availableContainer}>
              <View
                style={{
                  alignItems: 'flex-end',
                  paddingRight: 10,
                  width: deviceWidth * 0.8,
                }}
              >
                <Text>Available to Transfer:</Text>
                <Text> {ftmBalance} FTM </Text>
              </View>
              <View style={style.allContainer}>
                <TouchableOpacity
                  onPress={() => this.setAllAmountToPrice()}
                  style={{ flexDirection: 'row', padding: 2 }}
                >
                  <Text>all</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* uncomment this for displaying the transfer fees amount view 
          
          <View style={style.feesContainer}>
            <Text style={style.feesText}>Fees</Text>
            <View style={style.addressTextInputContainer}>
              <TextInput
                onChangeText={(fees) => this.setState({ fees })}
                value={this.state.fees}
                style={style.feesTextInput}
                placeholder='Enter Fees'
                keyboardType='decimal-pad'
                placeholderTextColor='#a7a7a7'
                autoCapitalize='none'
              // onFocus={this.onFocus.bind(this)}
              // onBlur={this.onBlur.bind(this)}
              >
              </TextInput>
              <View style={style.ftmTextContainer}>
                <Text style={style.ftmText}>0.0000002  FTM</Text>
              </View>
            </View>
            <View style={style.speedContainer}>
              <View>
                <View style={style.slowBar}>
                </View>
                <Text style={style.slowText}>Slow</Text>
              </View>
              <View>
                <View style={style.normalBar}>
                </View>
                <Text style={style.normalText}>Normal</Text>
              </View>
              <View>
                <View style={style.fastBar}>
                </View>
                <Text style={style.fastText}>Fast</Text>
              </View>
            </View>
          </View> */}

          <View style={style.addressContainer}>
            <Text style={style.addressText}>Memo</Text>
            <View style={style.addressTextInputContainer}>
              <TextInput
                onChangeText={memo => this.setState({ memo })}
                value={this.state.memo}
                style={style.addressTextInput}
                placeholder="Enter Memo"
                placeholderTextColor="#a7a7a7"
                onFocus={() => this.onFocus()}
                onBlur={() => this.onBlur()}
                autoCapitalize="none"
              />
            </View>
          </View>
          {/* </View> */}

          <View style={style.bottomSendContainer}>
            <Button
              text="Send"
              buttonStyle={{ backgroundColor: '#EEBD12', alignSelf: 'center', height: 50 }}
              textStyle={{ color: '#000', fontWeight: 'normal' }}
              onPress={() => this.handleSendMoney()}
            />
          </View>
        </ScrollView>
        {this.state.openSortMenu && (
          <View
            style={{ width: deviceWidth, height: deviceHeight, zIndex: 1, position: 'absolute' }}
          />
        )}
        {this.state.openSortMenu && (
          <SortMenuCard
            handleSortMenu={item => this.handleSortMenu(item)}
            data={this.state.data}
            type="withDraw"
            index={this.state.index}
          />
        )}
      </ViewUse>
    );
  }
}

WithdrawScreen.propTypes = {
  navigation: PropTypes.object,
};
