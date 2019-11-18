// @flow
/* eslint-disable global-require */
// Library
import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Clipboard,
  ActivityIndicator,
  ScrollView,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import Bip39 from 'react-native-bip39';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

import { setDopdownAlert as setDopdownAlertAction } from '~/redux/notification/actions';
import { setMnemonic as setMnemonicAction } from '~/redux/keys/actions';
import { NavigationService, routes } from '~/navigation/helpers';
// Components
import styles from './styles';
import Button from '~/components/general/Button';
import ProgressBar from '~/components/general/ProgressBar';

type Props = {
  setDopdownAlert: (string, string) => void,
  setReduxMnemonic: ({ mnemonic: string }) => void
}
/**
 * CreateMnemonic: This component is meant for generating secret codes for captcha verification.
 */
export const CreateMnemonicContainer = ({ setReduxMnemonic, setDopdownAlert }: Props) => {
  const [mnemonic, setMnemonic] = useState<string>('');
  const loading = !mnemonic.length;

  const generateMnemonic = async () => {
    const _menmonic = await Bip39.generateMnemonic();
    setMnemonic(_menmonic);
  };

  useEffect(() => {
    generateMnemonic();
  }, []);

  const onConfirmHandler = () => {
    setReduxMnemonic({ mnemonic });
    NavigationService.navigate(routes.root.CheckMnemonic);
  };

  const copyToClipboard = () => {
    Clipboard.setString(mnemonic);
    setDopdownAlert('custom', 'COPIED');
  };

  const handleGoBack = () => NavigationService.pop();

  const mnemonicArray: Array<string> = mnemonic.length ? mnemonic.split(' ').map(word => word[0].toUpperCase() + word.slice(1)) : [];

  return (
    <View style={styles.mainContainer}>
      <View style={styles.progressContainer}>
        <ProgressBar completed="1" remaining="1" />
      </View>
      <TouchableOpacity onPress={handleGoBack} style={styles.arrowContainer}>
        <Icon name="chevron-left" size={24} color="#FFFFFF" />
      </TouchableOpacity>

      <ScrollView style={styles.mid} scrollEnabled>
        <View style={styles.warningContainer}>
          <Icon name="warning" size={30} color="rgb(166,225,100)" />
          <Text style={styles.secretText}> Secret Mnemonic</Text>
        </View>

        {loading ? (
          <View style={styles.activityIndicatorContainerStyle}>
            <ActivityIndicator size="small" color="#fff" />
          </View>
        ) : (
            mnemonicArray.length && (
              <View style={styles.textContainer}>
                {mnemonicArray.map((textValue, i) => (
                  <View key={`${i + 2}_${textValue}`} style={styles.wordWrap}>
                    <Text style={styles.text}>{textValue}</Text>
                  </View>
                ))}
              </View>
            )
          )}
        <View style={styles.infoContainer}>
          <View style={styles.messageContainer}>
            <Text style={styles.instructionTextStyle}>
              Please write down this new Secret Mnemonic.
            </Text>
            <Text style={styles.instructionTextStyle}>
              All previous mnemonics will become invalid.
            </Text>
          </View>

          <TouchableOpacity style={styles.clipBoardContainer} onPress={copyToClipboard}>
            <View style={styles.copyIconContainerStyle}>
              <Icon name="content-copy" color="#fff" size={20} />
            </View>
          </TouchableOpacity>
          <Text style={styles.clipBoardText}> Copy to clipboard</Text>
        </View>
        <LinearGradient
          startPoint={{ x: 1, y: 0 }}
          endPoint={{ x: 0, y: 1 }}
          colors={['rgb(44,52,58)', 'rgb(31,38,43)']}
          style={styles.lastMessageContainer}
        >
          <View style={styles.lastMessageContainer}>
            <Icon name="warning" size={24} color="rgb(166,225,100)" />
            <Text style={styles.warningTextStyle}>You will lose your account if</Text>
            <Text style={styles.warningTextStyle}>you lose your Secret PIN Mnemonic.</Text>
          </View>
        </LinearGradient>
        <View style={styles.empty} />
      </ScrollView>
      <Image
        style={styles.backgroundImage}
        source={require('~/images/BackgroundIcon.png')}
        resizeMode="contain"
      />
      <View style={styles.footerStyle}>
        <Button
          text="CONFIRM"
          onPress={loading ? () => { } : onConfirmHandler}
          buttonStyle={{
            backgroundColor: loading ? 'rgba(0,177,251,0.9)' : 'rgb(0,177,251)',
            fontFamily: 'SFProDisplay-Bold',
          }}
        />
      </View>
    </View>
  );
};

export default connect(null, ({
  setDopdownAlert: setDopdownAlertAction,
  setReduxMnemonic: setMnemonicAction,
}))(CreateMnemonicContainer);
