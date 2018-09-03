import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import Button from '../../general/button/';
import EthUtil from 'ethereumjs-util';
import Hdkey from 'hdkey';
import { connect } from 'react-redux';
import * as KeyAction from '../../redux/keys/action'
import Bip39 from 'react-native-bip39';

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
        // const bufferAgain = EthUtil.toBuffer(hexPrivateKey);
        // Save masterPrivateKey to device DO NOT USE IN PRODUCTION
        // this.saveMasterKey(masterPrivateKey, hexPublicKey);
        this.props.setKeys(masterPrivateKey, address, hexPrivateKey);
        // Save pubKey generation
        // this.savePublicKey(pubKey);

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
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <StatusBar barStyle="dark-content" />
                <View style={{ flex: 1, marginTop: 24, }}>
                    <View style={{
                        margin: 4,
                        borderWidth: 1,
                        borderColor: 'black'
                    }}>
                        <TextInput
                            style={{ height: 100, padding: 8, }}
                            value={this.state.seed}
                            editable={true}
                            multiline={true}
                            numberOfLines={4}
                            placeholder={'Enter Secret Mnemonic Codes.'}
                            onChangeText={(text) => this.setState({ mnemonic: text, errorText: '' })}
                        />
                    </View>
                    <View style={{ flex: 1, height: 20, padding: 8 }}>
                        <Text>
                            Please enter comma seprated values.
                        </Text>
                        {this.state.errorText !== '' &&
                            <Text style={{ color: 'red' }}>
                                {this.state.errorText}
                            </Text>
                        }
                    </View>
                    <View style={{
                        flex: 1,
                        justifyContent: 'flex-end',
                        alignContent: 'center'
                    }}>
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