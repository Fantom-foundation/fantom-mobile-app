import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, ImageBackground, StatusBar, AsyncStorage } from 'react-native';
import style from './style';

//CaptchaVerification
//CaptionOutput,EditContact


class CreateWallet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            qrAddress: '',
        }
    }
    componentWillMount() {
        AsyncStorage.getItem('masterPrivateKey').then((val) => this.setState({ qrAddress: val }))
    }
    onCreateNewWallet() {
        const walletAddress = this.state.qrAddress;
        console.log('this.state.qrAddress  :', this.state.qrAddress);
        if (walletAddress === null) {
            this.props.navigation.navigate('CaptionOutput');
        } else {
            this.props.navigation.navigate('HomeScreen');
        }
    }
    render() {
        return (<ImageBackground
            style={style.imageBackground}
            source={require('../../images/background.png')}
            imageStyle={{ resizeMode: 'cover' }}
        >
            <StatusBar barStyle="light-content" />
            <View style={style.mainContainer}>
                <View style={style.headerContainer}>
                    <Image source={require('../../images/fantom-logo.png')} style={style.headerImage}
                        resizeMode='contain' />
                </View>
                <View style={style.subHeaderContainer}>
                    <Text style={style.subHeaderText1}>Beyond Blockchain</Text>
                    <Text style={style.subHeaderText2}>The Future of Decentralized </Text>
                    <Text style={style.subHeaderText3}>Ecosystem</Text>
                </View>
                <TouchableOpacity style={style.createWallet} onPress={this.onCreateNewWallet.bind(this)} >
                    <Text style={style.createWalletText}>Create Wallet</Text>
                </TouchableOpacity>
                <View style={style.footer}>
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('Terms') }} >
                        <Text style={style.footerText1}>Terms of Service</Text>
                    </TouchableOpacity>
                    <View style={style.division} />

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('PrivacyPolicy')} >
                        <Text style={style.footerText2}>Privacy Policy</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground >
        );
    }
}

export default CreateWallet;
