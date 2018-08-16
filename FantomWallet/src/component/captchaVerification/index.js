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
import Hdkey from 'hdkey';
import EthUtil from 'ethereumjs-util';
// Method of generation taken from: https://medium.com/bitcraft/so-you-want-to-build-an-ethereum-hd-wallet-cb2b7d7e4998;

class CaptchaVerification extends Component {
    constructor(props) {
        super(props);
        const { navigation } = this.props;
        const mnemonicWords = navigation.getParam('mnemonicWords', 'NO-ID');
        const seed = navigation.getParam('seed', 'NO-ID');
        console.log('mnemonicWords');
        console.log(mnemonicWords);
        console.log('seed is real');
        console.log(seed);
        this.state = {
          phraseOne: '',
          phraseTwo: '',
          phraseThree: '',
          'seed' : seed
        };
        this.createWallet = this.createWallet.bind(this);
        this.changePhrase= this.changePhrase.bind(this);
    };

    createWallet() {
      const phraseOne = this.state.phraseOne;
      const phraseTwo = this.state.phraseTwo;
      const phraseThree = this.state.phraseThree;
      console.log('seed');
      console.log(this.state.seed);
      const root = Hdkey.fromMasterSeed(this.state.seed);
      console.log(root);
      const masterPrivateKey = root.privateKey.toString('hex');
      const addrNode = root.derive("m/44'/60'/0'/0/0"); //line 1
      const pubKey = EthUtil.privateToPublic(addrNode._privateKey);
      const addr = EthUtil.publicToAddress(pubKey).toString('hex');
      const address = EthUtil.toChecksumAddress(addr);
      const key = {
        'root' : root,
        'masterPrivateKey' : masterPrivateKey,
        'addrNode' : addrNode,
        'pubKey' : pubKey,
        'addr' : addr,
        'address' : address
      };
      console.log(key);
/*
   If using ethereumjs-wallet instead do after line 1:
   const address = addrNode.getWallet().getChecksumAddressString();
*/
      console.log('phraseOne', phraseOne);
    };

    changePhrase (text, phrase){
      const state = this.state;
      state[phrase] = text;
      this.setState(state);
    };

    render() {

        return (
            <View style={style.mainContainerStyle}>

                <Header text='Caption Output' leftButtonIcon='arrow-left' />
                  <View style={style.mid}>
                  <View style={style.generateText}>
                          <Text>Please enter the corresponding phrase out of the 12 back up phrases.</Text>
                      </View>
                        <View style={style.textBox}><InputBox phraseNumber='5' text={this.state.phraseOne} onChangeText={(text) => this.changePhrase(text, 'phraseOne')} /></View>
                        <View style={style.textBox}><InputBox phraseNumber='9' text={this.state.phraseTwo} onChangeText={(text) => this.changePhrase(text, 'phraseTwo')} /></View>
                        <View style={style.textBox}><InputBox phraseNumber='12' text={this.state.phraseThree} onChangeText={(text) => this.changePhrase(text, 'phraseThree')} /></View>
                  </View>
                  <View style={style.footerStyle}>
                      <Button text='Confirm' onPress={this.createWallet} />
                  </View>
              </View>
        );
    }
}

export default CaptchaVerification;
