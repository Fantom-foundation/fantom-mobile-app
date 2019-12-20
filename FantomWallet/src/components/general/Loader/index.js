// @flow
// Libraries
import React from 'react';
import { View, Dimensions, ActivityIndicator } from 'react-native';

import styles from './styles';

// Calculate  max height of device
const deviceHeight = Dimensions.get('window').height;


/**
 * @param  {} {loaderStyle - decimal height factor (?)
 * @param  {} loaderColor
 * @param  {Props} isLoading=false}
 */
export default (props: TLoaderTypes) =>
{
  const { loaderStyle, loaderColor, isLoading = false }=props
  const activityIndicatorColor = loaderColor || 'rgba(0,0,0,1)';
  const marginStyle = loaderStyle ? deviceHeight * loaderStyle - 40 : deviceHeight * 0.5 - 40;
  if (isLoading && isLoading === false) {
    return null;
  }
  return (
    <View style={styles.overlayView}>
      <ActivityIndicator
        animating
        style={[styles.activityIndicator, { marginTop: marginStyle }]}
        size="large"
        color={activityIndicatorColor}
      />
    </View>
  );
};
