import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styles from "../styles";
import { convertFTMValue, formatActivities } from "../../../../utils/converts";
import { Messages } from "../../../../theme";

const CardListItem = ({
  data,
  isHiddenText,
  publicKey,
  handleTransactionClick
}) => {
  return data.map(item => {
    const { value, from, to } = item;
    const type =
      from.toLowerCase() === publicKey.toLowerCase() ? "Sent" : "Received";

    return (
      <>
        <TouchableOpacity
          style={styles.listItemContainer}
          onPress={() => handleTransactionClick(type, item, publicKey)}
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
            <Text style={styles.selfText}>{Messages.self}</Text>
          )}
        </TouchableOpacity>
      </>
    );
  });
};
export default CardListItem;
