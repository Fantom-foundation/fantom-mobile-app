import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  StatusBar
} from "react-native";
import styles from "./styles";
import FantomLogo from "../../../images/fantomWhiteIcon.png";
import { NavigationService, routes } from "~/navigation/helpers";
class WalletSetup extends Component {
  onCreateNewWallet = () => {
    //this.props.navigation.navigate("BackupWallet");
    NavigationService.navigate(routes.root.BackupWallet);
  };
  onRestoreWallet = () => {
    this.props.navigation.navigate("RecoverWallet");
  };

  render() {
    return (
      <ImageBackground
        style={styles.imageBackground}
        source={require("../../../images/background.png")}
        imageStyle={{ resizeMode: "cover" }}
      >
        <StatusBar barStyle="light-content" />
        <View style={styles.mainContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.fantomText}>fantom</Text>
          </View>
          <View style={styles.subHeaderContainer}>
            <Image
              source={FantomLogo}
              style={styles.fantomLogo}
              resizeMode="contain"
            />
          </View>
          <TouchableOpacity
            style={styles.walletSetup}
            onPress={this.onCreateNewWallet.bind(this)}
          >
            <Text style={styles.walletSetupText}>CREATE A NEW WALLET</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.recoverWalletStyle}
            onPress={this.onRestoreWallet.bind(this)}
          >
            <Text style={styles.footerText1}>I already have a wallet</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}
export default WalletSetup;
