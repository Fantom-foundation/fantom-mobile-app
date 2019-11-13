// @flow
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import styles from './styles';

type Props = {
  name: string,
  index: number,
  isClickable: boolean,
  onClick: ({ name: string, index: number, isClickable: boolean }) => () => void,
  isTop: boolean,
};

const containerStyle = (isClickable: boolean, isTop: boolean) => ({
  borderColor: isClickable || isTop ? '#111' : 'rgb(0,177,251)',
  opacity: isClickable || isTop ? 1 : 0.6,
});

export default ({ name, index, isClickable, onClick, isTop = false }: Props) => (
  <View style={[containerStyle(isClickable, isTop), styles.mnemonicBtnContainer]}>
    <TouchableOpacity
      key={`touch_${index}_${name}`}
      style={[styles.mnemonicBtn, { opacity: isClickable || isTop ? 1 : 0.3 }]}
      disabled={!isClickable && !isTop}
      onPress={onClick({ name, index, isClickable })}
    >
      <Text style={styles.mnemonicBtnText}>{name}</Text>
    </TouchableOpacity>
  </View>
);
