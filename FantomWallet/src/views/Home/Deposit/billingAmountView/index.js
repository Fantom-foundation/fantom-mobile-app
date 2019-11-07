// @flow
import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import style from './style';

type Props = {
  headerText: string,
  onAmountChange: string => void,
  onTextFieldFocus: () => void,
  onTextFieldBlur: () => void,
};

/**
 * BillingAmountScreen: This component is meant for handling tasks related to billing on deposit screen.
 */
const BillingAmountScreen = ({
  headerText,
  onAmountChange,
  onTextFieldFocus = () => {},
  onTextFieldBlur = () => {},
}: Props) => {
  const [amount, setAmount] = useState('0');

  const _onAmountChange = _amount => {
    setAmount(_amount);
    if (onAmountChange) onAmountChange(_amount);
  };

  return (
    <View style={style.billAmountViewStyle}>
      <View style={style.billingAmtContainer}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={style.inputTextHeading}>Billing Amount</Text>
        </View>
        <View style={style.textInputContainer}>
          <TextInput
            style={style.enteredTextStyle}
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
          <View style={style.ftmViewStyle}>
            <Text style={style.ftmLabelStyle}>{headerText}</Text>
          </View>
        </View>
      </View>
      {/* {Platform.OS === 'ios' && <KeyboardSpacer topSpacing={-180}/>} */}
      <View style={{ height: 20 }} />
    </View>
  );
};

export default BillingAmountScreen;
