import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import { LinkButton } from 'general/';
import { AsyncStorage } from "react-native"

import Header from '../../general/header/index';
import style from './style';
import Button from '../../general/button/index';
import TextField from './TextField'


const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
// Method of generation taken from: https://medium.com/bitcraft/so-you-want-to-build-an-ethereum-hd-wallet-cb2b7d7e4998;

class SendMoney extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.state = {
    };
  };

  render() {
    return (
      <View style={style.mainContainerStyle}>
        <Header text='Check Send' leftButtonIcon='arrow-back' onLeftIconPress={this.onLeftIconPress} />
        <View style={style.mid}>
          <View style={[style.textFieldStyle, { marginTop: 40, }]}>
            <TextField
              placeHolderText={'Coin'}
              isimagePresent={true}
              imgUrl={require('../../images/fantom-logo-dark.png')}
              imgStyle={{ width: deviceWidth * 0.2 }}
              textinputStyle={{ width: deviceWidth * 0.55 }}
            />
          </View>
          <View style={style.textFieldStyle}>
            <TextField
              placeHolderText={'Address to send'}
            />
          </View>
          <View style={style.textFieldStyle}>
            <TextField
              placeHolderText={'Price'}
            />
          </View>
          <View style={style.textFieldStyle}>
            <TextField
              placeHolderText={'Fees'}
            />
          </View>
          <View style={style.textFieldStyle}>
            <TextField
              placeHolderText={'Memo'}
              textinputStyle={{ width: deviceWidth * 0.65 }}
              isTextPresent={true}
              rightTextValue={'none'}
            />
          </View>
          <Text style={style.additionalInfoTextStyle}>
            The above information is correct
          </Text>
          <Text style={style.additionalInfoTextStyle}>
            Please check again.
          </Text>
          <View style={{ height: 40 }} />
        </View>
        <View style={style.buttonViewStyle}>
          <Button text="Cancel" buttonStyle={{ width: deviceWidth * 0.5, backgroundColor: '#000' }} onPress={() => this.props.navigation.goBack()} />
          <Button text="Confirm" buttonStyle={{ width: deviceWidth * 0.5, backgroundColor: '#ECB414' }} onPress={() => console.warn('confirm')} />
        </View>
      </View>
    );
  }
}

export default SendMoney;
