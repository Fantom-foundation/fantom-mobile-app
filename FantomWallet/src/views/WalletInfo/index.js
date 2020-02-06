import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Clipboard
} from "react-native";
import styles from "./styles";
import { connect } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { setDopdownAlert as setDopdownAlertAction } from "~/redux/notification/actions";
import {
  setWalletName as setWalletNameAction,
  setCurrentWallet
} from "~/redux/wallet/actions";
import Feather from "react-native-vector-icons/Feather";
import { Colors } from "../../theme/colors";
import Button from "../../components/general/Button";
import { NavigationService, routes } from "~/navigation/helpers";
import { Messages } from "../../theme";

const WalletInfo = (props: TWalletInfoTypes) => {
  const {
    navigation,
    setWalletName,
    setDopdownAlert,
    setCurrentWallet,
    walletsData,
    language
  } = props;
  const publicKey = navigation.getParam("publicKey", "");
  const [renameIconPressed, setRenameIconPressed] = useState(false);
  const [name, setName] = useState(Messages.myFantomWallet);
  const [currLang, setCurrLang] = useState(language.selectedLanguage);
  useEffect(() => {
    if (name === "My Fantom Wallet") {
      setName(Messages.myFantomWallet);
    }
  }, [language.selectedLanguage]);

  const handleContinue = () => {
    setWalletName({ name: name || Messages.myFantomWallet, publicKey });
    setCurrentWallet({ name: name || Messages.myFantomWallet, publicKey });
    NavigationService.navigate(routes.root.HomeScreen);
  };

  const copyToClipboard = address => {
    Clipboard.setString(address);
    setDopdownAlert("custom", Messages.copied);
  };

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.headingView}>
          <Text style={styles.headingText}>{Messages.walletInfo}</Text>
        </View>
        <Text style={styles.addressText}>{Messages.address}</Text>
        <View style={styles.codeView}>
          <Text style={styles.codeText}>{publicKey}</Text>
          <TouchableOpacity onPress={() => copyToClipboard(publicKey)}>
            <Ionicons name="ios-copy" size={22} color={Colors.textBlack} />
          </TouchableOpacity>
        </View>
        <Text style={styles.addressText}>{Messages.name}</Text>
        <View style={styles.codeView}>
          {renameIconPressed ? (
            <TextInput
              style={styles.textInput}
              value={name}
              onChangeText={value => setName(value)}
            />
          ) : (
            <Text style={styles.codeText}>{name}</Text>
          )}
          <TouchableOpacity
            onPress={() => setRenameIconPressed(!renameIconPressed)}
          >
            {name !== "" && renameIconPressed ? (
              <Feather
                name="check"
                size={20}
                color={Colors.textBlack}
              ></Feather>
            ) : (
              <EvilIcons name="pencil" size={20} color={Colors.textBlack} />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            buttonStyle={styles.buttonStyle}
            onPress={handleContinue}
            textStyle={styles.buttonText}
            text={"CONTINUE"}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

const mapStateToProps = state => ({
  walletsData: state.wallet.walletsData,
  language: state.selectedLanguage
});

const mapDispatchToProps = {
  setDopdownAlert: setDopdownAlertAction,
  setWalletName: setWalletNameAction,
  setCurrentWallet
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletInfo);
