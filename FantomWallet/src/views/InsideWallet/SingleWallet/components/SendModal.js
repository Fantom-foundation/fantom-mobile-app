import React, { useState } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { Colors } from '~/theme';
import { getHeight, Metrics } from '~/utils/pixelResolver';
import { NavigationService, routes } from '~/navigation/helpers';
import Entypo from 'react-native-vector-icons/Entypo';
import styles from '../styles';
const sendTransaction = {
  hot: '209,538',
  recipientId: '0xbe0eb53f46cd790cd13851d5eff43d12404d33e8',
  transactionNumber:
    '0x7485a8be8324ba03553a40f1f9d4503c1bed5793cd2467ae1801c7a43ace960a',
  date: 'November 16 2019, 11:11 AM',
  transactionFee: '0.001585839 FTM ($0.30)'
};
const SendModal=(props)=>{
  const { closeSendModal } = props;
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.modalBackground}
      onPress={() => {
        closeSendModal();
        //   NavigationService.navigate(routes.root.SendFTM);
      }}
    >
      <TouchableOpacity
        activeOpacity={1}
        // onPress={() => {
        //   closeSendModal();
        // }}
        style={styles.modalShadow}
      >
        <View style={styles.modalWrapper}>
          <View
            style={{
              ...styles.themeStripe,
              backgroundColor: Colors.royalBlue
            }}
          />
          <View style={styles.detailsContainer}>
            <Text style={styles.modalText}>You sent</Text>
            <Text style={styles.modalAmount}>
              {`${sendTransaction.hot} FTM`}
            </Text>
            <Text style={styles.modalTransaction}>Recipient</Text>
            <Text style={styles.modalTransactionText}>
              {sendTransaction.recipientId}
            </Text>
            <Text style={styles.modalTransaction}>Transaction number</Text>
            <Text style={styles.modalTransactionText}>
              {sendTransaction.transactionNumber}
            </Text>
            <Text style={styles.modalTransaction}>Date</Text>
            <Text style={styles.modalTransactionText}>
              {sendTransaction.date}
            </Text>
            <Text style={styles.modalTransaction}>Transaction fee</Text>
            <Text
              style={{
                ...styles.modalTransactionText,
                marginBottom: getHeight(40)
              }}
            >
              {sendTransaction.transactionFee}
            </Text>
            <TouchableOpacity style={styles.shareIconWrapper}>
              <Entypo
                style={styles.shareIcon}
                name="share"
                size={20}
                color={Colors.textBlack}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
export default SendModal;
