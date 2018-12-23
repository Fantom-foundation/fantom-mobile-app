import React, { Component } from 'react';
import { View, Text, Image, Platform } from 'react-native';

import VersionCheck from 'react-native-version-check';
import Header from '../../../../general/header/index';

import style from './style';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '../../../../common/constants';

class AboutApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      version: '0.0',
      build: '0.0',
      packageName: 'com.foundation',
    };
  }

  componentDidMount() {
    const version = VersionCheck.getCurrentVersion(); // 0.1.1
    const build = VersionCheck.getCurrentBuildNumber();
    const packageName = VersionCheck.getPackageName();
    this.setState({
      version,
      build,
      packageName,
    });
  }

  onLeftIconPress() {
    this.props.navigation.goBack();
  }

  renderDetailsContainer(headimgText, firstLineText, secondLineText) {
    return (
      <View style={style.detailsContainer}>
        <View style={style.detailsHeaderContainer}>
          <Text style={style.detailHeaderText}>
            {headimgText} {this.state.version}
          </Text>
        </View>
        <View style={style.innerDetailsContainer}>
          <Text style={style.detailsInnerText}>{firstLineText}</Text>
          <Text style={style.detailsInnerText}>{secondLineText}</Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={style.container}>
        <Header
          text="About App"
          leftButtonIcon="chevron-left"
          leftIconColor="#fff"
          leftIconSize={30}
          leftButtonStyle={{ marginLeft: -10 }}
          onLeftIconPress={() => this.onLeftIconPress()}
          textStyle={{ fontFamily: 'SFProDisplay-Semibold' }}
          headerStyle={{
            backgroundColor: 'rgb(44,52,58)',
            height: DEVICE_HEIGHT < 810 ? 84 : (106 / 812) * DEVICE_HEIGHT,
          }}
        />
        <View style={style.innerContainerStyle}>
          {/* About Android */}
          {Platform.OS !== 'ios' &&
            this.renderDetailsContainer(
              'Android version',
              `Data information: ${this.state.packageName}`,
              `Build number ${this.state.build}`
            )}
          {/* About IOS */}
          {Platform.OS === 'ios' &&
            this.renderDetailsContainer(
              'iOS version',
              `Data information: ${this.state.packageName}`,
              `Build number ${this.state.build}`
            )}
          <Image
            style={style.backgroundImageStyle}
            source={require('../../../../images/BackgroundIcon.png')}
            resizeMode="contain"
          />
        </View>
      </View>
    );
  }
}

export default AboutApp;
