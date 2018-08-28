import React, { Component } from 'react';
import {
  ScrollView, View, Text, TextInput, TouchableOpacity,
  Keyboard, KeyboardAvoidingView, Dimensions, Image
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import SortMenuCard from '../../../general/sortMenuCard/index';
import Button from '../../../general/button/';

import style from './style';
import qrCode from '../../../images/QR_code.png';
import user from '../../../images/user.png'
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

/**
 * To Display WithdrawTab related tasks
 */

export default class WithdrawScreen extends Component {
  state = {
    name: '',
    openSortMenu: false,
    data: [
      { id: 0, key: 'FANTOM', sc: 'FTM' }, { id: 1, key: 'FANTOM POINT', sc: 'FP' },
      { id: 2, key: 'ETHEREUM', sc: 'ETH' }
    ],
    val: 'FTM',
    index: 0,
    address: '',
    amount: '',
    fees: '',
    memo: ''
  }

  handleSortMenu(item) {
    this.setState({
      openSortMenu: !this.state.openSortMenu
    })
    if (item && item.sc) {
      this.setState({
        val: item.sc,
        index: item.id
      })
    }
  }

  handleClickOnScreen() {
    if (this.state.openSortMenu) {
      this.setState({
        openSortMenu: !this.state.openSortMenu
      })
    }
  }
  handleSendMoney() {
    const { address, amount, fees, memo } = this.state;
    const coin = this.state.val;
    if (!coin || !address || !amount || !fees || !memo) {
      console.warn('empty fields');
      return
    }
    this.props.navigation.navigate('SendMoney', { address: address,amount:amount, coin: coin, memo: memo, fees: fees });
  }

  render() {
    const dynamicStyle = this.state.openSortMenu ? { opacity: 0.2, } : '';
    return (
      <TouchableOpacity activeOpacity={1} style={style.withdrawViewStyle} onPress={() => this.handleClickOnScreen()}>
        {/* <KeyboardAvoidingView behavior="padding" style={[{ flex: 1 }, dynamicStyle]}> */}
        <ScrollView ref={(scroll) => this.scrollView = scroll} showsVerticalScrollIndicator={false} >
          <View style={style.sendContainer}>
            <Text style={style.sendText}>Send</Text>
          </View>


          <View style={style.addressContainer}>
            <Text style={style.addressText}>Address to send</Text>
            <View style={style.addressTextInputContainer}>
              <TextInput
                onChangeText={(address) => this.setState({ address })}
                value={this.state.address}
                style={style.addressTextInput}
                placeholder='Enter Address'
                placeholderTextColor='#a7a7a7'
                autoCapitalize='none'
              />
              <View style={{ flexDirection: 'row', padding: 5, justifyContent: 'space-around', width: '25%' }}>

                <Image source={qrCode} style={{ width: 30, height: 30 }} />
                <Image source={user} style={{ width: 30, height: 30 }} />
              </View>
            </View>
          </View>

          <View style={style.priceContainer}>
            <View style={style.priceTextContainer}>
              <Text style={style.price}>Price</Text>
              <Text style={style.price}>Current price:12,0000 Won</Text>
            </View>
            <View style={style.addressTextInputContainer}>
              <TextInput
                onChangeText={(amount) => this.setState({ amount })}
                value={this.state.amount}
                style={style.priceTextInput}
                placeholder='Enter Amount'
                keyboardType='decimal-pad'
                placeholderTextColor='#a7a7a7'
                autoCapitalize='none'
              />
              <TouchableOpacity onPress={() => this.handleSortMenu()} style={{ flexDirection: 'row', padding: 2 }}>
                <View style={style.sc}>
                  <Text>{this.state.val}</Text>
                </View>
                <Icon name='arrow-drop-down' size={24} color='black' /></TouchableOpacity>
            </View>
            <View style={style.availableContainer}>
              <Text>Available: 12,000000 FTM </Text>
              <View style={style.allContainer}>
                <Text>all</Text>
              </View>
            </View>
          </View>

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
          </View>

          <View style={style.addressContainer}>
            <Text style={style.addressText}>Memo</Text>
            <View style={style.addressTextInputContainer}>
              <TextInput
                onChangeText={(memo) => this.setState({ memo })}
                value={this.state.memo}
                style={style.addressTextInput}
                placeholder='Enter Memo'
                placeholderTextColor='#a7a7a7'
                onFocus={() => this.scrollView.scrollTo({ x: 0, y: 100, animated: true })}
                autoCapitalize='none'
              />
            </View>
          </View>


          <View style={style.bottomSendContainer}>
            <Button text='Send'
              buttonStyle={{ backgroundColor: '#EEBD12', alignSelf: 'center', height: 50 }}
              textStyle={{ color: '#000', fontWeight: 'normal' }}
              onPress={this.handleSendMoney.bind(this)} />
          </View>
          {
            this.state.openSortMenu && <View style={{ width: deviceWidth, height: deviceHeight, zIndex: 1, position: 'absolute' }}></View>
          }
          {
            this.state.openSortMenu && <SortMenuCard handleSortMenu={(item) => this.handleSortMenu(item)} data={this.state.data} type={'withDraw'}
              index={this.state.index} />
          }
        </ScrollView>

        {/* </KeyboardAvoidingView> */}

      </TouchableOpacity>
    );
  }
}