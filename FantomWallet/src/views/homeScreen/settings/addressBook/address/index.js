import React, { Component } from 'react';
import { Text, View, TouchableOpacity, CheckBox, Dimensions } from 'react-native';
import FontIcon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import EIicon from 'react-native-vector-icons/EvilIcons';
import style from './style';
import PropTypes from 'prop-types';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

/**
 * Address: This component is meant for rendering list of address saved in address book.
 */
class Address extends Component {

    onAddressSelection() {
        if (this.props.onSelection) {
            this.props.onSelection(this.props.id);
        }
    }

    handleEditContact(name, address) {
        if (!name) {
            name = 'Anonymous';
        }
        if (this.props.handleEditContact) {
            this.props.handleEditContact(name, address);
        }
    }


    render() {
        let starIcon = 'star-border';
        if (this.props.rate) {
            starIcon = 'star'
        }
        const isEditMode = this.props.isEditMode || false;
        // const isEditMode = true;
        const MainView = isEditMode ? TouchableOpacity : View;
        const propsToMainView = {};
        if (isEditMode) {
            propsToMainView.onPress = this.onAddressSelection.bind(this);
        }
        return (
            <MainView style={style.container} {...propsToMainView}>
                <View style={style.subContainer}>
                    <View style={style.subSubContainer}>
                        <View style={{ alignSelf: 'center' }}>
                            <TouchableOpacity onPress={() => this.props.rateChange(this.props.id)}>
                                <Icon name={starIcon} size={25}
                                    color={starIcon === 'star' ? '#e9b112' : 'rgba(0,0,0,0.6)'}
                                />
                            </TouchableOpacity>
                            {/* <Icon style={{ color: 'rgba(0,0,0,0.4)', alignSelf: 'flex-end' }} name="person" size={30} >
                            </Icon> */}
                        </View>
                        <View style={style.mid}>
                            <Text style={style.nameContainer}>{this.props.name || 'Anonymous'}</Text>
                            <Text>{this.props.line1Text}</Text>
                        </View>
                        <View style={style.icons}>
                            <TouchableOpacity onPress={() => this.handleEditContact(this.props.name, this.props.line1Text)}>
                                <Icon name='edit' size={25} color='rgba(0,0,0,0.6)' />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.delete(this.props.id)}>
                                <EIicon style={{ color: 'rgba(0,0,0,0.6)' }} name='trash' size={40} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </MainView>
        );
    }
}

Address.propTypes = {
    id: PropTypes.string,
    delete: PropTypes.func,
    rateChange: PropTypes.func,
    line1Text: PropTypes.string,
    name: PropTypes.string,
    isEditMode: PropTypes.bool,
    rate: PropTypes.bool,
    onSelection: PropTypes.func,

}

export default Address;
