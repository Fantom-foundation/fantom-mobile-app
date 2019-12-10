import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard
} from "react-native";
import Button from "../../general/button";
import EthUtil from "ethereumjs-util";
import Hdkey from "hdkey";
import { connect } from "react-redux";
import * as KeyAction from "../../redux/keys/action";
import Bip39 from "react-native-bip39";
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from "./style";
import HeaderView from "./components/header";

class RecoverWallet extends Component {
  state = {
    mnemonic: "",
    errorText: "",
    active: true
  };

  handleRecoverWallet() {
    let mnemonic = this.state.mnemonic;
    mnemonic = mnemonic.replace(/' '/g, "");
    if (!this.isValidSeed(mnemonic)) {
      this.setState({
        errorText: "Invalid Credentials!!"
      });
      return;
    }
    this.setState({
      errorText: ""
    });
    mnemonic = mnemonic.replace(/,/g, " ");
    const seed = Bip39.mnemonicToSeed(mnemonic); //creates seed buffer

    // const mnemonicWords = mnemonic.split(' ');
    // this.setState({
    //     mnemonicWords,
    //     seed: seed,
    // })

    this.walletSetup(seed);
  }

  /**
   * walletSetup() : This function verifies the user and generates a unique masterPrivateKey for that user.
   *  Then navigate user to HomeScreen.
   */
  walletSetup(seed) {
    const root = Hdkey.fromMasterSeed(seed);
    const masterPrivateKey = root.privateKey.toString("hex");

    const addrNode = root.derive("m/44'/60'/0'/0/0"); //line 1
    const pubKey = EthUtil.privateToPublic(addrNode._privateKey);
    const addr = EthUtil.publicToAddress(pubKey).toString("hex");
    const address = EthUtil.toChecksumAddress(addr);
    const key = {
      root: root,
      masterPrivateKey: masterPrivateKey,
      addrNode: addrNode,
      pubKey: pubKey,
      addr: addr,
      address: address
    };
    const hexPrivateKey = EthUtil.bufferToHex(addrNode._privateKey);
    this.props.setKeys(masterPrivateKey, address, hexPrivateKey);

    this.props.navigation.navigate("HomeScreen");
    /*
           If using ethereumjs-wallet instead do after line 1:
           const address = addrNode.getWallet().getChecksumAddressString();
        */
  }

  /**
   * isValidSeed() :  This function is meant to check that captcha entered by user is valid or not.
   *    If invalid then error message is displayed.
   */
  isValidSeed(mnemonic) {
    let mnemonicKey = mnemonic.split(",");
    if (mnemonicKey.length === 12) {
      return true;
    }
    return false;
  }

  onChangeView = value => {
    this.setState({ active: value });
  };

  getErrorView = text => {
    return (
      <View style={styles.errorView}>
        <View style={styles.errorModalView}>
          <Text style={styles.errorTextHeading}>{text}</Text>
          <TouchableOpacity style={styles.backButton}>
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    const { active } = this.state;
    return (
      // <View style={style.containerStyle}>
      //     <StatusBar barStyle="dark-content" />
      //     <View style={style.mainViewStyle}>
      //         <TouchableOpacity onPress={() => this.props.navigation.goBack()}
      //             style={style.backButtonStyle}>
      //             <Icon name='arrow-back' size={24} color='black' />
      //         </TouchableOpacity>
      //         <View style={style.textViewStyle}>
      //             <TextInput
      //                 style={style.textFieldStyle}
      //                 value={this.state.seed}
      //                 editable={true}
      //                 multiline={true}
      //                 numberOfLines={4}
      //                 placeholder={'Enter Secret Mnemonic Codes.'}
      //                 onChangeText={(text) => this.setState({ mnemonic: text, errorText: '' })}
      //             />
      //         </View>
      //         <View style={style.messageTextStyle}>
      //             <Text>
      //                 Please enter comma seprated values.
      //             </Text>
      //             {this.state.errorText !== '' &&
      //                 <Text style={style.errorTextStyle}>
      //                     {this.state.errorText}
      //                 </Text>
      //             }
      //         </View>
      //         <View style={style.buttonViewStyle}>
      //             <Button text='Recover Wallet' buttonStyle={{ backgroundColor: '#000' }} onPress={this.handleRecoverWallet.bind(this)} />
      //         </View>
      //     </View>
      // </View>

      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={styles.container}>
          <HeaderView
            onLeftIconPress={() => this.props.navigation.goBack()}
            active={active}
            onChangeView={this.onChangeView}
          />

          {active && (
            <View style={styles.phraseContainer}>
              <Text style={styles.phraseHeading}>Phrase</Text>
              <View style={styles.inputView}>
                <TextInput
                  value={this.state.seed}
                  multiline={true}
                  onChangeText={text =>
                    this.setState({ mnemonic: text, errorText: "" })
                  }
                  style={styles.textInput}
                ></TextInput>
                <TouchableOpacity style={styles.pasteButton}>
                  <Text style={styles.pasterText}>Paste</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.noteText}>
                12 or 24 words separated by single spaces
              </Text>
              <Button
                onPress={this.handleRecoverWallet.bind(this)}
                buttonStyle={styles.buttonStyle}
                buttonText={styles.buttonText}
                text="Import"
              />
            </View>
          )}
          {!active && (
            <View style={styles.phraseContainer}>
              <Text style={styles.phraseHeading}>Private key</Text>
              <View style={styles.privateInputView}>
                <TextInput
                  multiline={true}
                  style={styles.textInput}
                ></TextInput>
                <TouchableOpacity style={styles.pasteButton}>
                  <Text style={styles.pasterText}>Paste</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.noteText}>64 aplhanumeric characters</Text>
              <Button
                buttonStyle={styles.buttonStyle}
                buttonText={styles.buttonText}
                text="Import"
              />
            </View>
          )}

          {/*
          function call for the error in Private key
          {this.getErrorView("Incorrect private key")} 
          */}

          {/*
          function call for the error in Phrase
           {this.getErrorView("Incorrect passphrase")}
          */}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const mapStateToProps = state => {
    return {};
  },
  mapDispatchToProps = dispatch => {
    return {
      setMasterKey: key => {
        dispatch({ type: KeyAction.MASTER_KEY, key });
      },
      setPublicKey: key => {
        dispatch({ type: KeyAction.PUBLIC_KEY, key });
      },
      setKeys: (masterKey, publicKey, privateKey) => {
        dispatch({
          type: KeyAction.MASTER_PUBLIC_PRIVATE_KEY,
          masterKey,
          publicKey,
          privateKey
        });
      }
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(RecoverWallet);
