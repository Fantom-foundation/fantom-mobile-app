import React, { Component } from 'react';
import { View, Text } from 'react-native';

import VersionCheck from 'react-native-version-check';
import Header from '../../../../general/header/index';

import leftArrowIcon from '../../../../images/arrowLeft_White.png';
import style from './style';

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

  render() {
    return (
      <View style={style.container}>
        <View>
          <Header
            text="About App"
            leftButtonIcon="chevron-left"
            leftIconColor="#fff"
            leftIconSize={22}
            onLeftIconPress={() => this.onLeftIconPress()}
          />
        </View>
        <View style={style.body}>
          <View>
            <Text style={style.bold}>
              Android ver
              {this.state.version}
            </Text>
          </View>
          <View style={style.margin20}>
            <Text>Data information: 2018120102022</Text>
            <Text>Version information 1.0 (latest version)</Text>
          </View>
          <View>
            <Text style={{ fontWeight: 'bold', marginTop: 20 }}>iOS ver1.0</Text>
          </View>
          <View style={style.margin20}>
            <Text>Data information: 2018120102022</Text>
            <Text>Version information 1.0 (latest version)</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default AboutApp;
