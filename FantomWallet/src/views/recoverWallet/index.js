import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import Button from '../../general/button/';
import EthUtil from 'ethereumjs-util';
import Hdkey from 'hdkey';
import { connect } from 'react-redux';
import * as KeyAction from '../../redux/keys/action'
import Bip39 from 'react-native-bip39';
import Icon from 'react-native-vector-icons/MaterialIcons';
import style from './style';

class RecoverWallet extends Component {
    state = {
        mnemonic: '',
        errorText: '',
    }

    handleRecoverWallet() {
        let mnemonic = this.state.mnemonic;
        mnemonic = mnemonic.replace(/' '/g, '');
        if (!this.isValidSeed(mnemonic)) {
            this.setState({
                errorText: 'Invalid Credentials!!',
            });
            return;
        }
        this.setState({
            errorText: '',
        });
        mnemonic = mnemonic.replace(/,/g, ' ');
        const seed = Bip39.mnemonicToSeed(mnemonic); //creates seed buffer

        // const mnemonicWords = mnemonic.split(' ');
        // this.setState({
        //     mnemonicWords,
        //     seed: seed,
        // })

        this.walletSetup(seed);
    }

    /**
       * walletSetup() : This function verifies the user and generates a unique masterPrivateKey for that user.
       *  Then navigate user to HomeScreen.
       */
    walletSetup(seed) {

        const root = Hdkey.fromMasterSeed(seed);
        const masterPrivateKey = root.privateKey.toString('hex');

        const addrNode = root.derive("m/44'/60'/0'/0/0"); //line 1
        const pubKey = EthUtil.privateToPublic(addrNode._privateKey);
        const addr = EthUtil.publicToAddress(pubKey).toString('hex');
        const address = EthUtil.toChecksumAddress(addr);
        const key = {
            'root': root,
            'masterPrivateKey': masterPrivateKey,
            'addrNode': addrNode,
            'pubKey': pubKey,
            'addr': addr,
            'address': address
        };
        const hexPrivateKey = EthUtil.bufferToHex(addrNode._privateKey)
        this.props.setKeys(masterPrivateKey, address, hexPrivateKey);

        this.props.navigation.navigate('HomeScreen');
        /*
           If using ethereumjs-wallet instead do after line 1:
           const address = addrNode.getWallet().getChecksumAddressString();
        */
    };

    /**
     * isValidSeed() :  This function is meant to check that captcha entered by user is valid or not.
     *    If invalid then error message is displayed.
     */
    isValidSeed(mnemonic) {
        let mnemonicKey = mnemonic.split(',');
        if (mnemonicKey.length === 12) {
            return true;
        }
        return false;
    };

    render() {
        return (
            <View style={style.containerStyle}>
                <StatusBar barStyle="dark-content" />
                <View style={style.mainViewStyle}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}
                        style={style.backButtonStyle}>
                        <Icon name='arrow-back' size={24} color='black' />
                    </TouchableOpacity>
                    <View style={style.textViewStyle}>
                        <TextInput
                            style={style.textFieldStyle}
                            value={this.state.seed}
                            editable={true}
                            multiline={true}
                            numberOfLines={4}
                            placeholder={'Enter Secret Mnemonic Codes.'}
                            onChangeText={(text) => this.setState({ mnemonic: text, errorText: '' })}
                        />
                    </View>
                    <View style={style.messageTextStyle}>
                        <Text>
                            Please enter comma seprated values.
                        </Text>
                        {this.state.errorText !== '' &&
                            <Text style={style.errorTextStyle}>
                                {this.state.errorText}
                            </Text>
                        }
                    </View>
                    <View style={style.buttonViewStyle}>
                        <Button text='Recover Wallet' buttonStyle={{ backgroundColor: '#000' }} onPress={this.handleRecoverWallet.bind(this)} />
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
    };
},
    mapDispatchToProps = (dispatch) => {
        return {
            setMasterKey: (key) => {
                dispatch({ type: KeyAction.MASTER_KEY, key });
            },
            setPublicKey: (key) => {
                dispatch({ type: KeyAction.PUBLIC_KEY, key });
            },
            setKeys: (masterKey, publicKey, privateKey) => {
                dispatch({ type: KeyAction.MASTER_PUBLIC_PRIVATE_KEY, masterKey, publicKey, privateKey });
            },
        };
    };

export default connect(mapStateToProps, mapDispatchToProps)(RecoverWallet);