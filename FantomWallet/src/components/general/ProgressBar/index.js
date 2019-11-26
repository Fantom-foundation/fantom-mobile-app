// @flow
import React from 'react';
import { View } from 'react-native';
import styles from './styles';

type Props = {
  completed: string,
  remaining: string,
};

export default ({ completed, remaining }: Props) => (
  <View style={styles.wrapper}>
    <View style={{ flex: Number(completed), backgroundColor: 'rgb(0,177,251)' }} />
    <View style={{ flex: Number(remaining), backgroundColor: 'rgb(255,255,255)' }} />
  </View>
);
