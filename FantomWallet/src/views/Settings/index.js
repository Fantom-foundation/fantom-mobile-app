// @flow
// Library
import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  FlatList,
  Switch
} from 'react-native';

// Components
import Header from '~/components/Header/index';
// Images
import AboutApp from '~/images/AboutApp.png';
import AddressBook from '~/images/AddressBook.png';
import CustomerSupport from '~/images/CustomerSupport.png';
import BackgroundIcon from '~/images/BackgroundIcon.png';
// import PrivacyPolicy from '~/images/PrivacyPolicy.png';
// import TermsOfServices from '~/images/TermsOfServices.png';
import { NavigationService } from '~/navigation/helpers';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import { Switch } from 'react-native-switch';
// Styling
import styles from './styles';
import {
  CrossIcon,
  ShareIcon,
  ReviewIcon,
  AboutIcon,
  TelegramIcon,
  TwitterIcon,
  WalletIcon,
  MoonIcon,
  DollarIcon,
  NotificationIcon,
  RightArrowIcon,
  PlusIcon,
  ShieldIcon
} from '../../images';
import { Colors } from '../../theme';
import { getHeight } from '../../utils/pixelResolver';
type Props = {
  navigation: {
    navigate: string => void,
    goBack: () => void
  }
};

const settingData = [
  {
    Icon: FontAwesome,
    iconName: 'plus-square',
    text: 'Add wallet',
    rightArrowIcon: RightArrowIcon,
    source: PlusIcon
  },
  {
    Icon: Entypo,
    iconName: 'wallet',
    text: 'Manage wallets',
    rightArrowIcon: RightArrowIcon,
    source: WalletIcon
  },
  {
    Icon: Ionicons,
    iconName: 'md-moon',
    text: 'Dark Mode',
    rightArrowIcon: '',
    source: MoonIcon
  },
  {
    Icon: MaterialIcons,
    iconName: 'security',
    text: 'Privacy and security',
    rightArrowIcon: RightArrowIcon,
    source: ShieldIcon
  },
  {
    Icon: Entypo,
    iconName: 'notification',
    text: 'Push notifications',
    rightArrowIcon: '',
    source: NotificationIcon
  },
  {
    Icon: FontAwesome,
    iconName: 'dollar',
    text: 'Currency',
    rightArrowIcon: RightArrowIcon,
    source: DollarIcon
  },
  {
    Icon: Entypo,
    iconName: 'share',
    text: 'Share with your friends',
    rightArrowIcon: RightArrowIcon,
    source: ShareIcon
  },
  {
    Icon: FontAwesome,
    iconName: 'question-circle',
    text: 'About',
    rightArrowIcon: RightArrowIcon,
    source: AboutIcon
  },
  {
    Icon: Entypo,
    iconName: 'heart',
    text: 'Leave a review',
    rightArrowIcon: RightArrowIcon,
    source: ReviewIcon
  }
];

class SettingsContainer extends Component {
  state = {
    switchValue: null
  };
  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="dark-content" />
          <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.mainView}>
              <View style={styles.settingView}>
                <Text style={styles.settingText}>Settings</Text>
                <Image
                  source={CrossIcon}
                  style={styles.crossIcon}
                  resizeMode="contain"
                ></Image>
              </View>
              <FlatList
                data={settingData}
                renderItem={({ item, index }) => {
                  // const { Icon } = item;
                  return (
                    <View style={styles.mainContainer}>
                      <TouchableOpacity
                        style={{
                          ...styles.rowsView,
                          marginTop: index === 0 ? getHeight(55) : getHeight(42)
                        }}
                      >
                        <View style={styles.leftView}>
                          {/* <Icon
                            name={item.iconName}
                            size={18}
                            color={Colors.black}
                            style={{height: 20, width: 20}}
                          /> */}
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
                        ) : (
                            <Switch
                              ios_backgroundColor={Colors.blackOpacity}
                              value={this.state.switchValue}
                              onTintColor={Colors.blackOpacity}
                              thumbColor={Colors.grey}
                              tintColor={Colors.blackOpacity}
                              trackColor={Colors.blackOpacity}
              
                            // value={this.state.switchValue}
                            onValueChange={switchValue => {
                              this.setState({ switchValue })}
                            }
                          />
                        )}
                      </TouchableOpacity>
                    </View>
                  );
                }}
              />
              <View style={styles.bottomView}>
                <TouchableOpacity>
                  <Image
                    source={TwitterIcon}
                    style={styles.imageStyle}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <TouchableOpacity>
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
  }
}
export default SettingsContainer;
