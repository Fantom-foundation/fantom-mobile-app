import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';

import style from './style';
class SortMenuCard extends Component {

    render() {
        return (
            <View style={style.listContainerStyle}>
                <Text style={style.listTitleStyle}> How to view </Text>
                <View style={style.listStyle}>
                    <FlatList
                        data={[
                            { key: 'All' },
                            { key: 'Sent' },
                            { key: 'Success' },
                            { key: 'Failure' },
                        ]}
                        renderItem={({ item }) => <TouchableOpacity><Text style={style.listItemStyle}>{item.key}</Text></TouchableOpacity>}
                    />
                </View>
            </View>
        )
    }
}

export default SortMenuCard;