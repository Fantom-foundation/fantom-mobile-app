import React, { Component } from 'react';
import { View, Text, Linking, TouchableOpacity, Image } from 'react-native';

import Header from '../../../../general/header/';
import leftArrowIcon from '../../../../images/arrowLeft_White.png';
import fantomIcon from '../../../../images/fantom_Icon.png';

class CustomerSupport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            websiteLink: 'https://fantom.foundation/',
            phoneNumber: '1000 - 12345678',
        }
    }

    onLeftIconPress = () => {
        this.props.navigation.goBack()
    }
    render() {
        const websiteLink = this.state.websiteLink;
        const phoneNumber = this.state.phoneNumber;
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <Header text='Customer Support' leftButtonIcon={leftArrowIcon} onLeftIconPress={this.onLeftIconPress} />
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', marginTop: 40, marginLeft: 12 }}>
                        <Text> Fantom Website: </Text>
                        <Text style={{ color: '#EEBD12', textDecorationLine: 'underline' }} onPress={() => Linking.openURL(`${websiteLink}`)}>
                            {websiteLink}
                        </Text>
                    </View>
                    <TouchableOpacity>
                        <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 12 }}>
                            <Text> Help:  </Text>
                            <Text>{phoneNumber}</Text>
                        </View>
                    </TouchableOpacity>

                </View>
                <View style={{ flex: 1, alignItems: 'center',justifyContent:'center', }}>
                    <Image source={fantomIcon} resetMode='contain' style={{width: 30, height: 30, padding: 20}}/>
                    <Text style={{paddingTop: 10, color: '#494949'}}>Copyright Â© 2018 FANTOM.</Text>
                    <Text style={{color: '#494949'}}>All Rights Reserved.</Text>
                </View>

            </View>
        )

    }
}

export default CustomerSupport;