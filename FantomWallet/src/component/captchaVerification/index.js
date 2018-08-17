import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { LinkButton } from 'general/';
import { AsyncStorage } from "react-native"

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
        this.state = {
          phraseFive: '',
          phraseNine: '',
          phreaseTwelve: '',
          'seed' : navigation.getParam('seed', 'NO-ID'),
          'error' : '',
          'mnemonicWords' : navigation.getParam('mnemonicWords', 'NO-ID')
        };
        this.createWallet = this.createWallet.bind(this);
        this.changePhrase= this.changePhrase.bind(this);
    };

    createWallet() {
      const phraseFive = this.state.phraseFive;
      const phraseNine = this.state.phraseNine;
      const phraseTwelve= this.state.phreaseTwelve;
      // check to make sure entered phrases match up.
      if (phraseFive !== this.state.mnemonicWords[4]){
        this.state.error = 'Phrase five does not match up.';
        console.log(this.state.error);
        return;
      } else if (phraseNine !== this.state.mnemonicWords[8]){
        this.state.error = 'Phrase nine does not match up.';
        console.log(this.state.error);
        return;
      } else if (phraseTwelve !== this.state.mnemonicWords[11]){
        this.state.error = 'Phrase twelve does not match up.';
        console.log(this.state.error);
        return;
      }
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
      // Save masterPrivateKey to device DO NOT USE IN PRODUCTION
      this.saveMasterKey(masterPrivateKey);
      console.log(key);
      this.props.navigation.navigate('HomeScreen');
/*
   If using ethereumjs-wallet instead do after line 1:
   const address = addrNode.getWallet().getChecksumAddressString();
*/
      console.log('phraseFive', phraseFive);
    };

    saveMasterKey = async (masterPrivateKey) => {
      try {
        await AsyncStorage.setItem('masterPrivateKey', masterPrivateKey);
      } catch (error) {
        if (error){
          console.log(error);
        }
        // Error saving data
      }
    };

    changePhrase (text, phrase){
      const state = this.state;
      state[phrase] = text;
      this.setState(state);
    };

    getMasterKey (){
      const masterKeyTest = AsyncStorage.getItem('masterPrivateKey');
      console.log('getMasterKey');
      console.log(masterKeyTest);
    }

    onLeftIconPress = () => {
        console.log('onLeftIconPressonLeftIconPress');
        this.props.navigation.goBack()
    }
    onNavigation(){
        this.props.navigation.navigate('HomeScreen');
    }
   
    render() {

        return (
            <View style={style.mainContainerStyle}>

                <Header text='Caption Output' leftButtonIcon='arrow-back'  onLeftIconPress={this.onLeftIconPress}/>
                  <View style={style.mid}>
                  <View style={style.generateText}>
                          <Text>Please enter the corresponding phrase out of the 12 back up phrases.</Text>
                      </View>
                        <View style={style.textBox}><InputBox phraseNumber='5' text={this.state.phraseFive} onChangeText={(text) => this.changePhrase(text, 'phraseFive')} /></View>
                        <View style={style.textBox}><InputBox phraseNumber='9' text={this.state.phraseNine} onChangeText={(text) => this.changePhrase(text, 'phraseNine')} /></View>
                        <View style={style.textBox}><InputBox phraseNumber='12' text={this.state.phreaseTwelve} onChangeText={(text) => this.changePhrase(text, 'phreaseTwelve')} /></View>
                        <Text onPress={this.getMasterKey}>Get Master Key</Text>
                  </View>
                  <View style={style.footerStyle}>
                      <Button text='Confirm' onPress={this.createWallet} />
                  </View>
              </View>
        );
    }
}

export default CaptchaVerification;
