import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import NavigationTab from '../../general/navigationTab/';
import Header from '../../general/header/';

export default class TransactionEntity extends Component {
    onRightIconPress() {
        this.props.navigation.navigate('AddressBook');
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar barStyle="light-content" />
                <Header text='FANTOM' rightButtonIcon='settings' headerStyle={{ backgroundColor: '#EEBD12', }} onRightIconPress={this.onRightIconPress.bind(this)} />

                <NavigationTab />
            </View>
        );
    }
}