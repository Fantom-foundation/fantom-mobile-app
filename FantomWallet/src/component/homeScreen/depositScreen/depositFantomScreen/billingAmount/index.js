import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';

import style from './style';

class BillingAmountScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: 0,
        }
    }

    onAmountChange(amount){
       this.setState({ amount });
       if(this.props.onAmountChange){
           this.props.onAmountChange(amount);
       }
       
    }

    render() {
        return (
            <View style={style.billAmountViewStyle}>
                <View style={style.billAmountLabelStyle}>
                    <Text style={style.billAmountTextLabelStyle}>Billing Amount</Text>
                    <View style={style.ftmViewStyle}>
                        <Text style={style.ftmLabelStyle}>FTM</Text>
                    </View>
                </View>
                <TextInput
                    onChangeText={this.onAmountChange.bind(this)}
                    value={this.state.amount}
                    style={style.amountInputStyle}
                    placeholder='Enter Amount'
                    placeholderTextColor='#a7a7a7'
                    keyboardType='decimal-pad'
                />
            </View>
        )
    }
}

export default BillingAmountScreen;