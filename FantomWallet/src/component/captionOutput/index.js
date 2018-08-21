import React, { Component } from 'react';
import { Text, View, TouchableOpacity,Clipboard,Image } from 'react-native';
import style from './style';
import Button from '../../general/button/index';
import '../../../global';
import Bip39 from 'bip39';
import ProgressBar from '../../general/progressBar/index';
import Icon from 'react-native-vector-icons/MaterialIcons';
import dangerIcon from '../../images/warning.png'
import { Dimensions } from 'react-native';
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
class CaptionOutput extends Component {
    constructor(props) {
        super(props);
        this.state = { mnemonicWords: [] };
        const mnemonic = Bip39.generateMnemonic();
        const seed = Bip39.mnemonicToSeed(mnemonic); //creates seed buffer
        const mnemonicWords = mnemonic.split(' ');
        this.state.mnemonicWords = mnemonicWords;
        this.state.seed = seed;
    };
    onLeftIconPress() {
        console.log('onLeftIconPressonLeftIconPress');
        this.props.navigation.goBack()
    }
     async copyToClipboard () {
        
        const string = this.state.mnemonicWords.join(',');
        await Clipboard.setString(string);
        const clipboardContent = await Clipboard.getString();
        console.log(clipboardContent);
    }
    render() {
        return (
            <View style={style.mainContainer}>
                <View style={style.progressContainer}>
                    <ProgressBar completed='2' remaining='3' />
                </View>
                <View style={style.arrowContainer}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}><Icon name='arrow-back' size={24} color='black' /></TouchableOpacity>
                </View>
                <View style={style.mid}>
                    <View style={style.warningContainer}>
                        {/* <Icon name='warning' size={25} color='rgb(233,177,18)' /> */}
                        <Image source={dangerIcon} style={{width:20,height:20}}/>
                        <Text style={style.secretText}> Secret Mnemonic:</Text>
                    </View>
                    <View style={style.textContainer}>
                        {this.state.mnemonicWords.map((val, i) => {
                            return (<View style={style.wordWrap}><Text style={style.text} >{val}</Text></View>);
                        })}
                    </View>
                    <View style={style.messageContainer}>
                        <Text style={{fontSize:deviceWidth*0.035}}>Please write down this new Secret Mnemonic</Text>
                        <Text style={{fontSize:deviceWidth*0.035}}>All previous mnemonic will become invalid.</Text>
                    </View>
                    <View style={style.clipBoardContainer}>
                        <TouchableOpacity onPress={() => this.copyToClipboard()}>
                            <Text style={style.clipBoardText}> Copy to clipboard</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={style.line}>
                    </View>
                    <View style={style.lastMessageContainer}>
                        <View style={{ flexDirection: 'row', }}>
                            <Icon name='warning' size={16} color='rgb(233,177,18)' />
                            <Text style={{ fontWeight: 'bold',fontSize:12 }}>You will lose your account if</Text>
                        </View>
                        <Text style={{ fontWeight: 'bold',fontSize:12 }}>      you lose your Secret PIN Mnemonic</Text>
                    </View>
                </View>
                <View style={style.footerStyle}>
                    <Button
                        text='Confirm'
                        onPress={() => {
                            this.props.navigation.navigate('CaptchaVerification', {
                                mnemonicWords: this.state.mnemonicWords,
                                seed: this.state.seed
                            })
                        }}
                        buttonStyle={{ backgroundColor: 'black' }}
                    />
                </View>
            </View>
        );
    }
}
export default CaptionOutput;