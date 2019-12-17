import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar
} from 'react-native';
import styles from './styles';
import { CrossIcon, RightArrowIcon } from '../../../images';
class AddWallet extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.mainView}>
        <SafeAreaView style={styles.mainView}>
          <StatusBar barStyle="dark-content" />
          <View style={styles.headingView}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={CrossIcon}
                style={styles.crossIcon}
                resizeMode="contain"
              ></Image>
            </TouchableOpacity>

            <Text style={styles.headingText}>Add wallet</Text>
          </View>
          <TouchableOpacity
            style={styles.middleView}
            onPress={() => navigation.navigate('BackupWallet')}
          >
            <Text style={styles.rowsText}>Create wallet</Text>
            <TouchableOpacity>
              <Image
                source={RightArrowIcon}
                style={styles.iconStyle}
                resizeMode="contain"
              ></Image>
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.middleView}
            onPress={() => navigation.navigate('RecoverWallet')}
          >
            <Text style={styles.rowsText}>Import wallet</Text>
            <TouchableOpacity>
              <Image
                source={RightArrowIcon}
                style={styles.iconStyle}
                resizeMode="contain"
              ></Image>
            </TouchableOpacity>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    );
  }
}

export default AddWallet;
