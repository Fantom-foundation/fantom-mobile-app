// @flow
import React from "react";
import { TouchableOpacity, Text, View, FlatList } from "react-native";
import { getWidth } from "../../../utils/pixelResolver";
import styles from "./styles";

type Props = {
  keyPad?: [],
  handleInputNumber: () => {},
  buttonStyle?: { [key: string]: string },
  textStyle?: { [key: string]: string },
  keyPadStyle?: { [key: string]: string }
};
/**
 * KeyPad: This is generic component , meant for rendering KeyPad on any screen.
 */
const KeyPad = ({
  keyPad = [],
  handleInputNumber = () => {},
  buttonStyle,
  textStyle,
  keyPadStyle
}: Props) => (
  <View style={{ ...styles.keyPadView, ...keyPadStyle }}>
    <FlatList
      data={keyPad}
      renderItem={({ item, index }) => {
        let marginLeft = getWidth(58);
        let marginTop = index <= 2 ? 0 : 10;
        if (index === 0 || index === 3 || index === 6 || index === 9)
          marginLeft = 0;

        return (
          <TouchableOpacity
            style={{
              ...styles.numberButton,
              ...buttonStyle,
              marginLeft: marginLeft,
              marginTop: marginTop
            }}
            onPress={() => handleInputNumber(item)}
          >
            <Text style={{ ...styles.numberText, ...textStyle }}>{item}</Text>
          </TouchableOpacity>
        );
      }}
      //Setting the number of column
      numColumns={3}
      keyExtractor={index => index.toString()}
    />
  </View>
);

export default KeyPad;
