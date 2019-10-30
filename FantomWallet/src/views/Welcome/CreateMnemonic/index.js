/* eslint-disable global-require */
// Library
import React, { useEffect, useState, useRef } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Clipboard,
  ActivityIndicator,
  ScrollView,
  Image,
} from 'react-native';
import Bip39 from 'react-native-bip39';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import DropdownAlert from 'react-native-dropdownalert';
// Components
import styles from './styles';
import Button from '~/components/general/Button';
import ProgressBar from '~/components/general/ProgressBar';

/**
 * CreateMnemonic: This component is meant for generating secret codes for captcha verification.
 */
const CreateMnemonic = ({ navigation }) => {
  let dropdown = useRef(null);
  const [mnemonic, setMnemonic] = useState([]);
  const loading = !mnemonic.length;

  const generateMnemonic = async () => {
    const _menmonic = await Bip39.generateMnemonic();
    setMnemonic(_menmonic.split(' ').map(word => word[0].toUpperCase() + word.slice(1)));
  };

  useEffect(() => {
    generateMnemonic();
  }, []);

  const onConfirmHandler = () => {
    navigation.navigate('CheckMnemonic', { mnemonic });
  };

  const copyToClipboard = () => {
    const string = mnemonic.join(', ').toLowerCase();
    Clipboard.setString(string);
    dropdown.alertWithType('custom', 'COPIED', '');
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.progressContainer}>
        <ProgressBar completed="1" remaining="1" />
      </View>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.arrowContainer}>
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
          mnemonic.length && (
            <View style={styles.textContainer}>
              {mnemonic.map((textValue, i) => (
                <View key={i} style={styles.wordWrap}>
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
          onPress={loading ? () => {} : onConfirmHandler}
          buttonStyle={{
            backgroundColor: loading ? 'rgba(0,177,251,0.9)' : 'rgb(0,177,251)',
            fontFamily: 'SFProDisplay-Bold',
          }}
        />
      </View>
      <DropdownAlert containerStyle={styles.dropdown} ref={ref => (dropdown = ref)} />
    </View>
  );
};

export default CreateMnemonic;
