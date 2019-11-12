// @flow
import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { routes } from '~/navigation/helpers';
import Header from '~/components/Header/index';
import { generateWallet as generateWalletAction } from '~/redux/keys/actions';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '~/common/constants';
import BackgroundImage from '~/images/BackgroundIcon.png';
import fantomIcon from '~/images/FantomWalletWhiteIcon.png';
import styles from './styles';

type Props = {
  generateWallet: ({ mnemonic: string }) => void,
  navigation: {
    navigate: string => void,
    goBack: () => void,
  },
};

export const RecoverWallet = ({ generateWallet, navigation }: Props) => {
  const [mnemonic, setMnemonic] = useState('');
  const [errorText, setErrorText] = useState('');

  const onLeftIconPress = () => {
    navigation.goBack();
  };

  /**
   * isValidSeed() :  This function is meant to check that captcha entered by user is valid or not.
   *    If invalid then error message is displayed.
   */
  const isValidSeed = _mnemonic => {
    const mnemonicKey = _mnemonic.split(' ');
    return mnemonicKey.length === 12;
  };

  const handleRecoverWallet = () => {
    const _mnemonic = mnemonic
      .replace(/' '/g, '') // TODO: flow??? legacy
      .replace(',', '')
      .replace('  ', ' ')
      .trim();

    if (!isValidSeed(_mnemonic)) {
      setErrorText('Invalid Credentials !!');
      return;
    }
    setErrorText('');
    generateWallet({
      mnemonic: _mnemonic,
      cb: () => navigation.navigate(routes.root.HomeScreen),
    });
  };

  const changeMnemonic = text => {
    setMnemonic(text);
    setErrorText('');
  };

  return (
    <View style={styles.containerStyle}>
      <StatusBar barStyle="light-content" />
      <Header
        leftButtonIcon="chevron-left"
        leftIconColor="#fff"
        leftIconSize={30}
        fantomIcon={fantomIcon}
        leftButtonStyle={styles.headerComponentIcon}
        onLeftIconPress={onLeftIconPress}
        textStyle={styles.headerComponentText}
        headerStyle={styles.headerComponent}
      />
      <Image style={styles.backgroundImageStyle} source={BackgroundImage} resizeMode="contain" />
      <ScrollView style={styles.mainViewStyle} scrollEnabled={DEVICE_HEIGHT < 667}>
        <View style={styles.empty} />
        {/* Heading */}
        <View style={styles.headingContainer}>
          <Text style={styles.headingTextStyle}>Restore Wallet</Text>
        </View>
        {/* TextInput container */}
        <View style={styles.detailsContainerStyle}>
          <Text style={styles.containerHeadingText}>Wallet Seed</Text>
          <View style={styles.textFieldStyle}>
            <TextInput
              underlineColorAndroid="transparent"
              style={styles.enteredTextStyle}
              value={mnemonic}
              multiline
              autoCorrect={false}
              numberOfLines={4}
              blurOnSubmit
              returnKeyType="done"
              placeholder="Enter Secret Mnemonic Codes."
              placeholderTextColor="rgba( 255, 255, 255, 0.2)"
              onChangeText={changeMnemonic}
            />
          </View>
          {/* Displays error on incorrect codes */}
          {errorText !== '' && <Text style={styles.errorTextStyle}>{errorText}</Text>}
        </View>

        {/* Instructions container */}
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionTextStyle}>
            Enter your secret twelve word phrase here to restore your wallet.
          </Text>
        </View>

        {/* Warning */}
        <View style={styles.warningContainer}>
          <Text style={styles.warningTextStyle}>Seprate each word with a single space</Text>
        </View>

        {/* Confirm container */}
        <View style={styles.confirmContainer}>
          <TouchableOpacity
            style={styles.confirmButtonOuterContainer}
            onPress={handleRecoverWallet}
          >
            <View style={styles.confirmButtonInnerContainer}>
              <FontAwesome5 name="check" color="#FFF" size={DEVICE_WIDTH * 0.09} />
            </View>
          </TouchableOpacity>
          <Text style={styles.confirmTextStyle}>Confirm</Text>
        </View>
        <View style={styles.emptyRate} />
      </ScrollView>
    </View>
  );
};

export default connect(
  null,
  { generateWallet: generateWalletAction }
)(RecoverWallet);
