import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

import VersionCheck from 'react-native-version-check';
import Header from '../../../../general/header/index';

import style from './style';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '../../../../common/constants';

class AboutApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      version: '0.0',
    };
  }

  componentDidMount() {
    const version = VersionCheck.getCurrentVersion(); // 0.1.1
    this.setState({
      version,
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
          {this.renderDetailsContainer(
            'Android version',
            'Data information: 2018120102022',
            `Version information ${this.state.version} (latest version)`
          )}
          {/* About IOS */}
          {this.renderDetailsContainer(
            'ios version',
            'Data information: 2018120102022',
            `Version information ${this.state.version} (latest version)`
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
