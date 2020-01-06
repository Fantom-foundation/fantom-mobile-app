// @flow
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Clipboard,
  TouchableWithoutFeedback,
  Alert
} from "react-native";
import { connect } from "react-redux";
import Button from "../../../components/general/Button";
import { NavigationService, routes } from "~/navigation/helpers";
import Web3Agent from "../../../services/api/web3";
import { generateWallet as generateWalletAction } from "~/redux/keys/actions";
import { generateWalletUsingPrivateKey as generateWalletUsingPrivateKeyAction } from "~/redux/keys/actions";
import { Loader } from "../../../components/loader";

import styles from "./styles";
import HeaderView from "./components/header";

const getErrorView = (text, dismiss) => {
  return (
    <View style={styles.errorView}>
      <View style={styles.errorModalView}>
        <Text style={styles.errorTextHeading}>{text}</Text>
        <TouchableOpacity onPress={() => dismiss("")} style={styles.backButton}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const RecoverWalletContainer = (props: TRecoverWalletTypes) => {
  const { generateWallet, navigation, generateWalletUsingPrivateKey } = props;
  const [mnemonic, setMnemonic] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [errorType, setErrorType] = useState("");
  const [active, setActive] = useState(true);
  const [isImporting, setIsImporting] = useState(false);

  const onLeftIconPress = () => {
    const backToHome = navigation.getParam("backToHome", false);
    if (backToHome) {
      NavigationService.navigate(routes.HomeScreen.Settings);
    } else NavigationService.pop();
  };

  const onChangeView = value => {
    setActive(value);
  };

  /**
   * isValidSeed() :  This function is meant to check that captcha entered by user is valid or not.
   *    If invalid then error message is displayed.
   */
  const isValidSeed = _mnemonic => {
    const mnemonicKey = _mnemonic.split(" ");
    return mnemonicKey.length === 12;
  };

  const handleRecoverWallet = () => {
    setIsImporting(true);
    const _mnemonic = mnemonic
      .replace(/' '/g, "") // TODO: flow??? legacy
      .replace(",", "")
      .replace("  ", " ")
      .trim();

    if (!isValidSeed(_mnemonic)) {
      setIsImporting(false);
      setErrorType("phrase");
      return;
    }
    setErrorType("");
    generateWallet({
      mnemonic: _mnemonic,
      cb: (publicKey: string) => {
        NavigationService.navigate(routes.root.WalletImported, { publicKey });
        setIsImporting(false);
        setMnemonic("");
        setPrivateKey("");
      }
    });
  };

  const handleRecoverWalletUsingPrivateKey = async () => {
    if (privateKey) {
      setIsImporting(true);
      // const address = WalletUtils.restoreWallet(privateKey);
      const address = await Web3Agent.Fantom.restoreWallet(privateKey);
      if (address && address.address) {
        generateWalletUsingPrivateKey({
          privateKey,
          publicKey: address.address,
          cb: () => {
            NavigationService.navigate(routes.root.WalletImported, {
              publicKey: address.address
            });
            setIsImporting(false);
            setMnemonic("");
            setPrivateKey("");
          }
        });
      }
    } else {
      Alert.alert("Warning", "Please enter the Private Key");
    }
  };

  const changeMnemonic = text => {
    setMnemonic(text.toLowerCase());
    setErrorType("");
  };

  const readMnemonicFromClipboard = async () => {
    const clipboardContent = await Clipboard.getString();
    setMnemonic(clipboardContent);
  };

  const readPrivateKeyFromClipboard = async () => {
    const clipboardContent = await Clipboard.getString();
    setPrivateKey(clipboardContent);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        {isImporting && <Loader />}
        <HeaderView
          onLeftIconPress={onLeftIconPress}
          active={active}
          onChangeView={onChangeView}
        />
        {/* View for the Phrase Tab */}
        {active && (
          <View style={styles.phraseContainer}>
            <Text style={styles.phraseHeading}>Phrase</Text>
            <View style={styles.inputView}>
              <TextInput
                autoCorrect={false}
                value={mnemonic}
                multiline={true}
                onChangeText={changeMnemonic}
                style={styles.textInput}
              ></TextInput>
              <TouchableOpacity
                style={styles.pasteButton}
                onPress={() => readMnemonicFromClipboard()}
              >
                <Text style={styles.pasterText}>Paste</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.noteText}>
              12 words separated by single spaces
            </Text>
            <Button
              onPress={handleRecoverWallet}
              buttonStyle={styles.buttonStyle}
              buttonText={styles.buttonText}
              text="Import"
            />
          </View>
        )}

        {/* View for the Private Key  Tab */}
        {!active && (
          <View style={styles.phraseContainer}>
            <Text style={styles.phraseHeading}>Private key</Text>
            <View style={styles.privateInputView}>
              <TextInput
                multiline={true}
                style={styles.textInput}
                value={privateKey ? privateKey.trim() : ""}
                onChangeText={text => setPrivateKey(text)}
              ></TextInput>
              <TouchableOpacity
                style={styles.pasteButton}
                onPress={() => readPrivateKeyFromClipboard()}
              >
                <Text style={styles.pasteText}>Paste</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.noteText}>64 alphanumeric characters</Text>
            <Button
              buttonStyle={styles.buttonStyle}
              buttonText={styles.buttonText}
              onPress={handleRecoverWalletUsingPrivateKey}
              text="Import"
            />
          </View>
        )}

        {/* {getErrorView("Incorrect private key")}  */}

        {errorType === "phrase" &&
          getErrorView("Incorrect passphrase", setErrorType)}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default connect(null, {
  generateWallet: generateWalletAction,
  generateWalletUsingPrivateKey: generateWalletUsingPrivateKeyAction
})(RecoverWalletContainer);
