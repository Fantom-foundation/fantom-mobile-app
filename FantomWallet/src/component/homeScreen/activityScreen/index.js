import React, { Component } from 'react';
import { View, Text } from 'react-native';

import style from './style';
import AddressBook from '../../addressBook/';
 

/**
 * To Display ActivityTab related tasks
 */
export default class ActivityScreen extends Component {
    render() {
        return (
                <AddressBook navigation={this.props.navigation}  />
        );
    }
}
