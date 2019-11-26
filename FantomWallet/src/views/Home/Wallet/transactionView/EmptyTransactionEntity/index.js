// @flow
import React from 'react';
import { View, Text, Image } from 'react-native';
import { DEVICE_HEIGHT } from '~/common/constants';
import styles from './styles';
import walletWhiteIcon from '~/images/WalletOutline.png';

type Props = {
  title: string,
  message: string,
}
/**
 * EmptyTransactionEntity: This component is meant to display informational message,
 *  when wallet does not contains any transaction.
 */
const EmptyTransactionEntity = ({ title, message }: Props) => (
  <View style={[styles.mainViewStyle, { alignSelf: 'center', marginTop: DEVICE_HEIGHT * 0.1 }]}>
    <View style={styles.outerIconContainer}>
      <View style={styles.innerIconContainer}>
        <Image
          source={walletWhiteIcon}
          resizeMode="contain"
          style={{ height: DEVICE_HEIGHT * 0.07, width: DEVICE_HEIGHT * 0.07 }}
        />
      </View>
    </View>
    <Text style={styles.headingInfoStyle}>{title} </Text>
    <Text style={styles.textInfoStyle}>{message} </Text>
  </View>
);

export default EmptyTransactionEntity;
