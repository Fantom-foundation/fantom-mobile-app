import React, { Component } from 'react';
import { View, Text, TextInput, Platform } from 'react-native';
import style from './style';
import KeyboardSpacer from 'react-native-keyboard-spacer';

class BillingAmountScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: 0,
        }
    }

    onAmountChange(amount) {
        this.setState({ amount });
        if (this.props.onAmountChange) {
            this.props.onAmountChange(amount);
        }
    }

    onTextFieldFocus() {
        if (this.props.onTextFieldFocus) {
            this.props.onTextFieldFocus();
        }
    }
    onTextFieldBlur() {
        if (this.props.onTextFieldBlur) {
            this.props.onTextFieldBlur();
        }
    }

    render() {
        return (
            <View style={style.billAmountViewStyle} >
                <View style={style.billAmountLabelStyle}>
                    <Text style={style.billAmountTextLabelStyle}>Billing Amount</Text>
                    <View style={style.ftmViewStyle}>
                        <Text style={style.ftmLabelStyle}>{this.props.headerText}</Text>
                    </View>
                </View>
                <TextInput
                    onChangeText={this.onAmountChange.bind(this)}
                    value={`${this.state.amount}`}
                    style={style.amountInputStyle}
                    placeholder='Enter Amount'
                    placeholderTextColor='#a7a7a7'
                    keyboardType='decimal-pad'
                    onFocus={() => this.onTextFieldFocus()}
                    onBlur={() => this.onTextFieldBlur()}
                />
                {Platform.OS === 'ios' && <KeyboardSpacer topSpacing={-180}/>}
                <View style={{ height: 20 }} />
                
            </View>
        )
    }
}

export default BillingAmountScreen;