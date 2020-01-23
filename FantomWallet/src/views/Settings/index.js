// @flow
// Library
import React, { useState } from "react";
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
  ShieldIcon
} from "../../images";
import { Colors } from "../../theme";
import { getHeight } from "../../utils/pixelResolver";
import { Messages } from "../../theme";

const settingData = [
  {
    text: Messages.addWallet,
    rightArrowIcon: RightArrowIcon,
    source: PlusIcon,
    notificationsToggleButton: false,
    darkToggleButton: false,
    to: "AddWallet"
  },
  {
    text: Messages.manageWallet,
    rightArrowIcon: RightArrowIcon,
    source: WalletIcon,
    notificationsToggleButton: false,
    darkToggleButton: false,
    to: "ManageWallet"
  },
  // {
  //   text: 'Dark Mode',
  //   rightArrowIcon: '',
  //   source: MoonIcon,
  //   notificationsToggleButton: false,
  //   darkToggleButton: true
  // },
  // {
  //   text: 'Dark Mode',
  //   rightArrowIcon: '',
  //   source: MoonIcon,
  //   notificationsToggleButton: false,
  //   darkToggleButton: true
  // },
  // {
  //   text: 'Privacy and security',
  //   rightArrowIcon: RightArrowIcon,
  //   source: ShieldIcon,
  //   notificationsToggleButton: false,
  //   darkToggleButton: false,
  //   to: 'PrivacyAndSecurity'
  // },
  // {
  //   text: 'Push notifications',
  //   rightArrowIcon: '',
  //   source: NotificationIcon,
  //   notificationsToggleButton: true,
  //   darkToggleButton: false
  // },
  // {
  //   text: 'Currency',
  //   rightArrowIcon: RightArrowIcon,
  //   source: DollarIcon,
  //   notificationsToggleButton: false,
  //   darkToggleButton: false,
  //   to: 'Currency'
  // },
  {
    text: Messages.shareWithFreinds,
    rightArrowIcon: RightArrowIcon,
    source: ShareIcon,
    notificationsToggleButton: false,
    darkToggleButton: false,
    isShareApp: true
  },
  {
    text: Messages.about,
    rightArrowIcon: RightArrowIcon,
    source: QuestionIcon,
    notificationsToggleButton: false,
    darkToggleButton: false,
    isOpenUrl: true
  },
  {
    text: Messages.review,
    rightArrowIcon: RightArrowIcon,
    source: ReviewIcon,
    notificationsToggleButton: false,
    darkToggleButton: false,
    isShareApp: true
  }
];

const SettingsContainer = (props: TSettingsScreenTypes) => {
  const { navigation } = props;
  const [notificationSwitchValue, setNotificationSwitchValue] = useState(false);
  const [darkSwitchValue, setDarkSwitchValue] = useState(false);

  const openUrl = url => Linking.openURL(url);

  const navigateTo = item => navigation.navigate(item.to);

  const getFunctionToCall = item => {
    if (item) {
      if (item.to) return () => navigateTo(item);
      if (item.isOpenUrl) return () => openUrl("https://Fantom.foundation");
      if (item.isShareApp) return () => shareTheApp();
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
export default SettingsContainer;
