// @flow
import React, { useState } from 'react';
import { View, WebView, ActivityIndicator } from 'react-native';

import Header from '~/components/Header';
import crossButton from '~/images/crossButtonWhite.png';
import styles from './styles';
/**
 * PrivacyPolicy :  This component is meant for displaying Privacy Policy for users of the application.
 */
const PrivacyPolicy = (props: TPrivacyPolicyTypes) => {
  const { navigation } = props;
  const [visible, setVisible] = useState(true);
  const uri = 'http://fantom.foundation';

  const onRightIconPress = () => navigation.goBack();
  const hideSpinner = () => setVisible(false);

  return (
    <View style={styles.mainContainerStyle}>
      <Header
        text="Privacy Policy"
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
          <Button text="Confirm" />
        </View> */}
    </View>
  );
};

export default PrivacyPolicy;
