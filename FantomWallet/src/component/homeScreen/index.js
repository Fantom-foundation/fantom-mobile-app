import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import NavigationTab from '../../general/navigationTab/';
import Header from '../../general/header/';

import fantomIcon from '../../images/fantomWhiteIcon.png';
import secondaryIcon from '../../images/icon.png';
import leftIcon from '../../images/notification_red.png';
import settingIcon from '../../images/setting.png';

export default class TransactionEntity extends Component {
    onRightIconPress() {
        this.props.navigation.navigate('AddressBook');
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar barStyle="light-content" />
                <Header text='FANTOM'
                    rightButtonIcon={settingIcon}
                    headerStyle={{ backgroundColor: '#EEBD12', }}
                    onRightIconPress={this.onRightIconPress.bind(this)}
                    fantomIcon={fantomIcon}
                    secondaryButtonIcon={secondaryIcon}
                    leftButtonIcon={leftIcon}
                />
                <NavigationTab />
               
            </View>
        );
    }
}