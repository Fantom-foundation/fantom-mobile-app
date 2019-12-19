import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  StatusBar
} from 'react-native';
import styles from './style';
import { CheckIcon } from '../../images';
class SuccessScreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { text, onPress } = this.props;
    return (
      <TouchableOpacity
        onPress={() => onPress()}
        style={styles.imageBackground}
      >
        <StatusBar barStyle="dark-content" />
        <View style={styles.mainContainer}>
          <Text style={styles.walletText}>{text}</Text>
          <Image
            source={CheckIcon}
            style={styles.checkIcon}
            resizeMode="contain"
          ></Image>
        </View>
      </TouchableOpacity>
    );
  }
}

export default SuccessScreen;
