import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Clipboard, Image, ActivityIndicator, Dimensions } from 'react-native';
import style from './style';
import Button from '../../general/button/index';
import '../../../global';
import Bip39 from 'react-native-bip39';
import ProgressBar from '../../general/progressBar/index';
import Icon from 'react-native-vector-icons/MaterialIcons';
import dangerIcon from '../../images/warning.png'
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
class CaptionOutput extends Component {
    constructor(props) {
        super(props);
        this.state = { mnemonicWords: [], loading: true };
    };

    componentDidMount() {
        const menmonicPromise = Bip39.generateMnemonic();
        menmonicPromise.then((mnemonic) => {
            const seed = Bip39.mnemonicToSeed(mnemonic); //creates seed buffer
            const mnemonicWords = mnemonic.split(' ');
            console.warn(mnemonicWords, 'mnemonic');
            console.warn(seed, 'seed');
            this.setState({
                mnemonicWords,
                seed: seed,
                loading: false
            })
        });
    }

    onLeftIconPress() {
        this.props.navigation.goBack()
    }
    async copyToClipboard() {

        const string = this.state.mnemonicWords.join(',');
        await Clipboard.setString(string);
        const clipboardContent = await Clipboard.getString();
        console.log(clipboardContent);
    }
    onConfirmHandler() {
        this.props.navigation.navigate('CaptchaVerification', {
            mnemonicWords: this.state.mnemonicWords,
            seed: this.state.seed
        })
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
                        <Image source={dangerIcon} style={{ width: 20, height: 20 }} />
                        <Text style={style.secretText}> Secret Mnemonic:</Text>
                    </View>
                    {!this.state.loading ? (<View style={style.textContainer}>
                        {this.state.mnemonicWords.map((val, i) => {
                            return (<View style={style.wordWrap}><Text style={style.text} >{val}</Text></View>);
                        })}
                    </View>) : <View style={{
                        height: deviceHeight * 0.25, flexDirection: 'row', alignSelf: 'center',
                    }}><ActivityIndicator size="small" color="#000" /></View>}
                    <View style={style.messageContainer}>
                        <Text style={{ fontSize: deviceWidth * 0.035, fontFamily: 'SegoeUI-SemiBold' }}>Please write down this new Secret Mnemonic.</Text>
                        <Text style={{ fontSize: deviceWidth * 0.035, fontFamily: 'SegoeUI-SemiBold' }}>All previous mnemonic will become invalid.</Text>
                    </View>
                    {/* <View style={style.clipBoardContainer}> */}
                    <TouchableOpacity style={style.clipBoardContainer} onPress={() => this.copyToClipboard()}>
                        <Text style={style.clipBoardText}> Copy to clipboard</Text>
                    </TouchableOpacity>
                    {/* </View> */}
                    <View style={style.line}>
                    </View>
                    <View style={style.lastMessageContainer}>
                        <View style={{ flexDirection: 'row', }}>
                            <Image source={dangerIcon} style={{ width: 20, height: 16 }} />
                            <Text style={{ fontSize: 12, fontFamily: 'Futura' }}> You will lose your account if</Text>
                        </View>
                        <Text style={{ fontSize: 12, fontFamily: 'Futura' }}>      you lose your Secret PIN Mnemonic</Text>
                    </View>
                </View>
                <View style={style.footerStyle}>
                    <Button
                        text='Confirm'
                        onPress={!this.state.loading && this.onConfirmHandler.bind(this)}
                        buttonStyle={{ backgroundColor: this.state.loading ? '#f2f2f2' : 'black', fontFamily: 'SegoeUI' }}
                    />
                </View>
            </View>
        );
    }
}
export default CaptionOutput;