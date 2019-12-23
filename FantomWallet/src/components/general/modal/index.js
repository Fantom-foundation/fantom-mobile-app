import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import { Colors } from "../../../theme";

const ModalView = props => {
  const {
    modalText,
    modalTextStyle,
    buttonViewStyle,
    buttons,
    stakingView,
    disabled = false
  } = props;
  return (
    <View style={styles.backgroundView}>
      <View style={{ ...styles.stakingModalView, ...stakingView }}>
        <Text style={modalTextStyle}>{modalText}</Text>
        <View style={buttonViewStyle}>
          {buttons &&
            buttons.map(b => {
              return (
                <TouchableOpacity
                  disabled={disabled}
                  onPress={b.onPress}
                  style={{
                    ...styles.backButtonStyle,
                    ...b.style,
                    backgroundColor: disabled && Colors.grey
                  }}
                >
                  <Text
                    style={{ ...b.textStyle, color: disabled && Colors.black }}
                  >
                    {b.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
        </View>
      </View>
    </View>
  );
};
export default ModalView;
