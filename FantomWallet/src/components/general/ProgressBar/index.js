// @flow
import React from 'react';
import { View } from 'react-native';
import styles from './styles';

export default (props: TProgressBarTypes) => {
  const { completed, remaining }=props
  return (
    <View style={styles.wrapper}>
      <View style={{ flex: Number(completed), backgroundColor: 'rgb(0,177,251)' }} />
      <View style={{ flex: Number(remaining), backgroundColor: 'rgb(255,255,255)' }} />
    </View>
  );
}