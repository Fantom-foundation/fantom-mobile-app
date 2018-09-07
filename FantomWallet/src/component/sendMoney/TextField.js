import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, TextInput } from 'react-native';
import { AsyncStorage } from "react-native"

import Header from '../../general/header/index';
import styles from './style';
import Button from '../../general/button/index';
import InputBox from '../../general/inputBox/index';
import '../../../global';
import Web3 from 'web3';
import EthereumJSWallet from 'ethereumjs-wallet';
import Hdkey from 'hdkey';
import EthUtil from 'ethereumjs-util';
// Method of generation taken from: https://medium.com/bitcraft/so-you-want-to-build-an-ethereum-hd-wallet-cb2b7d7e4998;

class TextField extends Component {
  constructor(props) {
    super(props)
    let textValue

    if (this.props.textValue) {
      textValue = this.props.textValue
    }
    this.state = {
      text: textValue
    }
  }


  render() {
    let url = '', rightSideText = ''
    if (this.props.isimagePresent && this.props.imgUrl && this.props.imgUrl !== '') {
      url = this.props.imgUrl;
    }
    if (this.props.isTextPresent && this.props.rightTextValue && this.props.rightTextValue !== '') {
      rightSideText = this.props.rightTextValue
    }

    return (
      <View style={styles.mainTextFieldView}>
        <TextInput
          style={[styles.inputFieldStyle, this.props.textinputStyle]}
          onChangeText={(text) => this.setState({ text })}
          placeholder={this.props.placeHolderText}
          value={this.props.text}
          placeholderTextColor={'#000'}
          editable={false} selectTextOnFocus={false}
          autoCapitalize='none'
        />
        {
          this.props.isimagePresent && 
          <Image
            source={url}
            style={[styles.additionalViewStyles, this.props.imgStyle]}
            resizeMode='cover'
          />
        }
        {
          this.props.isTextPresent &&
          <View style={styles.additionalViewStyles}>
            <Text numberOfLines={1} style={styles.rightSideTextStyle}>
              {rightSideText}
            </Text>
          </View>
        }
      </View>
    );
  }
}

export default TextField;
