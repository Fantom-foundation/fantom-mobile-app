import React, { useState } from "react";
import { Text, TouchableOpacity, Modal } from "react-native";
import styles from "../styles";
import {
  fantomToDollar,
  convertFTMValue,
  formatActivities,
  getConversionRate
} from "../../../../utils/converts";
import ReceiveModal from "../../../InsideWallet/SingleWallet/components/ReceiveModal";
import SendModal from "../../../InsideWallet/SingleWallet/components/SendModal";

const CardListItem = ({ data, isHiddenText, publicKey }) => {
  const [showReceiveModal, setShowReceiveModal] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);
  const [transactionData, setTransactionData] = useState(null);
  return data.map(item => {
    const { value, from, to } = item;
    const type =
      from.toLowerCase() === publicKey.toLowerCase() ? "Sent" : "Received";

    return (
      <>
        <TouchableOpacity
          style={styles.listItemContainer}
          onPress={() => {
            if (type === "Sent") {
              setTransactionData(item);
              setShowSendModal(true);
            } else {
              setTransactionData(item);
              setShowReceiveModal(true);
            }
          }}
        >
          <Text style={styles.selfText}>
            {formatActivities(item.timestamp)}
          </Text>
          <Text style={styles.listItemTitle}>
            {to.toLowerCase() != from.toLowerCase()
              ? isHiddenText
                ? "*"
                : type === "Sent"
                ? "-"
                : "+"
              : ""}
            {isHiddenText
              ? "********"
              : `${Number(convertFTMValue(value, "bignumber"))} FTM`}
          </Text>
          {to.toLowerCase() === from.toLowerCase() && (
            <Text style={styles.selfText}>Self</Text>
          )}
        </TouchableOpacity>

        <Modal
          transparent
          visible={showReceiveModal}
          style={styles.modalStyle}
          onRequestClose={() => setShowReceiveModal(false)}
        >
          <ReceiveModal
            publicKey={publicKey}
            transactionData={transactionData}
            showReceiveModal={showReceiveModal}
            closeReceiveModal={() => setShowReceiveModal(false)}
          />
        </Modal>
        <Modal
          transparent
          visible={showSendModal}
          style={styles.modalStyle}
          onRequestClose={() => setShowSendModal(false)}
        >
          <SendModal
            publicKey={publicKey}
            transactionData={transactionData}
            showSendModal={showSendModal}
            closeSendModal={() => setShowSendModal(false)}
          />
        </Modal>
      </>
    );
  });
};
export default CardListItem;
