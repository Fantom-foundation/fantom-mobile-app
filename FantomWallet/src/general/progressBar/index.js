import React, { Component } from 'react';
import { View } from 'react-native';
import style from './style';

import { Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;

export default class ProgressBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { completed , remaining } = this.props;
        
        completed = Number(completed);
        remaining = Number(remaining);
        return (
            <View style={style.wrapper}>
                <View style={{flex:completed,backgroundColor:'black'}}></View>
                <View style={{flex:remaining,backgroundColor:'grey'}}></View>
            </View>
        );
    }
}