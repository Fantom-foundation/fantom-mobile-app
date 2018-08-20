import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import style from './style';
class SortMenuCard extends Component {

    constructor(props) {
        super(props);
        let  data;
        if (this.props.data) {
            data = this.props.data
        }
        this.state = {
            isChecked: false,
            selectedIndex: 0,
            data: data || [
                { key: 'All Payments' },
                { key: 'Received Payments' },
                { key: 'Sent Payments' },
            ]
        }
        this.toggleHandler = this.toggleHandler.bind(this);
    }

    toggleHandler(index, itemSc) {
        if (this.props.type && this.props.type === 'withDraw') {
            this.props.handleSortMenu(itemSc)
        }
        this.setState(previousState => ({ isChecked: !previousState.isChecked, selectedIndex: index }));

    }

    render() {
        return (
            <View style={this.props.type === 'withDraw' ? style.listContainerStyle : style.altListContainerStyle}>
                <View style={style.listStyle}>
                    <FlatList
                        data={this.state.data}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={style.listItemStyle}>
                                    <Text >{item.key}</Text>
                                    <TouchableOpacity style={style.listButtonStyle} onPress={(index, ) => this.toggleHandler(index, item.sc)}>
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