import React from "react";
import { View, Text } from "react-native";
import styles from "../styles";
import {
  fantomToDollar,
  convertFTMValue,
  getConversionRate
} from "../../../../utils/converts";
const CardListItem = ({ data, isHiddenText }) => {
  return data.map(item => {
    const { value } = item;
    return (
      <View style={styles.listItemContainer}>
        <Text style={styles.listItemTitle}>
          {isHiddenText ? "********" : `${convertFTMValue(value)} FTM`}
        </Text>

        <View style={styles.titleContainer}>
          <Text style={styles.balanceText}>{`$${getConversionRate()}`}</Text>
          <Text style={styles.balanceText}>
            {isHiddenText ? "" : `$${fantomToDollar(value)}`}
          </Text>
        </View>
      </View>
    );
  });
};
export default CardListItem;
