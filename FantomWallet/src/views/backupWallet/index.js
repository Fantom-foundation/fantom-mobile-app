import React, { Component } from "react";
import { View, WebView, StatusBar, Text } from "react-native";
import { SafeAreaView } from "react-navigation";
import CheckBox from "../../general/checkBox"
import styles from "./style";
import Button from "../../components/general/Button";
import { Colors } from "../../theme";
export default class BackupWallet extends Component {
  constructor(props) {
    super(props);
    this.state={
        isEnable:false
    }
  }

  render() {
      const {isEnable}=this.state

    return (
      <View style={styles.mainContainerStyle}>
        <SafeAreaView style={{ flex: 1 }}>
          {/* <StatusBar barStyle="light-content" /> */}
          <View style={styles.flex1}>
            <View style={styles.mainHeadingContainer}>
              <Text style={styles.mainHeading}>Back up your wallet now!</Text>
            </View>
            <View style={styles.subHeadingContainer}>
              <Text style={styles.subHeading}>
                In the next step you will see 12 words that allow you recover
                the wallet.
              </Text>
            </View>
          </View>
          <View style={styles.flex1}>
            <View style={styles.termsContainer}>
              <Text style={styles.termsText}>
                The recovery words are the only way to recover the wallet. If
                you lose these words, you will lose access to your wallet.
              </Text>
            </View>
          </View>
          <View style={styles.flex1}>
            <View style={styles.checkBoxContainer}>
              <CheckBox
                onChange={() => this.setState({ isEnable: !isEnable })}
              />
              <Text style={{ ...styles.termsText, paddingLeft: 6 }}>
                I understand
              </Text>
            </View>
            <Button
              buttonStyle={{
                ...styles.buttonStyle,
                backgroundColor: isEnable
                  ? Colors.royalBlue
                  : Colors.greyOpacity
              }}
              textStyle={styles.buttonText}
              text={"CONTINUE"}
              onPress={() => this.props.navigation.navigate("CaptionOutput")}
            />
          </View>
        </SafeAreaView>
      </View>
    );
  }
}
