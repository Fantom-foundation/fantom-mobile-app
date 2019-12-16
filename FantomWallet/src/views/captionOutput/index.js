import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Clipboard,
  Image,
  ActivityIndicator,
  Dimensions,
  ScrollView
} from "react-native";
import styles from "./style";
import Button from "../../components/general/Button";
// import "../../../global";
import Bip39 from "react-native-bip39";
import { NavigationService, routes } from "../../navigation/helpers";
// import ProgressBar from "../../../general/progressBar/index";
// import Icon from "react-native-vector-icons/MaterialIcons";
// import dangerIcon from "../../images/warning.png";
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

import { SafeAreaView } from "react-navigation";
import { Colors } from "../../theme";

/**
 * CaptionOutput: This component is meant for generating secret codes for captcha verification.
 */
class CaptionOutput extends Component {
  constructor(props) {
    super(props);
    this.state = { mnemonicWords: [], loading: true };
  }

  componentDidMount() {
    const menmonicPromise = Bip39.generateMnemonic();
    menmonicPromise.then(mnemonic => {
      const seed = Bip39.mnemonicToSeed(mnemonic); //creates seed buffer
      const mnemonicWords = mnemonic.split(" ");
      this.setState({
        mnemonicWords,
        seed: seed,
        loading: false
      });
    });
  }

  onLeftIconPress() {
    this.props.navigation.goBack();
  }
  async copyToClipboard() {
    const string = this.state.mnemonicWords.join(",");
    await Clipboard.setString(string);
    // const clipboardContent = await Clipboard.getString();
  }
  onConfirmHandler() {
    this.props.navigation.navigate("CaptchaVerification", {
      mnemonicWords: this.state.mnemonicWords,
      seed: this.state.seed
    });
  }
  render() {
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
            {!this.state.loading ? (
              <View style={styles.textContainer}>
                {this.state.mnemonicWords.map((val, i) => {
                  return (
                    <View key={i} style={styles.wordWrap}>
                      <Text style={styles.indexStyle}>{i + 1}</Text>
                      <Text style={styles.wordText}>{val}</Text>
                    </View>
                  );
                })}
              </View>
            ) : (
              <View
                style={{
                  height: deviceHeight * 0.25,
                  flexDirection: "row",
                  alignSelf: "center"
                }}
              >
                <ActivityIndicator size="small" color="#000" />
              </View>
            )}
          </View>
          <View style={styles.flex1}>
            <Button
              onPress={
                () =>
                  NavigationService.navigate(routes.root.CheckMnemonic, {
                    mnemonicWords: this.state.mnemonicWords,
                    seed: this.state.seed
                  })
                // this.props.navigation.navigate("VerifyRecoveryWords", {
                //   mnemonicWords: this.state.mnemonicWords,
                //   seed: this.state.seed
                // })
              }
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
export default CaptionOutput;
