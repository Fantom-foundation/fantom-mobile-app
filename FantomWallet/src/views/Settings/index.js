// @flow
// Library
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  FlatList,
  Switch,
  Platform,
  Linking
} from "react-native";
import RNPickerSelect from "react-native-picker-select";

// Components
import Header from "~/components/Header/index";
// Images
import AboutApp from "~/images/AboutApp.png";
import AddressBook from "~/images/AddressBook.png";
import CustomerSupport from "~/images/CustomerSupport.png";
import BackgroundIcon from "~/images/BackgroundIcon.png";
// import PrivacyPolicy from '~/images/PrivacyPolicy.png';
// import TermsOfServices from '~/images/TermsOfServices.png';
import { NavigationService } from "~/navigation/helpers";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { setLanguage } from "../../redux/language/actions";
import { connect } from "react-redux";
// import { Switch } from 'react-native-switch';
// Styling
import styles from "./styles";
import {
  CrossIcon,
  ShareIcon,
  ReviewIcon,
  QuestionIcon,
  TelegramIcon,
  TwitterIcon,
  WalletIcon,
  MoonIcon,
  DollarIcon,
  NotificationIcon,
  RightArrowIcon,
  PlusIcon,
  ShieldIcon,
  RegionLaguage
} from "../../images";
import { Colors } from "../../theme";
import { getHeight } from "../../utils/pixelResolver";
import { Messages, helper } from "../../theme";
import { setMylanguage } from "../../theme/messages";

const SettingsContainer = (props: TSettingsScreenTypes) => {
  const { navigation, setLanguage, language } = props;
  const [notificationSwitchValue, setNotificationSwitchValue] = useState(false);
  const [darkSwitchValue, setDarkSwitchValue] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const openUrl = url => Linking.openURL(url);
  const dropdownRef = useRef(null);
  const settingData = helper();

  const navigateTo = item => navigation.navigate(item.to);

  const getFunctionToCall = item => {
    if (item) {
      if (item.to) return () => navigateTo(item);
      if (item.isOpenUrl) return () => openUrl("https://Fantom.foundation");
      if (item.isShareApp) return () => shareTheApp();
      if (item.isLanguageSelect) {
        return () => {
          console.log(dropdownRef.current, "ref");
          dropdownRef &&
            dropdownRef.current &&
            dropdownRef.current.togglePicker(false, null);
        };
      }
    }
  };

  shareTheApp = () => {
    const url =
      Platform.OS === "android"
        ? "https://play.google.com/store/apps/details?id=com.fantomwallet"
        : "https://itunes.apple.com/us/app/fantom-payments-testnet/id1436694080?ls=1&mt=8";
    openUrl(url);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.mainView}>
            <View style={styles.settingView}>
              <Text style={styles.settingText}>{Messages.settings}</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <Image
                  source={CrossIcon}
                  style={styles.crossIcon}
                  resizeMode="contain"
                ></Image>
              </TouchableOpacity>
            </View>

            <FlatList
              data={settingData}
              extraData={[notificationSwitchValue, darkSwitchValue]}
              renderItem={({ item, index }) => {
                const functionToCall = getFunctionToCall(item);
                return (
                  <View style={styles.mainContainer}>
                    <TouchableOpacity
                      onPress={functionToCall}
                      style={{
                        ...styles.rowsView,
                        marginTop: index === 0 ? getHeight(55) : getHeight(42)
                      }}
                    >
                      <View style={styles.leftView}>
                        <Image
                          source={item.source}
                          style={styles.iconStyle}
                          resizeMode="contain"
                        ></Image>
                        <Text style={styles.textStyle}>{item.text}</Text>
                        {item.isLanguageSelect && (
                          <View style={styles.languageView}>
                            <RNPickerSelect
                              ref={dropdownRef}
                              placeholder={{
                                label: "Phone Language",
                                value: "defaultphoneLanguage"
                              }}
                              value={selectedLanguage}
                              onValueChange={value => {
                                setMylanguage(value);
                                setSelectedLanguage(value);
                                setLanguage(value);
                              }}
                              items={[
                                { label: "English", value: "en" },
                                { label: "Chinese", value: "zh-Hans" },
                                { label: "Korean", value: "ko" }
                              ]}
                            />
                          </View>
                        )}
                      </View>

                      {item.rightArrowIcon ? (
                        <Image
                          source={item.rightArrowIcon}
                          style={{
                            ...styles.iconStyle,
                            tintColor: Colors.grey
                          }}
                          resizeMode="contain"
                        ></Image>
                      ) : null}
                      {item.notificationsToggleButton && (
                        <Switch
                          value={notificationSwitchValue}
                          onTintColor={Colors.blackOpacity}
                          thumbColor={Colors.grey}
                          tintColor={Colors.grey}
                          trackColor={Colors.grey}
                          onValueChange={notificationSwitchValue => {
                            setNotificationSwitchValue(notificationSwitchValue);
                          }}
                        />
                      )}
                      {item.darkToggleButton && (
                        <Switch
                          value={darkSwitchValue}
                          onTintColor={Colors.blackOpacity}
                          thumbColor={Colors.grey}
                          tintColor={Colors.grey}
                          trackColor={Colors.grey}
                          onValueChange={darkSwitchValue => {
                            setDarkSwitchValue(darkSwitchValue);
                          }}
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
            {/* {isLanguageDropDown ? ( */}

            {/* ) : null} */}

            <View style={styles.bottomView}>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL("https://twitter.com/fantomfdn?lang=en).")
                }
              >
                <Image
                  source={TwitterIcon}
                  style={styles.imageStyle}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => Linking.openURL("https://t.me/Fantom_English")}
              >
                <Image
                  source={TelegramIcon}
                  style={styles.imageStyle}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
  // }
};

const mapStateToProps = state => ({
  language: state.selectedLanguage
});

const mapDispatchToProps = {
  setLanguage: setLanguage
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer);
