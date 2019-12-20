// @flow
import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from './styles';

/**
 * BillingAmountScreen: This component is meant for handling tasks related to billing on deposit screen.
 */
const BillingAmountScreen = (props:TBillingAmountViewTypes ) => {
  const {
    headerText,
    onAmountChange,
    onTextFieldFocus = () => { },
    onTextFieldBlur = () => { },
  }=props
  const [amount, setAmount] = useState('0');

  const _onAmountChange = _amount => {
    setAmount(_amount);
    if (onAmountChange) onAmountChange(_amount);
  };

  return (
    <View style={styles.billAmountViewStyle}>
      <View style={styles.billingAmtContainer}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.inputTextHeading}>Billing Amount</Text>
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.enteredTextStyle}
            placeholderTextColor="rgba( 255, 255, 255, 0.2)"
            autoCorrect={false}
            onChangeText={_onAmountChange}
            value={`${amount}`}
            placeholder="0"
            keyboardType="decimal-pad"
            onFocus={onTextFieldFocus}
            onBlur={onTextFieldBlur}
            autoCapitalize="none"
            underlineColorAndroid="transparent"
          />
          <View style={styles.ftmViewStyle}>
            <Text style={styles.ftmLabelStyle}>{headerText}</Text>
          </View>
        </View>
      </View>
      {/* {Platform.OS === 'ios' && <KeyboardSpacer topSpacing={-180}/>} */}
      <View style={{ height: 20 }} />
    </View>
  );
};

export default BillingAmountScreen;
