// @flow
// Libraries
import React from 'react';
import { View, Dimensions, ActivityIndicator } from 'react-native';

import styles from './styles';

// Calculate  max height of device
const deviceHeight = Dimensions.get('window').height;

type Props = {
  loaderStyle?: number,
  loaderColor?: string,
  isLoading?: boolean,
};

/**
 * @param  {} {loaderStyle - decimal height factor (?)
 * @param  {} loaderColor
 * @param  {Props} isLoading=false}
 */
export default ({ loaderStyle, loaderColor, isLoading = false }: Props) => {
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
