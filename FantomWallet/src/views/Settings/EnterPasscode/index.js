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
    const { navigation } = this.props;
    handleInputNumber = (item, index) => {
      const { navigation } = this.props;
      const { numberClicked } = this.state;
      if (numberClicked.length <= 6) {
        this.setState({
          numberClicked: numberClicked.concat(item)
        });
      }
      if (numberClicked.concat(item).length === 6) {
        navigation.navigate('PrivacyAndSecurity');
      }
      if (item === '<') {
        let num = numberClicked.slice(0, -1);
        this.setState({ numberClicked: num });
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
              extraData={this.state.numberClicked}
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
  }
}

export default EnterPasscode;
