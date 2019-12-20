import React from "react";
import { View, Text } from "react-native";
import styles from "../styles";

const CardListItem = ({ data, isHiddenText }) => {
  return data.map(item => {
    const { amount, amountUnit } = item;
    return (
      <View style={styles.listItemContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.listItemTitle}>Fantom</Text>
          <Text style={styles.listItemTitle}>
            {isHiddenText ? "********" : `${amount} ${amountUnit}`}
          </Text>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.balanceText}>{`$${1}`}</Text>
          <Text style={styles.balanceText}>
            {isHiddenText ? "" : `$${amount}`}
          </Text>
        </View>
      </View>
    );
  });
};
export default CardListItem;
