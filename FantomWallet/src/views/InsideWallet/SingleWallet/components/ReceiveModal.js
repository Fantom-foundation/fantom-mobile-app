import React, { useState } from 'react';
import {
  TouchableOpacity,
  Text,
  FlatList,
  View,
  SafeAreaView,
  Modal,
  StatusBar
} from 'react-native';
import { Colors } from '~/theme';
import { getHeight, Metrics } from '~/utils/pixelResolver';
import { NavigationService, routes } from '~/navigation/helpers';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Button from '~/components/general/Button';
import styles from '../styles';
import { DEVICE_WIDTH, DEVICE_HEIGHT } from '~/common/constants';
const receiveTransaction = {
  ftm: 3680,
  senderId: '0xbe0eb53f46cd790cd13851d5eff43d12404d33e8',
  transactionNumber:
    '0x7485a8be8324ba03553a40f1f9d4503c1bed5793cd2467ae1801c7a43ace960a',
  date: 'November 16 2019, 12:16 PM'
};
const ReceiveModal = props => {
  const [closeModal, setCloseModal] = useState(true);
  const { showReceiveModal, closeReceiveModal } = props;
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
            <Text style={styles.modalAmount}>
              {`${receiveTransaction.ftm} FTM`}
            </Text>
            <Text style={styles.modalTransaction}>Sender</Text>
            <Text style={styles.modalTransactionText}>
              {receiveTransaction.senderId}
            </Text>
            <Text style={styles.modalTransaction}>Transaction number</Text>
            <Text style={styles.modalTransactionText}>
              {receiveTransaction.transactionNumber}
            </Text>
            <Text style={styles.modalTransaction}>Date</Text>
            <Text
              style={{
                ...styles.modalTransactionText,
                marginBottom: getHeight(40)
              }}
            >
              {receiveTransaction.date}
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
