// Libraries
import React, { PureComponent } from 'react';
import { View, Dimensions, ActivityIndicator, StyleSheet } from 'react-native';

// Calculate  max height and width of device
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

// Styling
const styles = StyleSheet.create({
  overlayView: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 1.0,
    backgroundColor: 'rgba(100, 100, 100, 0.3)',
    width: deviceWidth,
    height: deviceHeight,
    zIndex: 12200,
  },
  activityIndicator: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
  },
});

export default class Loading extends PureComponent {
  render() {
    const { loaderStyle } = this.props;
    const marginStyle = loaderStyle ? deviceHeight * loaderStyle - 40 : deviceHeight * 0.5 - 40;
    if (this.props.isLoading && this.props.isLoading === false) {
      return null;
    }
    return (
      <View style={styles.overlayView}>
        <ActivityIndicator
          animating
          style={[styles.activityIndicator, { marginTop: marginStyle }]}
          size="large"
          color="rgba(0,0,0,1)"
        />
      </View>
    );
  }
}

// Specifies the default values for props:
Loading.defaultProps = {
  isLoading: false,
};
