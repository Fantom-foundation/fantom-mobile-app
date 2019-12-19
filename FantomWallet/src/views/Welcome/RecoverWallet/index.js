// @flow
import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Clipboard,
  TouchableWithoutFeedback
} from "react-native";
import { connect } from "react-redux";
import Button from "../../../components/general/Button";
import { NavigationService, routes } from "~/navigation/helpers";

import { generateWallet as generateWalletAction } from "~/redux/keys/actions";
import { generateWalletUsingPrivateKey as generateWalletUsingPrivateKeyAction } from "~/redux/keys/actions";

import styles from "./styles";
import HeaderView from "./components/header";

type Props = {
  generateWallet: ({ mnemonic: string }) => void,
  generateWalletUsingPrivateKey: ({ privateKey: string }) => void,
  navigation: {
    navigate: string => void,
    goBack: () => void
  }
};

export const RecoverWalletContainer = ({
  generateWallet,
  navigation,
  generateWalletUsingPrivateKey
}: Props) => {
  const [mnemonic, setMnemonic] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [errorText, setErrorText] = useState("");
  const [active, setActive] = useState(true);

  const onLeftIconPress = () => {
    navigation.goBack();
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
    const _mnemonic = mnemonic
      .replace(/' '/g, "") // TODO: flow??? legacy
      .replace(",", "")
      .replace("  ", " ")
      .trim();

    if (!isValidSeed(_mnemonic)) {
      setErrorText("Invalid Credentials !!");
      return;
    }
    setErrorText("");
    generateWallet({
      mnemonic: _mnemonic,
      // cb: () => NavigationService.navigate(routes.root.HomeScreen)
      cb: () => {}
    });
  };

  const handleRecoverWalletUsingPrivateKey = () => {
    generateWalletUsingPrivateKey({
      privateKey,
      cb: () => NavigationService.navigate(routes.root.HomeScreen)
    });
  };

  const changeMnemonic = text => {
    setMnemonic(text);
    setErrorText("");
  };

  const getErrorView = text => {
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

  const readMnemonicFromClipboard = async () => {
    const clipboardContent = await Clipboard.getString();
    setMnemonic(clipboardContent);
  };

  const readPrivateKeyFromClipboard = async () => {
    const clipboardContent = await Clipboard.getString();
    setPrivateKey(clipboardContent);
  };

  return (
    // <View style={styles.containerStyle}>
    //   <Header
    //     leftButtonIcon="chevron-left"
    //     leftIconColor="#fff"
    //     leftIconSize={30}
    //     fantomIcon={fantomIcon}
    //     leftButtonStyle={styles.headerComponentIcon}
    //     onLeftIconPress={onLeftIconPress}
    //     textStyle={styles.headerComponentText}
    //     headerStyle={styles.headerComponent}
    //   />
    //   <Image style={styles.backgroundImageStyle} source={BackgroundImage} resizeMode="contain" />
    //   <ScrollView style={styles.mainViewStyle} scrollEnabled={DEVICE_HEIGHT < 667}>
    //     <View style={styles.empty} />
    //     {/* Heading */}
    //     <View style={styles.headingContainer}>
    //       <Text style={styles.headingTextStyle}>Restore Wallet</Text>
    //     </View>
    //     {/* TextInput container */}
    //     <View style={styles.detailsContainerStyle}>
    //       <Text style={styles.containerHeadingText}>Wallet Seed</Text>
    //       <View style={styles.textFieldStyle}>
    //         <TextInput
    //           underlineColorAndroid="transparent"
    //           style={styles.enteredTextStyle}
    //           value={mnemonic}
    //           multiline
    //           autoCorrect={false}
    //           numberOfLines={4}
    //           blurOnSubmit
    //           returnKeyType="done"
    //           placeholder="Enter Secret Mnemonic Codes."
    //           placeholderTextColor="rgba( 255, 255, 255, 0.2)"
    //           onChangeText={changeMnemonic}
    //         />
    //       </View>
    //       {/* Displays error on incorrect codes */}
    //       {errorText !== '' && <Text style={styles.errorTextStyle}>{errorText}</Text>}
    //     </View>

    //     {/* Instructions container */}
    //     <View style={styles.instructionsContainer}>
    //       <Text style={styles.instructionTextStyle}>
    //         Enter your secret twelve word phrase here to restore your wallet.
    //       </Text>
    //     </View>

    //     {/* Warning */}
    //     <View style={styles.warningContainer}>
    //       <Text style={styles.warningTextStyle}>Seprate each word with a single space</Text>
    //     </View>

    //     {/* Confirm container */}
    //     <View style={styles.confirmContainer}>
    //       <TouchableOpacity
    //         style={styles.confirmButtonOuterContainer}
    //         onPress={handleRecoverWallet}
    //       >
    //         <View style={styles.confirmButtonInnerContainer}>
    //           <FontAwesome5 name="check" color="#FFF" size={DEVICE_WIDTH * 0.09} />
    //         </View>
    //       </TouchableOpacity>
    //       <Text style={styles.confirmTextStyle}>Confirm</Text>
    //     </View>
    //     <View style={styles.emptyRate} />
    //   </ScrollView>
    // </View>

    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
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
              12 or 24 words separated by single spaces
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
                value={privateKey}
                onChangeText={text => setPrivateKey(text)}
              ></TextInput>
              <TouchableOpacity
                style={styles.pasteButton}
                onPress={() => readPrivateKeyFromClipboard()}
              >
                <Text style={styles.pasterText}>Paste</Text>
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

        {/*
      function call for the error in Private key
      {getErrorView("Incorrect private key")} 
      */}

        {/*
      function call for the error in Phrase
        {getErrorView("Incorrect passphrase")}
      */}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default connect(null, {
  generateWallet: generateWalletAction,
  generateWalletUsingPrivateKey: generateWalletUsingPrivateKeyAction
})(RecoverWalletContainer);
