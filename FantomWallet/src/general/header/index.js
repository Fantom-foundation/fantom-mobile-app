import React from 'react';
import {View, Text} from 'react-native';
import style from './style';

const header = (props) => {
    return(
        <View style={style.headerStyle}> 
            <Text style={style.titleTextStyle}>{props.title}</Text>
        </View>
    )
}

export default header;