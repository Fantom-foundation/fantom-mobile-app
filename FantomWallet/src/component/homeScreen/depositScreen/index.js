import React, { Component } from 'react';
import { View } from 'react-native';

import style from './style';

import DepositNavigationTab from '../../../general/navigationTab/depositNavigationTab/';
import Header from '../../../general/header/';

import fantomIcon from '../../../images/fantomWhiteIcon.png';
import secondaryIcon from '../../../images/icon.png';
import leftIcon from '../../../images/notification_red.png';
import settingIcon from '../../../images/setting.png';
/**
 * To Display DepositTab related tasks
 */
export default class DepositScreen extends Component {

    onRightIconPress() {
        this.props.navigation.navigate('AddressBook');
    }
    render() {
        return (
            <View style={style.depositViewStyle}>
                <Header text='FANTOM'
                    rightButtonIcon={settingIcon}
                    headerStyle={{ backgroundColor: '#EEBD12', }}
                    onRightIconPress={this.onRightIconPress.bind(this)}
                    fantomIcon={fantomIcon}
                    secondaryButtonIcon={secondaryIcon}
                    leftButtonIcon={leftIcon}
                />
                <View style={style.depositScreenStyle}>
                    <DepositNavigationTab />
                </View>
            </View>
        );
    }
}