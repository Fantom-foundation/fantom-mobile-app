// @flow
import React, { useState } from 'react';
import { View, WebView, ActivityIndicator } from 'react-native';

import Header from '~/components/Header';
import styles from './styles';
import crossButton from '~/images/crossButtonWhite.png';



/**
 * TermsConditions :  This component is meant for displaying legal requirements of the application.
 */
const TermsConditions = (props: TTermsConditionsTypes) => {
  const { navigation } = props;
  const [visible, setVisible] = useState(true);
  const uri = 'http://fantom.foundation';

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAndroidPress);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAndroidPress);
  }, []);
  const backAndroidPress = () => {
    BackHandler.exitApp();
    return true;
  };
  const onRightIconPress = () => navigation.goBack();
  const hideSpinner = () => setVisible(false);
  

  return (
    <View style={styles.mainContainerStyle}>
      <Header
        text="Terms of Service"
        rightButtonIcon={crossButton}
        isRightBtnImage
        onRightIconPress={onRightIconPress}
        textStyle={styles.headerComponentText}
        headerStyle={styles.headerComponent}
      />
      <WebView source={{ uri }} onLoad={hideSpinner} onError={hideSpinner} />
      {visible && (
        <View style={styles.containerIndicator}>
          <ActivityIndicator size="large" color="#111" />
        </View>
      )}
      {/* <View style={styles.footerStyle}>
          <Button text="Confirm" buttonStyle={{ fontFamily: 'SegoeUI' }} />
        </View> */}
    </View>
  );
};

export default TermsConditions;
