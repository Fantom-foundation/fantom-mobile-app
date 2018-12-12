import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import style from './style';

/**
 * BillingAmountScreen: This component is meant for handling tasks related to billing on deposit screen.
 */
class BillingAmountScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: '',
    };
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

  renderBillingContainer() {
    return (
      <View style={style.billingAmtContainer}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={style.inputTextHeading}>Billing Amount</Text>
        </View>
        <View style={style.textInputContainer}>
          <TextInput
            style={style.enteredTextStyle}
            placeholderTextColor="rgba( 255, 255, 255, 0.2)"
            autoCorrect={false}
            onChangeText={ammount => this.onAmountChange(ammount)}
            value={`${this.state.amount}`}
            placeholder="Enter Amount"
            keyboardType="decimal-pad"
            onFocus={() => this.onTextFieldFocus()}
            onBlur={() => this.onTextFieldBlur()}
            autoCapitalize="none"
          />
          <View style={style.ftmViewStyle}>
            <Text style={style.ftmLabelStyle}>{this.props.headerText}</Text>
          </View>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={style.billAmountViewStyle}>
        {this.renderBillingContainer()}
        {/* {Platform.OS === 'ios' && <KeyboardSpacer topSpacing={-180}/>} */}
        <View style={{ height: 20 }} />
      </View>
    );
  }
}

export default BillingAmountScreen;
