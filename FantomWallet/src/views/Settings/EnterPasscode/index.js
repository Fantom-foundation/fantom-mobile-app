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
import { CrossIcon, EqualIcon } from '../../../images';
import { Colors } from '../../../theme';
import { getHeight, getWidth } from '../../../utils/pixelResolver';

import _ from 'lodash';
const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '<'];
class EnterPasscode extends Component {
  state = {
    numberClicked: ''
  };
  render() {
    const { numberClicked } = this.state;
    handleInputNumber = item => {
      const { numberClicked } = this.state;
      if (numberClicked.length <= 6) {
        this.setState(
          {
            numberClicked: numberClicked.concat(item)
          },
          console.log('Numbers', numberClicked)
        );
      }
    };
    return (
      <View style={styles.mainContainer}>
        <SafeAreaView style={styles.mainContainer}>
          <StatusBar barStyle="dark-content" />
          <View style={styles.headingView}>
            <TouchableOpacity>
              <Image
                source={CrossIcon}
                style={styles.crossIcon}
                resizeMode="contain"
              ></Image>
            </TouchableOpacity>
            <Text style={styles.headingText}>Enter your passcode</Text>
          </View>
          <View style={styles.inputView}>
            {numberClicked.length >= 1 ? (
              <View style={styles.filedCircleView} />
            ) : (
              <View style={styles.circleView} />
            )}
            {numberClicked.length >= 2 ? (
              <View style={styles.filedCircleView} />
            ) : (
              <View style={styles.circleView} />
            )}
            {numberClicked.length >= 3 ? (
              <View style={styles.filedCircleView} />
            ) : (
              <View style={styles.circleView} />
            )}
            {numberClicked.length >= 4 ? (
              <View style={styles.filedCircleView} />
            ) : (
              <View style={styles.circleView} />
            )}
            {numberClicked.length >= 5 ? (
              <View style={styles.filedCircleView} />
            ) : (
              <View style={styles.circleView} />
            )}
            {numberClicked.length >= 6 ? (
              <View style={styles.filedCircleView} />
            ) : (
              <View style={styles.circleView} />
            )}
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
                    onPress={() => handleInputNumber(item)}
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
  }
}

export default EnterPasscode;
