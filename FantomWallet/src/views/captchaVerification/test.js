import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Platform,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import Hdkey from 'hdkey';
import EthUtil from 'ethereumjs-util';
import Icon from 'react-native-vector-icons/MaterialIcons';
// Method of generation taken from: https://medium.com/bitcraft/so-you-want-to-build-an-ethereum-hd-wallet-cb2b7d7e4998;
import InputBox from '~/components/general/InputBox';
import Button from '~/components/general/Button';
import style from './style';
import ProgressBar from '~/components/general/ProgressBar';

const deviceHeight = Dimensions.get('window').height;
class CaptchaVerification extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.state = {
      phraseFive: '',
      phraseNine: '',
      phraseTwelve: '',
      seed: navigation.getParam('seed', 'NO-ID'),
      mnemonicWords: navigation.getParam('mnemonicWords', 'NO-ID'),
      error: '',
    };
    this.walletSetup = this.walletSetup.bind(this);
    this.changePhrase = this.changePhrase.bind(this);
  }

  onNavigation() {
    this.props.navigation.navigate('HomeScreen');
  }

  onTextFieldFocus() {
    const scrollValue = Platform.OS === 'ios' ? 80 : 200;
    setTimeout(() => {
      this.scrollView.scrollTo({ x: 0, y: scrollValue, animated: true });
    }, 10);
  }

  onTextFieldBlur() {
    Keyboard.dismiss();
    const scrollValue = Platform.OS === 'ios' ? 0 : 0;
    setTimeout(() => {
      this.scrollView.scrollTo({ x: 0, y: scrollValue, animated: true });
    }, 10);
  }

  walletSetup() {
    if (!this.checkValidation()) {
      return;
    }
    const root = Hdkey.fromMasterSeed(this.state.seed);
    const masterPrivateKey = root.privateKey.toString('hex');
    const addrNode = root.derive("m/44'/60'/0'/0/0"); // line 1
    const pubKey = EthUtil.privateToPublic(addrNode._privateKey); // eslint-disable-line
    // Save masterPrivateKey to device DO NOT USE IN PRODUCTION
    this.saveMasterKey(masterPrivateKey);
    // Save pubKey generation
    this.savePublicKey(pubKey);

    this.props.navigation.navigate('HomeScreen');
    /*
       If using ethereumjs-wallet instead do after line 1:
       const address = addrNode.getWallet().getChecksumAddressString();
    */
  }

  checkValidation() {
    const { phraseFive, phraseNine, phraseTwelve } = this.state;
    // check to make sure entered phrases match up.
    if (phraseFive !== this.state.mnemonicWords[4]) {
      this.state.errorMessage = 'Phrase five does not match up.';
      return false;
    }
    if (phraseNine !== this.state.mnemonicWords[8]) {
      this.state.errorMessage = 'Phrase nine does not match up.';
      return false;
    }
    if (phraseTwelve !== this.state.mnemonicWords[11]) {
      this.state.errorMessage = 'Phrase twelve does not match up.';
      return false;
    }
    return true;
  }

  changePhrase(text, phrase) {
    const { state } = this;
    state[phrase] = text;
    this.setState(state);
  }

  render() {
    return (
      <KeyboardAvoidingView style={style.mainContainerStyle}>
        <View style={style.mid}>
          <View style={style.progressContainer}>
            <ProgressBar completed="2" remaining="3" />
          </View>

          <View style={style.arrowContainer}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <ScrollView style={{ height: Platform.OS === 'ios' ? deviceHeight : deviceHeight - 24 }}>
            <View style={style.headerContainer}>
              <Text style={style.captchaText}>Captcha Verification</Text>
              <View style={style.subHeadContainer}>
                <Text style={style.pleaseText}>Please enter the corresponding</Text>
                <Text style={style.phraseText}>phrase out of the 12 back-up phrases</Text>
              </View>
            </View>

            <View style={style.textBoxContainer}>
              <View style={style.textBox}>
                <InputBox
                  phraseNumber="Enter phrase 5"
                  text={this.state.phraseFive}
                  onChangeText={text => this.changePhrase(text, 'phraseFive')}
                  // onFocus={() => this.onTextFieldFocus()}
                  // onBlur={() => this.onTextFieldBlur()}
                />
                {this.state.phraseFive !== '' &&
                this.state.phraseFive !== this.state.mnemonicWords[4] ? (
                  <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <Text style={{ color: 'red' }}>Phrase five does not match up.</Text>
                  </View>
                ) : null}
              </View>
              <View style={style.textBox}>
                <InputBox
                  phraseNumber="Enter phrase 9"
                  text={this.state.phraseNine}
                  onChangeText={text => this.changePhrase(text, 'phraseNine')}
                  // onFocus={() => this.onTextFieldFocus()}
                  // onBlur={() => this.onTextFieldBlur()}
                />
                {this.state.phraseNine !== '' &&
                this.state.phraseNine !== this.state.mnemonicWords[8] ? (
                  <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <Text style={{ color: 'red' }}>Phrase nine does not match up.</Text>
                  </View>
                ) : null}
              </View>
              <View style={style.textBox}>
                <InputBox
                  phraseNumber="Enter phrase 12"
                  text={this.state.phraseTwelve}
                  onChangeText={text => this.changePhrase(text, 'phraseTwelve')}
                  // onFocus={() => this.onTextFieldFocus()}
                  // onBlur={() => this.onTextFieldBlur()}
                />
                {this.state.phraseTwelve !== '' &&
                this.state.phraseTwelve !== this.state.mnemonicWords[11] ? (
                  <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <Text style={{ color: 'red' }}>Phrase twelve does not match up.</Text>
                  </View>
                ) : null}
              </View>
            </View>

            {/* <View style={{ alignSelf: 'center' }}>
            <Text onPress={this.getMasterKey}>Get Master Key</Text>
          </View> */}
          </ScrollView>
          <View style={style.footerStyle}>
            <Button
              text="Verify"
              onPress={this.walletSetup}
              buttonStyle={{ backgroundColor: 'black' }}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
export default CaptchaVerification;
