import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import _ from 'lodash';
import Hdkey from 'hdkey';
import EthUtil from 'ethereumjs-util';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import * as KeyAction from '~/redux/keys/action';
// Method of generation taken from: https://medium.com/bitcraft/so-you-want-to-build-an-ethereum-hd-wallet-cb2b7d7e4998;
import Button from '~/components/general/Button';
import ProgressBar from '~/components/general/ProgressBar';
import style from './style';
import BackgroundFantomIcon from '~/images/BackgroundIcon.png';
import { DEVICE_HEIGHT } from '~/common/constants';
/**
 * CaptchaVerification: This component is meant for authenticating user with captcha verification,
 *  based secret codes generated in CaptionOutput.
 */
class CaptchaVerification extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const mnemonic = navigation.getParam('mnemonic', 'NO-ID');
    let shuffledMnemonics = _.shuffle(mnemonic).map((word, index) => ({
      name: word,
      index,
      isClickable: true,
    }));

    this.state = {
      seed: navigation.getParam('seed', 'NO-ID'),
      mnemonic,
      shuffledMnemonics,
      verifyMnemonic: [],
    };
  }

  onNavigation() {
    this.props.navigation.navigate('HomeScreen');
  }

  /**
   * handleVerify() : This function verifies the user and generates a unique masterPrivateKey for that user.
   *  Then navigate user to HomeScreen.
   */
  handleVerify = () => {
    const { verifyMnemonic, mnemonic } = this.state;
    if (!verifyMnemonic) return;

    const arr = this.state.verifyMnemonic;
    const verifyMnemonicArr = arr.map(obj => obj.name);

    const isSucess = _.isEqual(mnemonic, verifyMnemonicArr);

    if (!isSucess) {
      // 'Phrase five does not match up.'
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
  };

  handleShuffledWord(name, index) {
    const { verifyMnemonic, shuffledMnemonics } = this.state;

    const updatedMnemonicsArray = shuffledMnemonics.map(item => ({
      ...item,
      isClickable: item.name !== name ? item.isClickable : false,
    }));

    this.setState({
      verifyMnemonic: [...verifyMnemonic, { name, index, isClickable: false }],
      shuffledMnemonics: updatedMnemonicsArray,
    });
  }

  resetWords(val) {
    // Unselect the selected Values
    const updateMnemonicsArray = this.state.shuffledMnemonics;
    const verifyWord = this.state.verifyMnemonic;
    if (val) {
      let dataObj = { name: val.name, index: val.index, isClickable: !val.isClickable };
      updateMnemonicsArray.splice(val.index, 1, dataObj);

      if (verifyWord && verifyWord.length > 0) {
        verifyWord.map((obj, i) => {
          if (obj.name === val.name && obj.index === val.index) {
            verifyWord.splice(i, 1);
          }
          return null;
        });
      }
      this.setState({
        shuffledMnemonics: updateMnemonicsArray,
        verifyMnemonic: verifyWord,
      });
    }
  }

  renderMnemonicValue() {
    // Selected mnemonics container
    const mnemonicArr = this.state.verifyMnemonic;
    return (
      <View style={style.textContainer}>
        {mnemonicArr.map((val, i) => {
          let textValue = val.name; // Capitalize first alphabet of word
          return (
            <TouchableOpacity
              key={i}
              style={[style.mnemonicBtn, { margin: 10 }]}
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
    const { shuffledMnemonics } = this.state;
    return shuffledMnemonics.map(({ name, isClickable }, index) => {
      let textValue = name;
      return (
        <View
          key={`${index}_${name}`}
          style={{
            borderWidth: !isClickable ? 1 : 1,
            borderColor: !isClickable ? 'rgb(0,177,251)' : '#111',
            opacity: !isClickable ? 0.6 : 1,
            margin: 10,
            borderRadius: 4,
          }}
        >
          <TouchableOpacity
            key={`touch_${index}_${name}`}
            style={[
              style.mnemonicBtn,
              {
                opacity: !isClickable ? 0.3 : 1,
              },
            ]}
            disabled={!isClickable}
            onPress={() => this.handleShuffledWord(name, index)}
          >
            <Text style={style.mnemonicBtnText}>{textValue}</Text>
          </TouchableOpacity>
        </View>
      );
    });
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
          </View>
        </View>
        <View style={style.displayMnemonicView}>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <Text style={style.backupPhrase}>Let's verify your backup phrase</Text>
          {this.renderMnemonicValue()}
        </View>

        {this.state.shuffledMnemonics && (
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
            onPress={this.handleVerify}
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
