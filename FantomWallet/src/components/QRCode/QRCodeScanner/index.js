// @flow
import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import {
  Animated,
  Easing,
  View,
  Platform,
  PermissionsAndroid,
} from 'react-native';

import Permissions from 'react-native-permissions';
import { RNCamera as Camera } from 'react-native-camera';

import NotAuthorizedView from './AuthorizedView/NotAuthorizedView';
import PendingAuthorizationView from './AuthorizedView/PendingAuthorizationView';

import styles from './styles';


const PERMISSION_AUTHORIZED = 'authorized';
const CAMERA_PERMISSION = 'camera';

const QRCodeScanner = (props: TQrCodeScannerTypes, ref) => {
  const {
    onRead,
    reactivate = false,
    reactivateTimeout = 0,
    fadeIn = true,
    showMarker = false,
    cameraType = 'back',
    permissionDialogTitle = 'Info',
    permissionDialogMessage = 'Need camera permission',
    checkAndroid6Permissions,
    customMarker,
    containerStyle,
    cameraStyle,
  }=props
  const fadeInOpacity = new Animated.Value(0);
  const [scanning, setScanning] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isAuthorizationChecked, setIsAuthorizationChecked] = useState();

  useEffect(() => {
    let isAuthorizedStatus = true;
    if (Platform.OS === 'ios') {
      Permissions.request(CAMERA_PERMISSION).then(response => {
        isAuthorizedStatus = response === PERMISSION_AUTHORIZED;
      });
    } else if (Platform.OS === 'android' && checkAndroid6Permissions) {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
        title: permissionDialogTitle,
        message: permissionDialogMessage,
      }).then(granted => {
        isAuthorizedStatus =
          Platform.Version >= 23
            ? granted === PermissionsAndroid.RESULTS.GRANTED
            : granted === true;
      });
    }
    setIsAuthorized(isAuthorizedStatus);
    setIsAuthorizationChecked(true);

    if (fadeIn) {
      Animated.sequence([
        Animated.delay(1000),
        Animated.timing(fadeInOpacity, {
          toValue: 1,
          easing: Easing.inOut(Easing.quad),
        }),
      ]).start();
    }
  });

  const _setScanning = (value: boolean) => setScanning(value);

  useImperativeHandle(ref, () => ({
    _setScanning,
  }));

  const _handleBarCodeRead = (e) => {
    if (!scanning) {
      _setScanning(true);
      onRead(e);
      if (!reactivate) return;
      setTimeout(() => _setScanning(false), reactivateTimeout);
    }
  };

  const _renderCameraMarker = () => {
    if (showMarker) {
      if (customMarker) return customMarker;
      return (
        <View style={styles.rectangleContainer}>
          <View style={styles.rectangle} />
        </View>
      );
    }
    return null;
  };

  const _renderCamera = () => {
    if (isAuthorized) {
      if (fadeIn) {
        return (
          <Animated.View
            style={{
              opacity: fadeInOpacity,
              backgroundColor: 'transparent',
            }}
          >
            <Camera
              style={[styles.camera, cameraStyle]}
              onBarCodeRead={_handleBarCodeRead}
              type={cameraType}
            >
              {_renderCameraMarker()}
            </Camera>
          </Animated.View>
        );
      }
      return (
        <Camera
          type={cameraType}
          style={[styles.camera, cameraStyle]}
          onBarCodeRead={_handleBarCodeRead}
        >
          {_renderCameraMarker()}
        </Camera>
      );
    }
    if (!isAuthorizationChecked) return <PendingAuthorizationView />;
    return <NotAuthorizedView />;
  };

  // const reactivate = () => _setScanning(false);

  return (
    <View style={[styles.mainContainer, containerStyle]}>{_renderCamera()}</View>
  );
};

// $FlowFixMe
export default forwardRef(QRCodeScanner);
