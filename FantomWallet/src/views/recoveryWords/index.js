import React, { Component } from "react";
import { View, WebView, StatusBar, Text } from "react-native";
import { SafeAreaView } from "react-navigation";
import CheckBox from "../../general/checkBox";
import styles from "./style";
import Button from "../../general/button";
import { Colors } from "../../theme";
export default class RecoveryWords extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEnable: false
    };
  }

  render() {
    const { isEnable } = this.state;

    return (
      <View style={styles.mainContainerStyle}>
        <SafeAreaView style={{ flex: 1 }}>
          {/* <StatusBar barStyle="light-content" /> */}
          <View style={styles.flex1}>
            <View style={styles.mainHeadingContainer}>
              <Text style={styles.mainHeading}>Your recovery words</Text>
            </View>
            <View style={styles.subHeadingContainer}>
              <Text style={styles.subHeading}>
                Write down these words in the right order and store them
                somewhere safe.
              </Text>
            </View>
          </View>
          <View style={styles.flex1}>
            {/* <View style={styles.termsContainer}>
              <Text style={styles.termsText}>
                The recovery words are the only way to recover the wallet. If
                you lose these words, you will lose access to your wallet.
              </Text>
            </View> */}
          </View>
          <View style={styles.flex1}>
            <Button
              buttonStyle={styles.buttonStyle}
              textStyle={styles.buttonText}
              text={"CONTINUE"}
            />
          </View>
        </SafeAreaView>
      </View>
    );
  }
}
