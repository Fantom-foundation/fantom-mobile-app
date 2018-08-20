import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
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
    data:[{key:'FANTOM',sc:'FTM'},{key:'FANTOM POINT',sc:'FTM PT'},{key:'ETHEREUM',sc:'ETH'}],
    val:'FTM'
  }
  onTextFieldFocus() {

  }
  onTextFieldBlur() {

  }
  handleSortMenu(itemSc) {
  
    const SELF = this
  //  this.setState((previousState) => ({ openSortMenu: !previousState.openSortMenu }));
  SELF.setState({
    openSortMenu:!SELF.state.openSortMenu
  })
  this.setState({
    val:itemSc
  })
  }
  
  render() {
    return (
      <View style={style.withdrawViewStyle}>
        <View>
          <Icon name='arrow-back' size={24} color='black' />
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Send</Text>
        </View>
        <View style={{ marginTop: deviceHeight * 0.02 }}>
          <Text style={{ fontWeight: 'bold' }}>Address to send</Text>
          <View style={{ flexDirection: 'row', width: deviceWidth - 32, height: 44, marginTop: 5, paddingLeft: 10, paddingRight: 10, borderWidth: 1, borderColor: 'rgb(93,93,93)', alignItems: 'center' }}>
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
          <View style={{ flexDirection: 'row', width: deviceWidth - 32, marginTop: 5, height: 44, paddingLeft: 10, paddingRight: 10, borderWidth: 1, borderColor: 'rgb(93,93,93)', alignItems: 'center' }}>
            <TextInput
              onChangeText={(amount) => this.setState({ amount })}
              value={this.state.amount}
              style={{ flex: 1, fontSize: 16, color: '#a7a7a7' }}
              placeholder='Enter Amount'
              placeholderTextColor='#a7a7a7'
              onFocus={() => this.onTextFieldFocus()}
              onBlur={() => this.onTextFieldBlur()}
            />
            <View style={{ width: 40, }}>
              <Text>{this.state.val}</Text>
            </View>
            <TouchableOpacity onPress={()=>this.handleSortMenu()}><Icon name='arrow-drop-down' size={24} color='black' /></TouchableOpacity>
          
          </View>
          
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10, alignItems: 'center' }}>
            <Text>Available: 12,000000 FTM </Text>
            <View style={{ borderWidth: 1, borderColor: 'rgb(143,143,143)', borderRadius: 3, paddingHorizontal: 8, backgroundColor: 'rgb(222,222,222)', }}>
              <Text>all</Text>
            </View>
          </View>
        </View>
        <View style={{ marginTop: deviceHeight * 0.04 }}>
          <Text style={{ fontWeight: 'bold' }}>Fees</Text>
          <View style={{ marginTop: 5 }}>
            <TextInput
              onChangeText={(fees) => this.setState({ fees })}
              value={this.state.fees}
              style={{ fontSize: 16, height: 44, paddingLeft: 10, color: '#a7a7a7', borderWidth: 1, borderColor: 'rgb(93,93,93)' }}
              placeholder='Enter Fees'
              placeholderTextColor='#a7a7a7'
              onFocus={() => this.onTextFieldFocus()}
              onBlur={() => this.onTextFieldBlur()}
            />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
            <View><View style={{ backgroundColor: 'rgb(165,165,165)', width: deviceWidth * 0.27, height: 10 }}></View><Text>Slow</Text></View>
            <View><View style={{ backgroundColor: 'rgb(79,79,79)', width: deviceWidth * 0.27, height: 10 }}></View><Text>Normal</Text></View>
            <View><View style={{ backgroundColor: 'rgb(0,0,0)', width: deviceWidth * 0.27, height: 10 }}></View><Text>Fast</Text></View>
          </View>
        </View>
        <View style={{ marginTop: deviceHeight * 0.02 }}>
          <Text style={{ fontWeight: 'bold' }}>Memo</Text>
          <View style={{ marginTop: 5 }}>
            <TextInput
              onChangeText={(memo) => this.setState({ memo })}
              value={this.state.memo}
              style={{ fontSize: 16, height: 44, paddingLeft: 10, color: '#a7a7a7', borderWidth: 1, borderColor: 'rgb(93,93,93)' }}
              placeholder='Enter Memo'
              placeholderTextColor='#a7a7a7'
              onFocus={() => this.onTextFieldFocus()}
              onBlur={() => this.onTextFieldBlur()}
            />
          </View>
        </View>
        <View style={{ alignItems: 'center', width: deviceWidth * 0.7, backgroundColor: 'rgb(233,177,18)', alignSelf: 'center', position: 'absolute', bottom: deviceHeight * 0.02, padding: 15 }}>
          <TouchableOpacity onPress={() => console.log('pressed')}><Text style={{ fontSize: 24 }}>Send</Text></TouchableOpacity>
        </View>
        {
                    this.state.openSortMenu && <SortMenuCard handleSortMenu={(itemSc) => this.handleSortMenu(itemSc)} data={this.state.data} type={'withDraw'} />
                }
      </View>
    );
  }
}