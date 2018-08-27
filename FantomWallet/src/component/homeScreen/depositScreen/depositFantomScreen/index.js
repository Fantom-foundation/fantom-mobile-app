import React, { Component } from 'react';
import { ScrollView, View, Text, AsyncStorage, Platform, Keyboard, KeyboardAvoidingView } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import style from './style';

import QRCodeShare from '../../../../general/DepositScreen/QRCodeShare';
import BillingAmountScreen from '../../../../general/DepositScreen/BillingAmountscreen';
import Button from '../../../../general/button/';

class DepositFantomScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: 0,
            qrAddress: '',
        }
    }
    componentDidlMount() {
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

    render() {
        const balanceText = '(1,000\\ = 1.00002312FTM)';
        const qrLink = this.state.qrAddress;

        return (
            <ScrollView
                ref={(scroll) => this.scrollView = scroll}
                style={style.fantomViewStyle}
                showsVerticalScrollIndicator={false}
            >
                <View style={style.amountDisplayStyle}>
                    <Text>{balanceText} </Text>
                </View>

                <QRCodeShare qrLink={qrLink} />

                <BillingAmountScreen
                    onAmountChange={this.onAmountChange.bind(this)}
                    headerText='FTM'
                />

                <View style={style.buttonViewStyle}>
                    <Button
                        text='Copy Address'
                        buttonStyle={{ backgroundColor: '#EEBD12' }}
                        textStyle={{ color: '#000' }}
                        onPress={this.onCopyAddress.bind(this)}
                    />
                </View>

                <View style={{ height: 40 }} />

                <KeyboardSpacer onToggle={(isShown) => {
                    if (!isShown) return;
                    const val = isShown ? 220 : 0
                    this.scrollView.scrollTo({ x: 0, y: val, animated: true })
                }} />

            </ScrollView>
        )
    }
}

export default DepositFantomScreen;