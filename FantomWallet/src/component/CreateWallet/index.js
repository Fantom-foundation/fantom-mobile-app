import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { LinkButton } from 'general/';
import style from './style';

class CreateWallet extends Component {
    render() {
        return (
            <View style={style.mainContainer}>
                <View style={style.headerContainer}>
                    <Image source={require('../../images/fantom-logo.png')} style={style.headerImage}
                        resizeMode='contain' />
                </View>
                <View style={style.subHeaderContainer}>
                    <Text style={style.subHeaderText1}>Beyond Blockchain</Text>
                    <Text style={style.subHeaderText2}>The Future of Decentralized Ecosystem</Text>
                </View>
                <TouchableOpacity style={style.createWallet} /*onPress={() => { this.props.navigation.navigate('Terms') }}*/ >
                    <Text style={style.createWalletText}>Create Wallet</Text>
                </TouchableOpacity>
                <LinkButton text="hello"/>
                <View style={style.footer}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Terms')} >
                        <Text style={style.footerText1}>Terms of Service</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('PrivacyPolicy')} >
                        <Text style={style.footerText2}>Privacy Policy</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default CreateWallet;