import React from 'react';
import { View, Text } from 'react-native';
import style from './style';

const button = (props) => {
    return (
        <View style={style.buttonStyle}>
            <Text style={style.labelTextStyle}>{props.label}</Text>
        </View>
    )
}

export default button;