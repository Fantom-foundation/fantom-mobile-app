import React from 'react';
import {View, Text} from 'react-native';

const footer = (props) => {
    return(
        <View>
        <Text>{props.footerText}</Text>
        </View>
    )
}

export default footer;