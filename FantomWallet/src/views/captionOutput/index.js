// Library
import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Clipboard,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  Image,
} from 'react-native';
import Bip39 from 'react-native-bip39';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
// Components
import style from './style';
import Button from '../../general/button/index';
import '../../../global';
import ProgressBar from '../../general/progressBar/index';

import { DEVICE_HEIGHT, DEVICE_WIDTH } from '../../common/constants';
// Calculate height of device
const deviceHeight = Dimensions.get('window').height;

/**
 * CaptionOutput: This component is meant for generating secret codes for captcha verification.
 */
class CaptionOutput extends Component {
  constructor(props) {
    super(props);
    this.state = { mnemonicWords: [], loading: true };
  }

  componentDidMount() {
    const menmonicPromise = Bip39.generateMnemonic();
    menmonicPromise.then(mnemonic => {
      const seed = Bip39.mnemonicToSeed(mnemonic); // creates seed buffer
      const mnemonicWords = mnemonic.split(' ');
      this.setState({
        mnemonicWords,
        seed,
        loading: false,
      });
    });
  }

  onLeftIconPress() {
    this.props.navigation.goBack();
  }

  onConfirmHandler() {
    this.props.navigation.navigate('CaptchaVerification', {
      mnemonicWords: this.state.mnemonicWords,
      seed: this.state.seed,
    });
  }

  async copyToClipboard() {
    const string = this.state.mnemonicWords.join(',');
    await Clipboard.setString(string);
    // const clipboardContent = await Clipboard.getString();
  }

  renderButtonContainer() {
    return (
      <View style={style.footerStyle}>
        <Button
          text="CONFIRM"
          onPress={!this.state.loading && this.onConfirmHandler.bind(this)}
          buttonStyle={{
            backgroundColor: this.state.loading ? 'rgba(0,177,251,0.9)' : 'rgb(0,177,251)',
            fontFamily: 'SFProDisplay-Bold',
          }}
        />
      </View>
    );
  }

  renderWarningContainer() {
    return (
      <LinearGradient
        startPoint={{ x: 1, y: 0 }}
        endPoint={{ x: 0, y: 1 }}
        colors={['rgb(44,52,58)', 'rgb(31,38,43)']}
        style={style.lastMessageContainer}
      >
        <View style={style.lastMessageContainer}>
          <Icon name="warning" size={24} color="rgb(166,225,100)" />
          <Text style={style.warningTextStyle}>You will lose your account if</Text>
          <Text style={style.warningTextStyle}>you lose your Secret PIN Mnemonic.</Text>
        </View>
      </LinearGradient>
    );
  }

  renderCopyContainer() {
    return (
      <View style={{ marginBottom: deviceHeight * 0.05, alignItems: 'center' }}>
        <View style={style.messageContainer}>
          <Text style={style.instructionTextStyle}>
            Please write down this new Secret Mnemonic.
          </Text>
          <Text style={style.instructionTextStyle}>
            All previous mnemonics will become invalid.
          </Text>
        </View>

        <TouchableOpacity style={style.clipBoardContainer} onPress={() => this.copyToClipboard()}>
          <View style={style.copyIconContainerStyle}>
            <Icon name="content-copy" color="#fff" size={20} />
          </View>
        </TouchableOpacity>
        <Text style={style.clipBoardText}> Copy to clipboard</Text>
      </View>
    );
  }

  renderMnemonicValue() {
    if (!this.state.loading) {
      if (this.state.mnemonicWords.length > 0) {
        const mnemonicArr = this.state.mnemonicWords;
        return (
          <View style={style.textContainer}>
            {mnemonicArr.map((val, i) => {
              let textValue = val.charAt(0).toUpperCase() + val.slice(1); // Capitalize first alphabet of word
              return (
                <View key={i} style={style.wordWrap}>
                  <Text style={style.text}>{textValue}</Text>
                </View>
              );
            })}
          </View>
        );
      }
    }
    return (
      <View style={style.activityIndicatorContainerStyle}>
        <ActivityIndicator size="small" color="#fff" />
      </View>
    );
  }

  render() {
    return (
      <View style={style.mainContainer}>
        <View style={style.progressContainer}>
          <ProgressBar completed="1" remaining="1" />
        </View>
        <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}
          style={style.arrowContainer}
        >
          <Icon name="chevron-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={{ flex: 1 }}>
          <ScrollView style={style.mid} scrollEnabled>
            <View style={style.warningContainer}>
              <Icon name="warning" size={30} color="rgb(166,225,100)" />
              <Text style={style.secretText}> Secret Mnemonic</Text>
            </View>
            {this.renderMnemonicValue()}
            {this.renderCopyContainer()}
            {this.renderWarningContainer()}
            <View style={{ height: deviceHeight * 0.15 }} />
          </ScrollView>
        </View>
        <Image
          style={{
            width: DEVICE_WIDTH * 0.6,
            height: DEVICE_HEIGHT * 0.77,
            opacity: 0.03,
            top: DEVICE_HEIGHT * 0.07,
            right: -((DEVICE_WIDTH * 0.6) / 2),
            position: 'absolute',
          }}
          source={require('../../images/BackgroundIcon.png')}
          resizeMode="contain"
        />
        {this.renderButtonContainer()}
      </View>
    );
  }
}
export default CaptionOutput;
