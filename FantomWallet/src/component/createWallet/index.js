import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { LinkButton } from 'general/';
import Styles from './styles';

class CreateWallet extends Component {
    render() {
        return (
            <View style={ Styles.mainContainer}>
                <View style={ Styles.headerContainer}>
                <Image source={require('../../images/fantom-logo.png')} style={ Styles.headerImage }
                resizeMode='contain'/>
                </View>
                <View style={ Styles.subHeaderContainer}>
                    <Text style={ Styles.subHeaderText1}>Beyond Blockchain</Text>
                    <Text style={ Styles.subHeaderText2}>The Future of Decentralized Ecosystem</Text>
                </View>
                <TouchableOpacity style={ Styles.createWallet} onPress={() => { this.props.navigation.navigate('Terms') }}>
                    <Text style={ Styles.createWalletText}>Create Wallet</Text>
                </TouchableOpacity>
                <LinkButton text="hello"/>
                <View style={ Styles.footer }>
                    <Text style={ Styles.footerText1 }>Terms of Service</Text>
                    <Text style={ Styles.footerText2 }>Privacy Policy</Text>
                </View>
            </View>
        );
    }
}

export default CreateWallet;