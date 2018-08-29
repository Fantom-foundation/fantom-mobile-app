

import React, { Component } from 'react';
import { ScrollView, View, Text, AsyncStorage, Platform, Keyboard } from 'react-native';

import style from './style';

import QRCodeShare from '../../../../general/depositView/qrShareCode';
import BillingAmountScreen from '../../../../general/depositView/billingAmountView';
import Button from '../../../../general/button/';

import { DEVICE_HEIGHT } from '../../../../common/constants/';

class DepositFantomScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: 0,
            qrAddress: '',
        }
    }
    componentWillMount() {
        AsyncStorage.getItem('masterPrivateKey').then((val) => this.setState({ qrAddress: val }))
    }
    onQRShare() {
        console.warn('share QR');
    }

    onAmountChange(amount) {
        this.setState({
            amount
        })
    }

    onCopyAddress() {
        console.warn('copy address');
    }

    onTextFieldFocus() {
        let moveBy = 930 - DEVICE_HEIGHT;
        if (moveBy > 0) {
            this.scrollView.scrollTo({ x: 0, y: moveBy, animated: true })
        }
    }
    onTextFieldBlur() {
        Keyboard.dismiss();
        this.scrollView.scrollToEnd()
    }



    render() {
        const balanceText = '(1,000\\ = 1.00002312FTM)';
        const qrLink = this.state.qrAddress;

        return (

            <ScrollView ref={(scroll) => this.scrollView = scroll} style={style.fantomViewStyle} showsVerticalScrollIndicator={false}>
                <View style={style.amountDisplayStyle}>
                    <Text>{balanceText} </Text>
                </View>
                <QRCodeShare qrLink={qrLink} />
                <BillingAmountScreen
                    onAmountChange={this.onAmountChange.bind(this)}
                    onTextFieldFocus={this.onTextFieldFocus.bind(this)}
                    onTextFieldBlur={this.onTextFieldBlur.bind(this)}
                    headerText='FTM'
                />
                <View style={style.buttonViewStyle}>
                    <Button text='Copy Address' buttonStyle={{ backgroundColor: '#EEBD12' }} textStyle={{ color: '#000' }} onPress={this.onCopyAddress.bind(this)} />
                </View>
                <View style={{ height: 40, marginBottom: 10 }} />
            </ScrollView>
        )
    }
}

export default DepositFantomScreen;