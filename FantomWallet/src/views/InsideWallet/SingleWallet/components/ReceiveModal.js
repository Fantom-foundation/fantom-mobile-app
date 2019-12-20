import React, { useState } from "react";
import {
  TouchableOpacity,
  Text,
  FlatList,
  View,
  SafeAreaView,
  Modal,
  StatusBar
} from "react-native";
import { Colors } from "~/theme";
import { getHeight, Metrics } from "~/utils/pixelResolver";
import { NavigationService, routes } from "~/navigation/helpers";
import Ionicons from "react-native-vector-icons/Ionicons";
import moment from "moment";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import Button from "~/components/general/Button";
import styles from "../styles";
import { DEVICE_WIDTH, DEVICE_HEIGHT } from "~/common/constants";

const ReceiveModal = props => {
  const [closeModal, setCloseModal] = useState(true);
  const { showReceiveModal, closeReceiveModal, transactionData } = props;
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
        closeReceiveModal();
      }}
    >
      <TouchableOpacity
        activeOpacity={1}
        // onPress={() => {
        //   closeReceiveModal();
        // }}
        style={styles.modalShadow}
      >
        <View style={styles.modalWrapper}>
          <View
            style={{ ...styles.themeStripe, backgroundColor: Colors.royalBlue }}
          />
          <View style={styles.detailsContainer}>
            <Text style={styles.modalText}>You received</Text>
            <Text style={styles.modalAmount}>{`${amount} ${amountUnit}`}</Text>
            <Text style={styles.modalTransaction}>Sender</Text>
            <Text style={styles.modalTransactionText}>{from}</Text>
            <Text style={styles.modalTransaction}>Transaction number</Text>
            <Text style={styles.modalTransactionText}>{transactionId}</Text>
            <Text style={styles.modalTransaction}>Date</Text>
            <Text
              style={{
                ...styles.modalTransactionText,
                marginBottom: getHeight(40)
              }}
            >
              {date}
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

export default ReceiveModal;
