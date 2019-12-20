// @flow
import React from 'react';
import { TextInput, View, Text } from 'react-native';
import styles from './styles';

/**
 * InputBox: A component for rendering input box in Captcha Verification Screen.
 * @param  {} {phraseNumber - Contains phrase number to be displayed on input box.
 * @param  {} text - To Set Text to be displayed in input box.
 * @param  {Props} onChangeText} - Callback function to handle onChange on inputbox.
 */
export default (props: TInputBoxTypes) => {
  const { phraseNumber, text, onChangeText }=props
  return (
    <View>
      <Text style={styles.phraseNumber}> {phraseNumber}</Text>
      <TextInput
        onChangeText={onChangeText}
        value={text}
        style={styles.textBox}
        autoCapitalize="none"
        underlineColorAndroid="transparent"
        autoCorrect={false}
      />
    </View>
  );
}