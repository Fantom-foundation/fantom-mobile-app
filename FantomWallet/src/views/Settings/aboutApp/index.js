// @flow
/* eslint-disable global-require */
import React, { useState, useEffect } from 'react';
import { View, Text, Image, Platform } from 'react-native';
import VersionCheck from 'react-native-version-check';

import { NavigationService } from '~/navigation/helpers';
import Header from '~/components/Header/index';

import styles from './styles';

const AboutApp = () => {
  const [version, setVersion] = useState('0.0');
  const [build, setBuild] = useState('0.0');
  const [packageName, setPackageName] = useState('com.foundation');

  useEffect(() => {
    setVersion(VersionCheck.getCurrentVersion());
    setBuild(VersionCheck.getCurrentBuildNumber());
    setPackageName(VersionCheck.getPackageName());
  });

  const onLeftIconPress = () => NavigationService.pop();

  return (
    <View style={styles.container}>
      <Header
        text="About App"
        leftButtonIcon="chevron-left"
        leftIconColor="#fff"
        leftIconSize={30}
        onLeftIconPress={onLeftIconPress}
        textStyle={styles.headerComponentText}
        headerStyle={styles.headerComponent}
      />
      <View style={styles.innerContainerStyle}>
        <View style={styles.detailsContainer}>
          <View style={styles.detailsHeaderContainer}>
            <Text style={styles.detailHeaderText}>
              {`${Platform.OS === 'ios' ? 'iOS' : 'Android'} version`} {version}
            </Text>
          </View>
          <View style={styles.innerDetailsContainer}>
            <Text style={styles.detailsInnerText}>{`Data information: ${packageName}`}</Text>
            <Text style={styles.detailsInnerText}>{`Build number ${build}`}</Text>
          </View>
        </View>
        <Image
          style={styles.backgroundImageStyle}
          source={require('~/images/BackgroundIcon.png')}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

export default AboutApp;
