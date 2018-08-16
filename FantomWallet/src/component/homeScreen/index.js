import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import NavigationTab from '../../general/navigationTab/';

export default class TransactionEntity extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar barStyle="light-content" />
                <NavigationTab />
            </View>
        );
    }
}