// @flow
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './styles';

type Props = {
  activeOpacity: number,
  text: string,
  onPress: () => void,
  buttonStyle: { [key: string]: string },
  textStyle: { [key: string]: string },
};
/**
 * Button : This is generic component , meant for rendering Button on any screen.
 */
const Button = ({
  activeOpacity,
  text,
  onPress = () => {},
  buttonStyle = {},
  textStyle = {},
}: Props) => (
  <TouchableOpacity
    style={{ ...styles.buttonStyle, ...buttonStyle }}
    activeOpacity={activeOpacity}
    onPress={onPress}
  >
    <Text style={{ ...styles.textStyle, ...textStyle }}>{text}</Text>
  </TouchableOpacity>
);

export default Button;
