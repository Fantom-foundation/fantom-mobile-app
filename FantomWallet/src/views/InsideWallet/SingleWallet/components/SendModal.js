import React, { useState } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { Colors } from "~/theme";
import { getHeight, Metrics } from "~/utils/pixelResolver";
import { NavigationService, routes } from "~/navigation/helpers";
import Entypo from "react-native-vector-icons/Entypo";
import styles from "../styles";

const SendModal = props => {
  const { closeSendModal, transactionData } = props;
  const {
    type,
    amount,
    transactionId,
    transactionStatus,
    amountUnit,
    from,
    to,
    isError,
    date
  } = transactionData;
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
            <Text style={styles.modalAmount}>{`${amount} ${type}`}</Text>
            <Text style={styles.modalTransaction}>Recipient</Text>
            <Text style={styles.modalTransactionText}>{to}</Text>
            <Text style={styles.modalTransaction}>Transaction number</Text>
            <Text style={styles.modalTransactionText}>{transactionId}</Text>
            <Text style={styles.modalTransaction}>Date</Text>
            <Text style={styles.modalTransactionText}>{date}</Text>
            <Text style={styles.modalTransaction}>Transaction fee</Text>
            <Text
              style={{
                ...styles.modalTransactionText,
                marginBottom: getHeight(40)
              }}
            >
              {amount}
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
};
export default SendModal;
