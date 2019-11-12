// @flow
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState, useRef } from 'react';
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
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import DropdownAlert from 'react-native-dropdownalert';

import { routes } from '~/navigation/helpers';
import { generateWallet as generateWalletAction } from '~/redux/keys/actions';
import Button from '~/components/general/Button';
import ProgressBar from '~/components/general/ProgressBar';
import WordItem from './WordItem';
import styles from './styles';
import BackgroundFantomIcon from '~/images/BackgroundIcon.png';
import { DEVICE_HEIGHT } from '~/common/constants';
import { ENUM_WORD } from './helpers';

type Props = {
  navigation: any,
  generateWallet: (string) => void
}

/**
 * This component is designed to check recorded phrases.
 */
export const CheckMnemonic = ({ navigation, generateWallet }: Props) => {
  const dropdown = useRef(null);
  const [mnemonic, setMnemonic] = useState([]);
  const [shuffledMnemonics, setShuffledMnemonic] = useState([]);
  const [verifyMnemonic, setVerifyMnemonic] = useState([]);

  useEffect(() => {
    const _mnemonic = navigation.getParam('mnemonic', '');
    setMnemonic(_mnemonic);
    setShuffledMnemonic(
      _.shuffle(_mnemonic).map((word, index) => ({
        name: word,
        index,
        isClickable: true,
      })),
    );
  }, []);

  /**
   * handleVerify() : This function verifies the user.
   */
  const handleVerify = () => {
    if (!verifyMnemonic) return;
    let inconsistency = false;

    const arr = verifyMnemonic;
    const verifyMnemonicArr = arr.map(obj => obj.name);
    mnemonic.some((word, index) => {
      if (word === verifyMnemonicArr[index]) return false;
      inconsistency = ENUM_WORD[index];
      return true;
    });

    if (inconsistency) {
      dropdown.current.alertWithType('custom', `The ${inconsistency} word does not match.`, '');
      return;
    }

    generateWallet({
      mnemonic: mnemonic.join(' ').toLowerCase(),
      cb: () => navigation.navigate(routes.root.HomeScreen),
    });
  };

  const select = ({ name, index }) => () => {
    setVerifyMnemonic([...verifyMnemonic, { name, index, isClickable: false }]);
    setShuffledMnemonic(
      shuffledMnemonics.map(item => ({
        ...item,
        isClickable: item.name !== name ? item.isClickable : false,
      })),
    );
  };

  const unSelect = ({ name, index }) => () => {
    setVerifyMnemonic(verifyMnemonic.filter(word => word.index !== index));
    setShuffledMnemonic(
      shuffledMnemonics.map(word => ({
        ...word,
        ...(name === word.name ? { isClickable: true } : {}),
      })),
    );
  };

  const behaviour = Platform.OS === 'ios' ? 'padding' : null;

  return (
    <KeyboardAvoidingView behavior={behaviour} style={styles.mainContainerStyle}>
      <View style={styles.mid}>
        <View style={styles.progressContainer}>
          <ProgressBar completed="2" remaining="0" />
        </View>
        {/* Go Back icon */}
        <View style={styles.arrowContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        {/* Background Image */}
        <Image
          style={styles.backgroundImageStyle}
          source={BackgroundFantomIcon}
          resizeMode="contain"
        />

        <ScrollView>
          <View style={styles.headerContainer}>
            <Text style={styles.captchaText}>Captcha Verification</Text>
            <View style={styles.subHeadContainer}>
              <Text style={styles.pleaseText}>
                Please enter the corresponding phrase out of the 12 back-up phrases
              </Text>
            </View>
          </View>
          <View style={styles.displayMnemonicView}>
            <Text style={styles.backupPhrase}>Let&apos;s verify your backup phrase</Text>
            <View style={styles.textContainer}>
              {verifyMnemonic.map((val, i) => (
                <WordItem {...val} key={`${val.name}_${i + 2}`} onClick={unSelect} isTop />
              ))}
            </View>
          </View>

          <View style={{ alignItems: 'center' }}>
            <Text style={styles.orderTextStyle}>Please tap each word in the correct order</Text>
          </View>
          <View style={styles.mnemonicBtnMainView}>
            {shuffledMnemonics.map((item, index) => (
              <WordItem {...item} key={`${item.name}_${index + 2}`} onClick={select} />
            ))}
          </View>
          <View style={{ height: DEVICE_HEIGHT * 0.12 }} />
        </ScrollView>
      </View>
      {/* Button container */}
      <View style={styles.footerStyle}>
        <Button
          text="Verify"
          onPress={handleVerify}
          buttonStyle={{ backgroundColor: 'rgb(0,177,251)' }}
        />
      </View>
      <DropdownAlert containerStyle={styles.dropdown} ref={dropdown} />
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = () => ({});
const mapDispatchToProps = {
  generateWallet: generateWalletAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CheckMnemonic);
