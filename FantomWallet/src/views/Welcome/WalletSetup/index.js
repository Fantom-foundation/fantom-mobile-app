import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  StatusBar
} from "react-native";
import styles from "./styles";
import {FantomLogo} from "../../../images";
import { NavigationService, routes } from "~/navigation/helpers";
const WalletSetup =()=> {
  const onCreateNewWallet = () => {
    NavigationService.navigate(routes.root.BackupWallet);
  };
  const onRestoreWallet = () => {
    NavigationService.navigate(routes.root.RecoverWallet);
  };
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
            onPress={onCreateNewWallet()}
          >
            <Text style={styles.walletSetupText}>CREATE A NEW WALLET</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.recoverWalletStyle}
            onPress={onRestoreWallet()}
          >
            <Text style={styles.footerText1}>I already have a wallet</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
}
export default WalletSetup;
