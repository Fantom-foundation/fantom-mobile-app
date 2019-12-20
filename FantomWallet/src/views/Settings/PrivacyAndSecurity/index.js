import React, { Component } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  Switch,
  StatusBar,
  TouchableOpacity,
  FlatList
} from 'react-native';
import styles from './styles';
import { CrossIcon } from '../../../images';
import { Colors } from '../../../theme';
import _ from 'lodash';
class PrivacyAndSecurity extends Component {
  state = {
    listKeys: [
      { key: 'Passcode', switch: false },
      { key: 'Fingerprint authentication', switch: false },
      { key: 'Show total balance on home', switch: false },
      { key: 'Hide all balances by default', switch: false }
    ]
  };
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.mainContainer}>
        <SafeAreaView style={styles.mainContainer}>
          <StatusBar barStyle="dark-content" />
          <View style={styles.headingView}>
            <TouchableOpacity
              onPress={() => navigation.navigate('SettingsContainer')}
            >
              <Image
                source={CrossIcon}
                style={styles.crossIcon}
                resizeMode="contain"
              ></Image>
            </TouchableOpacity>
            <Text style={styles.headingText}>Privacy and security</Text>
          </View>
          <FlatList
            data={this.state.listKeys}
            renderItem={this.listItem}
          />
        </SafeAreaView>
      </View>
    );
  }
  listItem = ({ item, index }) => {
    return (
      <View style={styles.mainView}>
        <View style={styles.rowsView}>
          <Text style={styles.rowsText}>{item.key}</Text>
          <Switch
            ios_backgroundColor={Colors.white}
            onTintColor={Colors.blackOpacity}
            thumbColor={Colors.grey}
            tintColor={Colors.grey}
            trackColor={Colors.grey}
            onValueChange={value => this.setSwitchValue(value, index)}
            value={item.switch}
          />
        </View>
      </View>
    );
  };
  setSwitchValue = (val, ind) => {
    const { navigation } = this.props;
    const tempData = _.cloneDeep(this.state.listKeys);
    tempData[ind].switch = val;
    this.setState({ listKeys: tempData });
    if (ind === 0 && val === true) {
      navigation.navigate('EnterPasscode');
    }
  };
}

export default PrivacyAndSecurity;
