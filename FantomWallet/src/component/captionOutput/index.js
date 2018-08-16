import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { LinkButton } from 'general/';
import Header from '../../general/header/index';
import style from './style';
import Button from '../../general/button/index';
import '../../../global';
import Bip39 from 'bip39';

class CaptionOutput extends Component {
  constructor(props) {
      super(props);
      this.state= {mnemonicWords: []};
      var mnemonic = Bip39.generateMnemonic();
      const mnemonicWords = mnemonic.split(' ');
      this.state.mnemonicWords = mnemonicWords;
  };

    render() {
        return (
            <View style={style.mainContainerStyle}>
                <Header text='Caption Output' leftButtonIcon='arrow-left' />
                <View style={style.mid}>
                    <View style={style.generateText}>
                        <Text>Generate 12 characters for wallet creation.Be sure to keep the following words.</Text>
                    </View>
                    <View style={style.text}>
                        {this.state.mnemonicWords.map((val, i) => {
                            return (<Text style={style.mapText} >{i + 1}.{val}</Text>);
                        })}
                    </View>
                </View>
                <View style={style.footerStyle}>
                    <Button text='Next' onPress={() => { this.props.navigation.navigate('CaptchaVerification', {
                      mnemonicWords: this.state.mnemonicWords
                      })
                    }}
                    />
                </View>
            </View>
        );
    }
}

export default CaptionOutput;
