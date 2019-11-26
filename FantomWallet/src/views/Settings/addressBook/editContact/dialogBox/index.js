// @flow
import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';

type Props = {
  onConfirm: () => void
}
/**
 * DialogBox: This component displays a dialog, when user clicks on confirm button after contact editing.
 */
const DialogBox = ({ onConfirm }: Props) => (
  <View style={styles.container}>
    <View style={styles.subContainer}>
      <View style={styles.addressTextContainer}>
        <Text>This address already exists.</Text>
        <Text>Please re- enter your wallet address.</Text>
      </View>
      <View style={styles.confirmContainer}>
        <TouchableOpacity onPress={onConfirm}>
          <Text style={styles.confirmText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);


export default DialogBox;
