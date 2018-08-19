import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import style from './style';
class SortMenuCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isChecked: false,
            selectedIndex: 0,
        }
        this.toggleHandler = this.toggleHandler.bind(this);
    }

    toggleHandler(index) {
        this.setState(previousState => ({ isChecked: !previousState.isChecked, selectedIndex: index }));
    }

    render() {
        return (
            <View style={style.listContainerStyle}>
                <View style={style.listStyle}>
                    <FlatList
                        data={[
                            { key: 'All Payments' },
                            { key: 'Received Payments' },
                            { key: 'Sent Payments' },
                        ]}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={style.listItemStyle}>
                                    <Text >{item.key}</Text>
                                    <TouchableOpacity style={style.listButtonStyle} onPress={() => this.toggleHandler(index)}>
                                        <MaterialIcons name={(this.state.selectedIndex === index) ? 'radio-button-checked' : 'radio-button-unchecked'} style={(this.state.selectedIndex === index) ? style.checkedButtonStyle : style.uncheckedButtonStyle} />
                                    </TouchableOpacity>
                                </View>
                            )
                        }
                        }
                    />
                </View>
            </View>
        )
    }
}

export default SortMenuCard;