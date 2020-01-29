import React, { useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  StatusBar,
  BackHandler
} from "react-native";
import { Messages } from "../../../theme";
import styles from "./styles";
import { FantomLogo } from "../../../images";
import { NavigationService, routes } from "~/navigation/helpers";

const WalletSetup = () => {
  const onCreateNewWallet = () => {
    NavigationService.navigate(routes.root.BackupWallet);
  };
  const onRestoreWallet = () => {
    NavigationService.navigate(routes.root.RecoverWallet);
  };
  const backAndroidPress = () => {
    BackHandler.exitApp();
  };
  useEffect(() => {
  
 const handler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAndroidPress
    );
    return () => handler.remove();
  });
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
          onPress={() => onCreateNewWallet()}
        >
          <Text style={styles.walletSetupText}>{Messages.createWallet}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.recoverWalletStyle}
          onPress={() => onRestoreWallet()}
        >
          <Text style={styles.footerText1}>{Messages.alreadyWallet}</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};
export default WalletSetup;
