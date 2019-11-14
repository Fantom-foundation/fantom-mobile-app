import React from 'react';
import { View, Text } from 'react-native';

export default () => (
  <View
    style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Text
      style={{
        textAlign: 'center',
        fontSize: 16,
      }}
    >
      Camera not authorized
    </Text>
  </View >
);