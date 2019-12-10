import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../style";
import Header from "../../../general/header/index";
import { Colors } from "../../../theme";
import leftArrowIcon from "../../../images/arrowLeft_White.png";

const HeaderView = props => {
  const { onChangeView, active, onLeftIconPress } = props;
  return (
    <View style={styles.headerView}>
      <Header
        onLeftIconPress={onLeftIconPress}
        text="Import Fantom wallet"
        headerStyle={styles.headerStyle}
        leftButtonIcon={leftArrowIcon}
      />
      <View style={styles.buttonView}>
        <TouchableOpacity
          onPress={() => onChangeView(true)}
          style={[
            styles.phraseAndPrivateButton,
            {
              borderBottomWidth: active ? 2 : 0,
              borderBottomColor: active ? Colors.white : Colors.transparent
            }
          ]}
        >
          <Text
            style={[
              styles.phraseAndPrivateButtonText,
              {
                color: active ? Colors.white : Colors.lightGrey
              }
            ]}
          >
            Phrase
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onChangeView(false)}
          style={[
            styles.phraseAndPrivateButton,

            {
              borderBottomWidth: !active ? 2 : 0,
              borderBottomColor: !active ? Colors.white : Colors.transparent
            }
          ]}
        >
          <Text
            style={[
              styles.phraseAndPrivateButtonText,
              {
                color: !active ? Colors.white : Colors.lightGrey
              }
            ]}
          >
            Private Key
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default HeaderView;
