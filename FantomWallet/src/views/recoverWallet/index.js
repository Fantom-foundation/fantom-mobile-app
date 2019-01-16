import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Image,
} from 'react-native';
import EthUtil from 'ethereumjs-util';
import Hdkey from 'hdkey';
import { connect } from 'react-redux';
import Bip39 from 'react-native-bip39';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Header from '../../general/header/index';
import * as KeyAction from '../../redux/keys/action';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '../../common/constants';

import BackgroundImage from '../../images/BackgroundIcon.png';
import fantomIcon from '../../images/FantomWalletWhiteIcon.png';
import style from './style';

class RecoverWallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mnemonic: '',
      errorText: '',
    };
    this.handleRecoverWallet = this.handleRecoverWallet.bind(this);
  }

  onLeftIconPress() {
    this.props.navigation.goBack();
  }

  /**
   * isValidSeed() :  This function is meant to check that captcha entered by user is valid or not.
   *    If invalid then error message is displayed.
   */

  handleRecoverWallet() {
    let { mnemonic } = this.state;
    mnemonic = mnemonic.replace(/' '/g, '');
    if (!this.isValidSeed(mnemonic)) {
      this.setState({
        errorText: 'Invalid Credentials !!',
      });
      return;
    }
    this.setState({
      errorText: '',
    });
    mnemonic = mnemonic.replace(/,/g, ' ');
    const seed = Bip39.mnemonicToSeed(mnemonic); // creates seed buffer

    this.walletSetup(seed);
  }

  /**
   * walletSetup() : This function verifies the user and generates a unique masterPrivateKey for that user.
   *  Then navigate user to HomeScreen.
   */
  walletSetup(seed) {
    const root = Hdkey.fromMasterSeed(seed);
    const masterPrivateKey = root.privateKey.toString('hex');
    const addrNode = root.derive("m/44'/60'/0'/0/0"); // line 1
    const pubKey = EthUtil.privateToPublic(addrNode._privateKey); //eslint-disable-line
    const addr = EthUtil.publicToAddress(pubKey).toString('hex');
    const address = EthUtil.toChecksumAddress(addr);
    const hexPrivateKey = EthUtil.bufferToHex(addrNode._privateKey); //eslint-disable-line
    this.props.setKeys(masterPrivateKey, address, hexPrivateKey);

    this.props.navigation.navigate('HomeScreen');
    /* 
      If using ethereumjs-wallet instead do after line 1:
        const address = addrNode.getWallet().getChecksumAddressString();
    */
  }

  isValidSeed(mnemonic) {
    const mnemonicKey = mnemonic.split(' ');
    if (mnemonicKey.length === 12) {
      return true;
    }
    return false;
  }

  renderInputContainer() {
    return (
      <View style={style.detailsContainerStyle}>
        <Text style={style.containerHeadingText}>Wallet Seed</Text>
        <View style={style.textFieldStyle}>
          <TextInput
            underlineColorAndroid="transparent"
            style={style.enteredTextStyle}
            value={this.state.seed}
            multiline
            autoCorrect={false}
            numberOfLines={4}
            blurOnSubmit
            returnKeyType="done"
            placeholder="Enter Secret Mnemonic Codes."
            placeholderTextColor="rgba( 255, 255, 255, 0.2)"
            onChangeText={text => this.setState({ mnemonic: text, errorText: '' })}
          />
        </View>
        {/* Displays error on incorrect codes */}
        {this.state.errorText !== '' && (
          <Text style={style.errorTextStyle}>{this.state.errorText}</Text>
        )}
      </View>
    );
  }

  renderConfirmButton() {
    return (
      <View style={style.confirmContainer}>
        <TouchableOpacity
          style={style.confirmButtonOuterContainer}
          onPress={this.handleRecoverWallet}
        >
          <View style={style.confirmButtonInnerContainer}>
            <FontAwesome5 name="check" color="#FFF" size={DEVICE_WIDTH * 0.09} />
          </View>
        </TouchableOpacity>
        <Text style={style.confirmTextStyle}>Confirm</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={style.containerStyle}>
        <StatusBar barStyle="light-content" />
        <Header
          leftButtonIcon="chevron-left"
          leftIconColor="#fff"
          leftIconSize={30}
          fantomIcon={fantomIcon}
          leftButtonStyle={{ marginLeft: -10 }}
          onLeftIconPress={() => this.onLeftIconPress()}
          textStyle={{ fontFamily: 'SFProDisplay-Semibold' }}
          headerStyle={{
            backgroundColor: 'rgb(44,52,58)',
            height: DEVICE_HEIGHT < 810 ? 84 : (106 / 812) * DEVICE_HEIGHT,
          }}
        />
        <Image style={style.backgroundImageStyle} source={BackgroundImage} resizeMode="contain" />
        <ScrollView style={style.mainViewStyle} scrollEnabled={DEVICE_HEIGHT < 667}>
          <View style={{ height: 32 }} />
          {/* Heading */}
          <View style={style.headingContainer}>
            <Text style={style.headingTextStyle}>Restore Wallet</Text>
          </View>
          {/* TextInput container */}
          {this.renderInputContainer()}

          {/* Instructions container */}
          <View style={style.instructionsContainer}>
            <Text style={style.instructionTextStyle}>
              Enter your secret twelve word phrase here to restore your wallet.
            </Text>
          </View>

          {/* Warning */}
          <View style={style.warningContainer}>
            <Text style={style.warningTextStyle}>Seprate each word with a single space</Text>
          </View>

          {/* Confirm container */}
          {this.renderConfirmButton()}
          <View style={{ height: DEVICE_HEIGHT * 0.08 }} />
        </ScrollView>
      </View>
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
)(RecoverWallet);
