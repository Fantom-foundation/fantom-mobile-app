import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { Colors } from "../../theme/colors";

export const Loader = props => {
  const { size, style } = props;
  return (
    <View style={styles.container}>
      <ActivityIndicator
        style={[styles.loader, style]}
        size={size}
        color={Colors.royalBlue}
      />
    </View>
  );
};

Loader.defaultProps = {
  size: "large",
  style: null
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.blackOpacityExtraLight,
    bottom: 0,
    elevation: 999,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
    // flex: 1,
    zIndex: 999,
    // flexDirection: 'column',
    alignItems: "center",
    justifyContent: "center"
    // alignSelf: 'center',
  },
  loader: {
    // height: 200,
    // width: 200,
    // flex: 1,
    // justifyContent: 'center',
    flex: 1,
    justifyContent: "center"
  }
});

// export const Loader = () => (
//   <View style={styles.container}>
//     <Image style={styles.loader} source={LoaderImage} />
//   </View>
// );
