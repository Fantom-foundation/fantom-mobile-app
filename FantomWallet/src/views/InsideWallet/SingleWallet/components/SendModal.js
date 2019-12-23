import React, { useState } from "react";
import { TouchableOpacity, Text, View, Share } from "react-native";
import { Colors } from "~/theme";
import { getHeight, Metrics } from "~/utils/pixelResolver";
import { NavigationService, routes } from "~/navigation/helpers";
import Entypo from "react-native-vector-icons/Entypo";
import styles from "../styles";

import {
  fantomToDollar,
  convertFTMValue,
  formatActivities
} from "~/utils/converts";
const SendModal = props => {
  const { closeSendModal, transactionData, publicKey } = props;

  const {
    type,
    value,
    hash,
    transactionStatus,
    fee,
    from,
    to,
    isError,
    timestamp
  } = transactionData;
  const formattedDate = formatActivities(timestamp);
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: publicKey
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
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
            <Text style={styles.modalAmount}>{`${convertFTMValue(
              value
            )} FTM`}</Text>
            <Text style={styles.modalTransaction}>Recipient</Text>
            <Text style={styles.modalTransactionText}>{to}</Text>
            <Text style={styles.modalTransaction}>Transaction number</Text>
            <Text style={styles.modalTransactionText}>{hash}</Text>
            <Text style={styles.modalTransaction}>Date</Text>
            <Text style={styles.modalTransactionText}>{formattedDate}</Text>
            <Text style={styles.modalTransaction}>Transaction fee</Text>
            <Text
              style={{
                ...styles.modalTransactionText,
                marginBottom: getHeight(40)
              }}
            >
              {`${convertFTMValue(fee)} FTM ($${fantomToDollar(fee)})`}
            </Text>
            <TouchableOpacity
              style={styles.shareIconWrapper}
              onPress={() => onShare()}
            >
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
