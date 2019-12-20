import React, { useState } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  StatusBar,
  TouchableOpacity,
  FlatList
} from 'react-native';
import styles from './styles';
import { CrossIcon } from '../../../images';
import { getWidth } from '../../../utils/pixelResolver';
import _ from 'lodash';

const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '<'];
const EnterPasscode = props => {
  const [numberClicked, setNumberClicked] = useState('');
  const { navigation } = props;
  handleInputNumber = (item, index) => {
    const { navigation } = props;
    if (numberClicked.length <= 6) {
      setNumberClicked(numberClicked.concat(item));
    }
    if (numberClicked.concat(item).length === 6) {
      navigation.navigate('PrivacyAndSecurity');
    }
    if (item === '<') {
      let num = numberClicked.slice(0, -1);
      setNumberClicked(num);
    }
  };
  return (
    <View style={styles.mainContainer}>
      <SafeAreaView style={styles.mainContainer}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.headingView}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={CrossIcon}
              style={styles.crossIcon}
              resizeMode="contain"
            ></Image>
          </TouchableOpacity>
          <Text style={styles.headingText}>Enter your passcode</Text>
        </View>
        <View style={styles.inputView}>
          <FlatList
            data={[1, 2, 3, 4, 5, 6]}
            extraData={numberClicked}
            renderItem={({ item, index }) => {
              return (
                <View
                  style={
                    numberClicked.length <= index
                      ? styles.circleView
                      : styles.filedCircleView
                  }
                />
              );
            }}
            keyExtractor={item => item.id}
            numColumns={6}
          />
        </View>
        <View style={styles.keyPadView}>
          <FlatList
            data={numbers}
            renderItem={({ item, index }) => {
              let marginLeft = getWidth(58);
              let marginTop = index <= 2 ? 0 : 17;
              if (index === 0 || index === 3 || index === 6 || index === 9)
                marginLeft = 0;
              return (
                <TouchableOpacity
                  style={[
                    styles.numberButton,
                    { marginLeft: marginLeft, marginTop: marginTop }
                  ]}
                  onPress={() => handleInputNumber(item, index)}
                >
                  <Text style={styles.numberText}>{item}</Text>
                </TouchableOpacity>
              );
            }}
            numColumns={3}
            keyExtractor={index => index.toString()}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};
export default EnterPasscode;
