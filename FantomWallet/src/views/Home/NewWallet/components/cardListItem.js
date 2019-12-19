import React from "react";
import { View, Text} from "react-native";
import styles from "../styles";


const CardListItem = (props) => {
  const { isHiddenText,data } = props;
  return data.map(item => {
    return (
      <View style={styles.listItemContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.listItemTitle}>Fantom</Text>
          <Text style={styles.listItemTitle}>
            {isHiddenText ? "********" : "0.03 FTM"}
          </Text>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.balanceText}>$145.39</Text>
          <Text style={styles.balanceText}>{isHiddenText ? "" : "$48.80"}</Text>
        </View>
      </View>
    );
  });
};
export default CardListItem;
