import React, { Component } from 'react';
import { View, WebView, StatusBar } from 'react-native';
import PropTypes from 'prop-types';

import Header from '../../general/header/';
import Button from '../../general/button/';

import style from './style';

import crossButton from '../../images/crossButtonWhite.png';

/**
 * PrivacyPolicy :  This component is meant for displaying Privacy Policy for users of the application.
 */
export default class PrivacyPolicy extends Component {
    constructor(props) {
        super(props);
        this.onRightIconPress = this.onRightIconPress.bind(this);
        this.onLeftIconPress = this.onLeftIconPress.bind(this);
    }

    /**
     * onRightIconPress() :  This function is meant for actions to be performed when clicked on right side button on Header Bar.
     */
    onRightIconPress() {
        this.props.navigation.goBack()
    }

    /**
     * onLeftIconPress() :  This function is meant for actions to be performed when clicked on left side button on Header Bar.
     */
    onLeftIconPress() {
        this.props.navigation.goBack()
    }

    render() {
        return (
            <View style={style.mainContainerStyle}>
                <StatusBar
                    barStyle="light-content" />
                <Header text={'Privacy Policy'} rightButtonIcon={crossButton} onRightIconPress={this.onRightIconPress} />
                <WebView source={{ uri: 'http://www.innow8apps.com' }} />
                <View style={style.footerStyle}>
                    <Button text={'Confirm'} />
                </View>
            </View>
        )
    }
}

PrivacyPolicy.propTypes = {
    navigation: PropTypes.object,
}

