import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { LinkButton } from 'general/';
import Header from '../../general/header/index';
import style from './style';
import Button from '../../general/button/index';
import InputBox from '../../general/inputBox/index';
import '../../../global';
import Web3 from 'web3';
import EthereumJSWallet from 'ethereumjs-wallet';

class CaptchaVerification extends Component {
    constructor(props) {
        super(props);
        const { navigation } = this.props;
        const mnemonicWords = navigation.getParam('mnemonicWords', 'NO-ID');
        console.log('mnemonicWords');
        console.log(mnemonicWords);
        this.state = {
          phraseOne: '',
          phraseTwo: '',
          phraseThree: ''
        };
        this.createWallet = this.createWallet.bind(this);
        this.changePhrase= this.changePhrase.bind(this);
    };

    createWallet() {
      console.log('test');
    };

    changePhrase (text, phrase){
      if (text === 1 ) {
        this.state.phraseOne = phrase;
      } else if (text === 2) {
        this.state.phraseTwo = phrase;
      } else if (text === 3) {
        this.state.phraseThree = phrase;
      }
    };

    render() {

        return (
            <View style={style.mainContainerStyle}>

                <Header text='Caption Output' leftButtonIcon='arrow-left' />
                  <View style={style.mid}>
                  <View style={style.generateText}>
                          <Text>Please enter the corresponding phrase out of the 12 back up phrases.</Text>
                      </View>
                        <View style={style.textBox}><InputBox phraseNumber='5' text={this.state.phraseOne}  /></View>
                        <View style={style.textBox}><InputBox phraseNumber='9' text={this.state.phraseTwo}  /></View>
                        <View style={style.textBox}><InputBox phraseNumber='12' text={this.state.phraseThree}  /></View>
                  </View>
                  <View style={style.footerStyle}>
                      <Button text='Confirm' onPress={this.createWallet} />
                  </View>
              </View>
        );
    }
}

export default CaptchaVerification;
