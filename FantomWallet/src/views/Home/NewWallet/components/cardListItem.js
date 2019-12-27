import React from "react";
import { View, Text } from "react-native";
import styles from "../styles";
import {
  fantomToDollar,
  convertFTMValue,
  getConversionRate
} from "../../../../utils/converts";
const CardListItem = ({ data, isHiddenText, publicKey }) => {
  return data.map(item => {
    const { value, from, to } = item;
    const type =
      from.toLowerCase() === publicKey.toLowerCase() ? "Sent" : "Received";

    return (
      <View style={styles.listItemContainer}>
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
      </View>
    );
  });
};
export default CardListItem;
