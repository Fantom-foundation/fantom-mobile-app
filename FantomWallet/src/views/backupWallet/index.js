import React, { useState, useEffect } from "react";
import { View, WebView, StatusBar, Text, BackHandler } from "react-native";
import { SafeAreaView } from "react-navigation";
import CheckBox from "../../general/checkBox";
import styles from "./style";
import Button from "../../components/general/Button";
import { Colors, Messages } from "../../theme";
import { NavigationService, routes } from "~/navigation/helpers";
import Header from "~/components/Header";
const BackupWallet = (props: TBackupWalletTypes) => {
  const [isEnable, setIsEnable] = useState(false);
  const { navigation } = props;
  const backToHome = navigation.getParam("backToHome", false);

  const onLeftIconPress = () => {
    if (backToHome) {
      NavigationService.navigate(routes.HomeScreen.Settings);
    } else NavigationService.pop();
    return true;
  };

  useEffect(() => {
    const handler = BackHandler.addEventListener(
      "hardwareBackPress",
      onLeftIconPress
    );

    return () => handler.remove();
  }, []);

  return (
    <View style={styles.mainContainerStyle}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" />
        <Header
          onLeftIconPress={onLeftIconPress}
          headerStyle={styles.headerStyle}
          leftButtonIcon="chevron-left"
          leftIconColor="black"
          leftIconSize={30}
        />
        <View style={styles.headerTextView}>
          <View style={styles.mainHeadingContainer}>
            <Text style={styles.mainHeading}>{Messages.backupWalletNow}</Text>
          </View>
          <View style={styles.subHeadingContainer}>
            <Text style={styles.subHeading}>
              {Messages.allowToRecoverWallet}
            </Text>
          </View>
        </View>
        <View style={styles.flex1}>
          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>{Messages.recoveryMessage}</Text>
          </View>
        </View>
        <View style={styles.flex1}>
          <View style={styles.checkBoxContainer}>
            <CheckBox onChange={() => setIsEnable(!isEnable)} />
            <Text style={{ ...styles.termsText, paddingLeft: 6 }}>
              {Messages.iUnderstand}
            </Text>
          </View>
          <Button
            buttonStyle={{
              ...styles.buttonStyle,
              backgroundColor: isEnable ? Colors.royalBlue : Colors.greyOpacity
            }}
            textStyle={styles.buttonText}
            text={Messages.continue}
            onPress={() => {
              if (isEnable) {
                NavigationService.navigate(routes.root.CreateMnemonic);
              }
            }}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};
export default BackupWallet;
