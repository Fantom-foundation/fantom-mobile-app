import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StatusBar
} from 'react-native';
import styles from './style';
import { CheckIcon } from '../../images';
const SuccessScreen =(props:TSuccessScreenTypes)=> {
    const { text, onPress } = props;
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

export default SuccessScreen;
