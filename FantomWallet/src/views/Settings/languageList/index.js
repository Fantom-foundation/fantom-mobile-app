import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  FlatList,
  NativeModules,
  Platform
} from "react-native";
import styles from "./styles";
import { CrossIcon } from "../../../images";
import { NavigationService, routes } from "~/navigation/helpers";
import { setLanguage } from "../../../redux/language/actions";
import { connect } from "react-redux";
import { setMylanguage, Messages } from "../../../theme";
import Entypo from "react-native-vector-icons/Entypo";

const LanguageSelect = props => {
  const { language } = props;
  const [selectedLanguage, setSelectedLanguage] = useState(
    language.selectedLanguage
  );
  const languageList = [
    {
      name: Messages.phoneLang,
      value: ""
    },
    {
      name: "English",
      value: "en"
    },
    {
      name: "简体中文",
      value: "zh-Hans"
    },
    {
      name: "한국어",
      value: "ko"
    },
    {
      name: "Tiếng Việt",
      value: "vi"
    }
  ];

  const handleLanguageSelect = (item, index) => {
    const { setLanguage } = props;
    if (item.value === "") {
      setLanguage(item.value);
      setSelectedLanguage(item.value);
      if (Platform.OS === "ios") {
        const locale = NativeModules.SettingsManager.settings.AppleLocale;
        if (locale.includes("ko")) setMylanguage("ko");
        else if (locale.includes("zh")) setMylanguage("zh-Hans");
        else if (locale.includes("vi")) setMylanguage("vi");
        else setMylanguage("en");
      }
      if (Platform.OS === "android") {
        const locale1 = NativeModules.I18nManager.localeIdentifier;
        if (locale1.includes("ko")) setMylanguage("ko");
        else if (locale1.includes("zh")) setMylanguage("zh-Hans");
        else if (locale1.includes("vi")) setMylanguage("vi");
        else setMylanguage("en");
      }
      NavigationService.pop();
    } else {
      setLanguage(item.value);
      setMylanguage(item.value);
      setSelectedLanguage(item.value);
      NavigationService.pop();
    }
  };
  return (
    <View style={styles.mainView}>
      <SafeAreaView style={styles.mainView}>
        <StatusBar barStyle="dark-content" />

        <View style={styles.headingView}>
          <TouchableOpacity onPress={() => NavigationService.pop()}>
            <Image
              source={CrossIcon}
              style={styles.crossIcon}
              resizeMode="contain"
            ></Image>
          </TouchableOpacity>
          <Text style={styles.headingText}>{Messages.chooseLang}</Text>
        </View>

        <FlatList
          data={languageList}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                style={styles.languageSelect}
                onPress={() => handleLanguageSelect(item, index)}
              >
                <Text style={styles.languageText}>{item.name}</Text>
                {selectedLanguage === item.value && (
                  <Entypo name="check" size={25} color="green" />
                )}
              </TouchableOpacity>
            );
          }}
        />
      </SafeAreaView>
    </View>
  );
};

const mapStateToProps = state => ({
  language: state.selectedLanguage
});

const mapDispatchToProps = {
  setLanguage: setLanguage
};

export default connect(mapStateToProps, mapDispatchToProps)(LanguageSelect);
