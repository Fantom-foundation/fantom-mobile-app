import React, { useState } from "react";
import { TouchableOpacity, Text, View, Share, Linking } from "react-native";
import { Colors } from "~/theme";
import { getHeight, Metrics } from "~/utils/pixelResolver";
import { NavigationService, routes } from "~/navigation/helpers";
import Entypo from "react-native-vector-icons/Entypo";
import styles from "../styles";
import { LINKING_URL } from "react-native-dotenv";
import {
  fantomToDollar,
  convertFTMValue,
  formatActivities
} from "~/utils/converts";
import { Messages } from "../../../../theme";

const SendModal = props => {
  const { closeReceiveModal, transactionData, publicKey } = props;

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

  const openUrl = (value, type) => {
    //const LINKING_URL = "https://explorer.fantom.network/";
    Linking.openURL(`${LINKING_URL}${type}/${value}`);
  };
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.modalBackground}
      onPress={closeReceiveModal}
    >
      <TouchableOpacity activeOpacity={1} style={styles.modalShadow}>
        <View style={styles.modalWrapper}>
          <View
            style={{
              ...styles.themeStripe,
              backgroundColor: Colors.royalBlue
            }}
          />
          <View style={styles.detailsContainer}>
            <Text style={styles.modalText}>{Messages.youReceived}</Text>
            <Text style={styles.modalAmount}>{`${Number(
              convertFTMValue(value, "bignumber")
            )} FTM`}</Text>
            <Text style={styles.modalTransaction}>{Messages.recipient}</Text>
            <TouchableOpacity onPress={() => openUrl(to, "address")}>
              <Text
                style={{
                  ...styles.modalTransactionText,
                  color: Colors.royalBlue
                }}
              >
                {to}
              </Text>
            </TouchableOpacity>
            <Text style={styles.modalTransaction}>
              {Messages.transactionNumber}
            </Text>
            <TouchableOpacity onPress={() => openUrl(hash, "transactions")}>
              <Text
                style={{
                  ...styles.modalTransactionText,
                  color: Colors.royalBlue
                }}
              >
                {hash}
              </Text>
            </TouchableOpacity>
            <Text style={styles.modalTransaction}>{Messages.date}</Text>
            <Text style={styles.modalTransactionText}>{formattedDate}</Text>
            <Text style={styles.modalTransaction}>
              {Messages.transactionFee}
            </Text>
            <Text
              style={{
                ...styles.modalTransactionText,
                marginBottom: getHeight(40)
              }}
            >
              {`${convertFTMValue(fee)} FTM ($${fantomToDollar(fee, 5)})`}
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
