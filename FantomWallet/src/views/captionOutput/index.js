import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Clipboard,
  Image,
  ActivityIndicator,
  Dimensions,
  ScrollView,
} from 'react-native';
import Bip39 from 'react-native-bip39';
import Icon from 'react-native-vector-icons/MaterialIcons';

import style from './style';
import Button from '../../general/button/index';
import '../../../global';
import ProgressBar from '../../general/progressBar/index';
import dangerIcon from '../../images/warning.png';

const deviceWidth = Dimensions.get('window').width;
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
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={{ height: deviceHeight * 0.75 }}>
          <ScrollView style={style.mid} scrollEnabled>
            <View style={style.warningContainer}>
              <Image source={dangerIcon} style={{ width: 20, height: 20 }} />
              <Text style={style.secretText}> Secret Mnemonic:</Text>
            </View>
            {!this.state.loading ? (
              <View style={style.textContainer}>
                {this.state.mnemonicWords.map((val, i) => (
                  <View key={i} style={style.wordWrap}>
                    <Text style={style.text}>{val}</Text>
                  </View>
                ))}
              </View>
            ) : (
              <View
                style={{
                  height: deviceHeight * 0.25,
                  flexDirection: 'row',
                  alignSelf: 'center',
                }}
              >
                <ActivityIndicator size="small" color="#000" />
              </View>
            )}
            <View style={style.messageContainer}>
              <Text style={{ fontSize: deviceWidth * 0.035, fontFamily: 'SegoeUI-SemiBold' }}>
                Please write down this new Secret Mnemonic.
              </Text>
              <Text style={{ fontSize: deviceWidth * 0.035, fontFamily: 'SegoeUI-SemiBold' }}>
                All previous mnemonic will become invalid.
              </Text>
            </View>
            <TouchableOpacity
              style={style.clipBoardContainer}
              onPress={() => this.copyToClipboard()}
            >
              <Text style={style.clipBoardText}> Copy to clipboard</Text>
            </TouchableOpacity>
            <View style={style.line} />
            <View style={style.lastMessageContainer}>
              <Image source={dangerIcon} style={{ width: 20, height: 16 }} />
              <View>
                <Text style={{ fontSize: 12, fontFamily: 'Futura' }}>
                  {' '}
                  You will lose your account if
                </Text>
                <Text style={{ fontSize: 12, fontFamily: 'Futura' }}>
                  {' '}
                  you lose your Secret PIN Mnemonic.
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
        <View style={style.footerStyle}>
          <Button
            text="Confirm"
            onPress={!this.state.loading && this.onConfirmHandler.bind(this)}
            buttonStyle={{
              backgroundColor: this.state.loading ? '#f2f2f2' : 'black',
              fontFamily: 'SegoeUI',
            }}
          />
        </View>
      </View>
    );
  }
}
export default CaptionOutput;
