import React from 'react';
import {View, Text} from 'react-native';

const header = (props) => {
    return(
        <View> 
            <Text>{props.headerText}</Text>
        </View>
    )
}

export default header;