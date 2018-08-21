import React, { Component } from 'react';
import { ScrollView, View, Text,AsyncStorage } from 'react-native';

import style from './style';

import QRCodeShare from './qrCodeShare/';
import BillingAmountScreen from './billingAmount/';
import Button from '../../../../general/button/';


class DepositFantomScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: 0,
            qrAddress: '1E6yOxiEuiBflg/?LKSngL?SNgKLskdhf',
        }
    }
    componentWillMount(){
        AsyncStorage.getItem('masterPrivateKey').then((val) => this.setState({qrAddress:val}) )
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

    render() {
        const balanceText = '(1,000\\ = 1.00002312FTM)';
        const qrLink = this.state.qrAddress;

        return (
            <ScrollView style={style.fantomViewStyle} showsVerticalScrollIndicator={false}>
                <View style={style.amountDisplayStyle}>
                    <Text>{balanceText} </Text>
                </View>
                <QRCodeShare qrLink={qrLink}/>
                <BillingAmountScreen onAmountChange={this.onAmountChange.bind(this)} />
                <View style={style.buttonViewStyle}>
                    <Button text='Copy Address' buttonStyle={{ backgroundColor: '#EEBD12' }} textStyle={{ color: '#000' }} onPress={this.onCopyAddress.bind(this)} />
                </View>
            </ScrollView>
        )
    }
}

export default DepositFantomScreen;