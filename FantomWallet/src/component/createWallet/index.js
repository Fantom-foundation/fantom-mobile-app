import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, ImageBackground, StatusBar } from 'react-native';
import style from './style';

//CaptchaVerification
//CaptionOutput,EditContact


class CreateWallet extends Component {
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
                <TouchableOpacity style={style.createWallet} onPress={() => { this.props.navigation.navigate('AddressBook') }} >
                    <Text style={style.createWalletText}>Create Wallet</Text>
                </TouchableOpacity>
                <View style={style.footer}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Terms')} >
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