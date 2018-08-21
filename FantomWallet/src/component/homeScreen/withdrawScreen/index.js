import React, { Component } from 'react';
import {ScrollView, View, Text, TextInput, TouchableOpacity,Platform,KeyboardAvoidingView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import style from './style';
import SortMenuCard from '../../../general/sortMenuCard/index';
import { Dimensions } from 'react-native';
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
/**
 * To Display WithdrawTab related tasks
 */
export default class WithdrawScreen extends Component {
  state = {
    name: '',
    openSortMenu: false,
    data: [{ id: 0, key: 'FANTOM', sc: 'FTM' }, { id: 1, key: 'FANTOM POINT', sc: 'FTM PT' }, { id: 2, key: 'ETHEREUM', sc: 'ETH' }],
    val: 'FTM',
    index: 0
  }
  onTextFieldFocus() {
    let scrollValue = (Platform.OS === 'ios') ? 60 : 200
    setTimeout(() => {
      this.scrollView.scrollTo({ x: 0, y: scrollValue, animated: true })
    }, 10);
  }
  onTextFieldBlur() {
    let scrollValue = (Platform.OS === 'ios') ? 0 : 0
    setTimeout(() => {
      this.scrollView.scrollTo({ x: 0, y: scrollValue, animated: true })
    }, 10);
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
  render() {
    return (
      <View style={style.withdrawViewStyle}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Send</Text>
        </View>
        <ScrollView ref={(scroll) => this.scrollView = scroll}>
       
        <View style={{ marginTop: deviceHeight * 0.02 }}>
          <Text style={{ fontWeight: 'bold' }}>Address to send</Text>
          <View style={{
            flexDirection: 'row', width: deviceWidth - 32, height: deviceHeight * 0.06, marginTop: deviceHeight * 0.005,
            paddingLeft: 10, paddingRight: 10, borderWidth: 1, borderColor: 'rgb(93,93,93)', alignItems: 'center'
          }}>
            <TextInput
              onChangeText={(address) => this.setState({ address })}
              value={this.state.address}
              style={{ flex: 1, fontSize: 16, color: '#a7a7a7' }}
              placeholder='Enter Address'
              placeholderTextColor='#a7a7a7'
              onFocus={() => this.onTextFieldFocus()}
              onBlur={() => this.onTextFieldBlur()}
            />
          </View>
        </View>
        <View style={{ marginTop: deviceHeight * 0.02 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontWeight: 'bold' }}>Price</Text>
            <Text style={{ fontWeight: 'bold' }}>Current price:12,0000 Won</Text>
          </View>
          <View style={{
            flexDirection: 'row', width: deviceWidth - 32, marginTop: deviceHeight * 0.005, height: deviceHeight * 0.06, paddingLeft: 10, paddingRight: 10,
            borderWidth: 1, borderColor: 'rgb(93,93,93)', alignItems: 'center'
          }}>
            <TextInput
              onChangeText={(amount) => this.setState({ amount })}
              value={this.state.amount}
              style={{ flex: 1, fontSize: 16, color: '#a7a7a7' }}
              placeholder='Enter Amount'
              placeholderTextColor='#a7a7a7'
              onFocus={() => this.onTextFieldFocus()}
              onBlur={() => this.onTextFieldBlur()}
            />
            <View style={{ width: deviceWidth*0.1, }}>
              <Text>{this.state.val}</Text>
            </View>
            <TouchableOpacity onPress={() => this.handleSortMenu()}><Icon name='arrow-drop-down' size={24} color='black' /></TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: deviceHeight * 0.01, alignItems: 'center' }}>
            <Text>Available: 12,000000 FTM </Text>
            <View style={{ borderWidth: 1, borderColor: 'rgb(143,143,143)', borderRadius: 3, paddingHorizontal: 8, backgroundColor: 'rgb(222,222,222)', }}>
              <Text>all</Text>
            </View>
          </View>
        </View>
        <View style={{ marginTop: deviceHeight * 0.04 }}>
          <Text style={{ fontWeight: 'bold' }}>Fees</Text>
          <View style={{
            marginTop: 5, flexDirection: 'row', fontSize: 16, height: deviceHeight * 0.06, paddingLeft: 10, color: '#a7a7a7', borderWidth: 1,
            borderColor: 'rgb(93,93,93)'
          }}>
            <TextInput
              onChangeText={(fees) => this.setState({ fees })}
              value={this.state.fees}
              style={{ flex: 1 }}
              placeholder='Enter Fees'
              placeholderTextColor='#a7a7a7'
              onFocus={() => this.onTextFieldFocus()}
              onBlur={() => this.onTextFieldBlur()}
            >
            </TextInput>
            <View style={{ width: 120, justifyContent: 'center' }}>
              <Text style={{ fontSize: 12 }}>0.0000002  FTM</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: deviceHeight * 0.01 }}>
            <View>
              <View style={{ backgroundColor: 'rgb(165,165,165)', width: deviceWidth * 0.27, height: deviceHeight * 0.01 }}>
              </View><Text style={{ textAlign: 'center' }}>Slow</Text></View>
            <View>
              <View style={{ backgroundColor: 'rgb(79,79,79)', width: deviceWidth * 0.27, height: deviceHeight * 0.01 }}>
              </View><Text style={{ textAlign: 'center' }}>Normal</Text></View>
            <View>
              <View style={{ backgroundColor: 'rgb(0,0,0)', width: deviceWidth * 0.27, height: deviceHeight * 0.01 }}>
              </View><Text style={{ textAlign: 'center' }}>Fast</Text></View>
          </View>
        </View>
        <View style={{ marginTop: deviceHeight * 0.02 }}>
          <Text style={{ fontWeight: 'bold' }}>Memo</Text>
          <View style={{ marginTop: 5 }}>
            <TextInput
              onChangeText={(memo) => this.setState({ memo })}
              value={this.state.memo}
              style={{ fontSize: 16, height: deviceHeight * 0.06, paddingLeft: 10, color: '#a7a7a7', borderWidth: 1, borderColor: 'rgb(93,93,93)' }}
              placeholder='Enter Memo'
              placeholderTextColor='#a7a7a7'
              onFocus={() => this.onTextFieldFocus()}
              onBlur={() => this.onTextFieldBlur()}
            />
          </View>
        </View>
       
       
        </ScrollView>
        <View style={{
          alignItems: 'center', width: deviceWidth * 0.7, backgroundColor: 'rgb(233,177,18)', alignSelf: 'center',
          position: 'absolute', bottom: deviceHeight * 0.02, padding: deviceHeight * 0.015
        }}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}><Text style={{ fontSize: deviceHeight * 0.03 }}>Send</Text></TouchableOpacity>
        </View>
        {
          this.state.openSortMenu && <SortMenuCard handleSortMenu={(item) => this.handleSortMenu(item)} data={this.state.data} type={'withDraw'}
            index={this.state.index} />
        }
      </View>
    );
  }
}