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
} from 'react-native';
import Bip39 from 'react-native-bip39';
import Icon from 'react-native-vector-icons/MaterialIcons';
// Components
import style from './style';
import Button from '../../general/button/index';
import '../../../global';
import ProgressBar from '../../general/progressBar/index';
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
            backgroundColor: this.state.loading ? 'rgba(0,177,255,0.7)' : '#00B1FF',
            fontFamily: 'SFProDisplay-Bold',
          }}
        />
      </View>
    );
  }

  renderWarningContainer() {
    return (
      <View style={style.lastMessageContainer}>
        <Icon name="warning" size={30} color="#ABE158" />
        <Text style={style.warningTextStyle}>You may lose your account if</Text>
        <Text style={style.warningTextStyle}>you lose your Secret PIN Mnemonic.</Text>
      </View>
    );
  }

  renderCopyContainer() {
    return (
      <View style={{ marginBottom: deviceHeight * 0.05, alignItems: 'center' }}>
        <View style={style.messageContainer}>
          <Text style={style.instructionTextStyle}>
            Please write down this new new Secret Mnemonic.
          </Text>
          <Text style={style.instructionTextStyle}>All previous mnemonic will become invalid.</Text>
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
          <ProgressBar completed="2" remaining="3" />
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
              <Icon name="warning" size={30} color="#ABE158" />
              <Text style={style.secretText}> Secret Mnemonic</Text>
            </View>
            {this.renderMnemonicValue()}
            {this.renderCopyContainer()}
            {this.renderWarningContainer()}
            <View style={{ height: deviceHeight * 0.15 }} />
          </ScrollView>
        </View>
        {this.renderButtonContainer()}
      </View>
    );
  }
}
export default CaptionOutput;
