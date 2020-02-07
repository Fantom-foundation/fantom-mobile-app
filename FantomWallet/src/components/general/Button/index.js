// @flow
import React from "react";
import { TouchableOpacity, Text } from "react-native";
import styles from "./styles";

/**
 * Button : This is generic component , meant for rendering Button on any screen.
 */
const Button = (props: TButtonTypes) => {
  const {
    activeOpacity,
    text,
    onPress = () => {},
    buttonStyle = {},
    textStyle = {}
  } = props;
  return (
    <TouchableOpacity
      style={{ ...styles.buttonStyle, ...buttonStyle }}
      activeOpacity={activeOpacity}
      onPress={onPress}
    >
      <Text style={{ ...styles.textStyle, ...textStyle }}>{text}</Text>
    </TouchableOpacity>
  );
};
export default Button;
