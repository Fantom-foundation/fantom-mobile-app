import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Platform,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import '../../../global';
import _ from 'lodash';
import Hdkey from 'hdkey';
import EthUtil from 'ethereumjs-util';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import * as KeyAction from '../../redux/keys/action';
// Method of generation taken from: https://medium.com/bitcraft/so-you-want-to-build-an-ethereum-hd-wallet-cb2b7d7e4998;
import Button from '../../general/button/index';
import style from './style';
import ProgressBar from '../../general/progressBar/index';
import BackgroundFantomIcon from '../../images/BackgroundIcon.png';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '../../common/constants';
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
      // error: '',
      verifyMnemonic: [],
    };
    this.walletSetup = this.walletSetup.bind(this);
    // this.changePhrase = this.changePhrase.bind(this);
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
    let verifyMnemonicArr = [];
    if (this.state.verifyMnemonic.length > 0) {
      const arr = this.state.verifyMnemonic;
      arr.map(obj => {
        verifyMnemonicArr.push(obj.data);
        return null;
      });
    }
    const isSucess = _.isEqual(this.state.mnemonicWordsArray, verifyMnemonicArr);

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

  // /**
  //  * changePhrase()  : on change handler for text fields.
  //  * @param { String } text : Contains captcha text phrase.
  //  * @param {*} phrase : Contains position value of captcha phrase in generated captcha codes.
  //  */
  // changePhrase(text, phrase) {
  //   const { state } = this;
  //   state[phrase] = text;
  //   this.setState(state);
  // }

  verifyWords(data, index) {
    // Called on selection button from bottom buttons
    const { verifyMnemonic, mnemonicWords } = this.state;
    const appendWord = verifyMnemonic;
    let updatedMnemonicsArray = mnemonicWords;

    if (data) {
      updatedMnemonicsArray.map(word => {
        if (word === data) {
          updatedMnemonicsArray.splice(updatedMnemonicsArray.indexOf(word), 1, '');
        }
        return null;
      });
    }
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
    // Unselect the selected Values
    const updateMnemonicsArray = this.state.mnemonicWords;
    const verifyWord = this.state.verifyMnemonic;
    if (val) {
      updateMnemonicsArray.splice(val.index, 1, val.data);

      if (verifyWord && verifyWord.length > 0) {
        verifyWord.map((obj, i) => {
          if (obj.data === val.data && obj.index === val.index) {
            verifyWord.splice(i, 1);
          }
          return null;
        });
      }
      this.setState({
        mnemonicWords: updateMnemonicsArray,
        verifyMnemonic: verifyWord,
      });
    }
  }

  renderMnemonicValue() {
    // Selected mnemonics container
    const mnemonicArr = this.state.verifyMnemonic;
    let emptySelectedArr = false;
    if (mnemonicArr.length === 0) {
      emptySelectedArr = true;
    }
    return (
      <View style={[style.textContainer, { minHeight: emptySelectedArr ? 80 : 0 }]}>
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
    // Unselected mnemonics container
    const { mnemonicWords } = this.state;
    if (mnemonicWords) {
      return mnemonicWords.map((data, index) => {
        const key = index;
        if (data === '') {
          return <View key={key} style={style.selectedTextContainer} />;
        }
        let textValue = data.charAt(0).toUpperCase() + data.slice(1);
        return (
          <TouchableOpacity
            key={key}
            style={style.mnemonicBtn}
            onPress={() => this.verifyWords(data, index)}
          >
            <Text style={style.mnemonicBtnText}>{textValue}</Text>
          </TouchableOpacity>
        );
      });
    }
    return null;
  }

  renderInnerContainer() {
    return (
      <ScrollView>
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

        {this.state.mnemonicWords && (
          <View style={{ alignItems: 'center' }}>
            <Text style={style.orderTextStyle}>Please tap each word in the correct order</Text>
          </View>
        )}
        <View style={style.mnemonicBtnMainView}>{this.renderMnemonicBtn()}</View>
        <View style={{ height: DEVICE_HEIGHT * 0.12 }} />
      </ScrollView>
    );
  }

  render() {
    const behaviour = Platform.OS === 'ios' ? 'padding' : null;
    return (
      <KeyboardAvoidingView behavior={behaviour} style={style.mainContainerStyle}>
        <View style={style.mid}>
          <View style={style.progressContainer}>
            <ProgressBar completed="2" remaining="0" />
          </View>
          {/* Go Back icon */}
          <View style={style.arrowContainer}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Icon name="chevron-left" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          {/* Background Image */}
          <Image
            style={style.backgroundImageStyle}
            source={BackgroundFantomIcon}
            resizeMode="contain"
          />
          {this.renderInnerContainer()}
        </View>
        {/* Button container */}
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
