import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Platform,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import '../../../global';
import _ from 'lodash';
import Hdkey from 'hdkey';
import EthUtil from 'ethereumjs-util';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import * as KeyAction from '../../redux/keys/action';
// Method of generation taken from: https://medium.com/bitcraft/so-you-want-to-build-an-ethereum-hd-wallet-cb2b7d7e4998;
import InputBox from '../../general/inputBox/index';
import Button from '../../general/button/index';
import style from './style';
import ProgressBar from '../../general/progressBar/index';
/**
 * CaptchaVerification: This component is meant for authenticating user with captcha verification,
 *  based secret codes generated in CaptionOutput.
 */
class CaptchaVerification extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    let shuffledMnemonics = navigation.getParam('mnemonicWords', 'NO-ID');
    if (shuffledMnemonics) {
      shuffledMnemonics = _.shuffle(navigation.getParam('mnemonicWords', 'NO-ID'));
    }

    this.state = {
      phraseFive: '',
      phraseNine: '',
      phraseTwelve: '',
      seed: navigation.getParam('seed', 'NO-ID'),
      mnemonicWords: shuffledMnemonics,
      mnemonicWordsArray: [].concat(navigation.getParam('mnemonicWords', 'NO-ID')),
      error: '',
      verifyMnemonic: [],
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

  /**
   * walletSetup() : This function verifies the user and generates a unique masterPrivateKey for that user.
   *  Then navigate user to HomeScreen.
   */
  walletSetup() {
    console.log(this.state.mnemonicWordsArray, '1 array');
    console.log(this.state.verifyMnemonic, '2 array');
    const isSucess = _.isEqual(this.state.mnemonicWordsArray, this.state.verifyMnemonic.data);
    console.log(isSucess, 'verifyData');
    if (!isSucess) {
      return;
    }
    const root = Hdkey.fromMasterSeed(this.state.seed);
    const masterPrivateKey = root.privateKey.toString('hex');
    const addrNode = root.derive("m/44'/60'/0'/0/0"); // line 1
    const pubKey = EthUtil.privateToPublic(addrNode._privateKey); // eslint-disable-line
    const addr = EthUtil.publicToAddress(pubKey).toString('hex');
    const address = EthUtil.toChecksumAddress(addr);

    const hexPrivateKey = EthUtil.bufferToHex(addrNode._privateKey); // eslint-disable-line
    // const bufferAgain = EthUtil.toBuffer(hexPrivateKey);
    // Save masterPrivateKey to device DO NOT USE IN PRODUCTION
    this.props.setKeys(masterPrivateKey, address, hexPrivateKey);
    // Save pubKey generation

    this.props.navigation.navigate('HomeScreen');
    /*
       If using ethereumjs-wallet instead do after line 1:
       const address = addrNode.getWallet().getChecksumAddressString();
    */
  }

  /**
   * checkValidation() :  This function is meant to check that captcha entered by user is valid or not.
   *    If invalid then error message is displayed.
   */
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

  /**
   * changePhrase()  : on change handler for text fields.
   * @param { String } text : Contains captcha text phrase.
   * @param {*} phrase : Contains position value of captcha phrase in generated captcha codes.
   */
  changePhrase(text, phrase) {
    const { state } = this;
    state[phrase] = text;
    this.setState(state);
  }

  verifyWords(data, index) {
    const { verifyMnemonic, mnemonicWords } = this.state;
    const appendWord = verifyMnemonic;
    let updatedMnemonicsArray = mnemonicWords;

    if (data) {
      updatedMnemonicsArray.map(word => {
        if (word === data) {
          updatedMnemonicsArray.splice(updatedMnemonicsArray.indexOf(word), 1);
        }
        return null;
      });
    }
    console.log(updatedMnemonicsArray, '123');

    if (appendWord) {
      const appendData = {
        data,
        index,
      };
      appendWord.push(appendData);
      this.setState({
        verifyMnemonic: appendWord,
      });
    } else {
      const appendData = {
        data,
        index,
      };
      this.setState({
        verifyMnemonic: appendData,
      });
    }
  }

  resetWords(val) {
    const updateMnemonicsArray = this.state.mnemonicWords;
    const verifyWord = this.state.verifyMnemonic;
    if (val) {
      updateMnemonicsArray.splice(val.index, 0, val.data);
      verifyWord.splice(verifyWord.indexOf(val.data, 1));
      this.setState({
        mnemonicWords: updateMnemonicsArray.join().split(','),
      });
    }
  }

  renderMnemonicValue() {
    const mnemonicArr = this.state.verifyMnemonic;
    console.log(mnemonicArr, 'mnemonicArr');
    return (
      <View style={style.textContainer}>
        {mnemonicArr.map((val, i) => {
          let textValue = val.data.charAt(0).toUpperCase() + val.data.slice(1); // Capitalize first alphabet of word
          return (
            <TouchableOpacity
              key={i}
              style={style.mnemonicBtn}
              onPress={() => this.resetWords(val)}
            >
              <Text style={{ color: '#fff' }}>{textValue}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  renderMnemonicBtn() {
    const { mnemonicWords } = this.state;
    debugger;
    if (mnemonicWords) {
      return mnemonicWords.map((data, index) => {
        const key = index;
        return (
          <TouchableOpacity
            key={key}
            style={style.mnemonicBtn}
            onPress={() => this.verifyWords(data, index)}
          >
            <Text style={style.mnemonicBtnText}>{data}</Text>
          </TouchableOpacity>
        );
      });
    }
    return null;
  }

  render() {
    const behaviour = Platform.OS === 'ios' ? 'padding' : null;
    console.log(this.state.mnemonicWordsArray, 'render');
    const { mnemonicWords, verifyMnemonic } = this.state;

    return (
      <KeyboardAvoidingView behavior={behaviour} style={style.mainContainerStyle}>
        <ScrollView>
          <View style={style.mid}>
            <View style={style.progressContainer}>
              <ProgressBar completed="2" remaining="0" />
            </View>

            <View style={style.arrowContainer}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Icon name="chevron-left" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
            <View style={style.headerContainer}>
              <Text style={style.captchaText}>Captcha Verification</Text>
              <View style={style.subHeadContainer}>
                <Text style={style.pleaseText}>
                  Please enter the corresponding phrase out of the 12 back-up phrases
                </Text>
                {/* <Text style={style.phraseText}>phrase out of the 12 back-up phrases</Text> */}
              </View>
            </View>
            <View style={style.displayMnemonicView}>
              <Text style={style.backupPhrase}>Let's verify your backup phrase</Text>
              {this.renderMnemonicValue()}
            </View>
            {/* <View style={style.textBoxContainer}>
              <View style={style.textBox}>
                <InputBox
                  phraseNumber="Enter phrase 5"
                  text={this.state.phraseFive}
                  onChangeText={text => this.changePhrase(text, 'phraseFive')}
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
                />
                {this.state.phraseTwelve !== '' &&
                this.state.phraseTwelve !== this.state.mnemonicWords[11] ? (
                  <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <Text style={{ color: 'red' }}>Phrase twelve does not match up.</Text>
                  </View>
                ) : null}
              </View>
            </View> */}

            {/* <View style={{ alignSelf: 'center' }}>
            <Text onPress={this.getMasterKey}>Get Master Key</Text>
          </View> */}

            {this.state.mnemonicWords && (
              <Text style={style.orderTextStyle}>Please tap each word in the correct order</Text>
            )}
            <View style={style.mnemonicBtnMainView}>{this.renderMnemonicBtn()}</View>
          </View>
          <View style={style.seperatotView} />
        </ScrollView>
        <View style={style.footerStyle}>
          <Button
            text="Verify"
            onPress={this.walletSetup}
            buttonStyle={{ backgroundColor: 'rgb(0,177,251)' }}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  setMasterKey: key => {
    dispatch({ type: KeyAction.MASTER_KEY, key });
  },
  setPublicKey: key => {
    dispatch({ type: KeyAction.PUBLIC_KEY, key });
  },
  setKeys: (masterKey, publicKey, privateKey) => {
    dispatch({ type: KeyAction.MASTER_PUBLIC_PRIVATE_KEY, masterKey, publicKey, privateKey });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CaptchaVerification);
