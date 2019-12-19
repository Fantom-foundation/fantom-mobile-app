import React from "react";
import { View, Text} from "react-native";
import styles from "../styles";


const CardListItem = (props) => {
  const { isHiddenText,data } = props;
  return (
[0,1,2,3,4].map(item=>{
    return (
      <View style={[styles.listItemContainer, { borderLeftColor: data.color }]}>
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
})
      

  );
};
export default CardListItem;
