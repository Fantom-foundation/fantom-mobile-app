import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../styles";
import Header from "../../../../components/Header";
import { Colors, Messages } from "../../../../theme";

import leftArrowIcon from "../../../../images/arrowLeft_White.png";

const HeaderView = props => {
  const { onChangeView, active, onLeftIconPress } = props;
  return (
    <View style={styles.headerView}>
      <Header
        onLeftIconPress={onLeftIconPress}
        text={Messages.importFantomWallet}
        headerStyle={styles.headerStyle}
        leftButtonIcon="chevron-left"
        leftIconColor="#fff"
        leftIconSize={30}
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
            {Messages.phrase}
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
            {Messages.privateKey}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default HeaderView;
