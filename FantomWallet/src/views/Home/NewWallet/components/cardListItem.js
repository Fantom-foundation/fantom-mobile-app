import React from "react";
import { View, Text} from "react-native";
import styles from "../styles";


const CardListItem = () => {
  return (
[0,1,2,3,4].map(item=>{
    return (
      <View style={styles.listItemContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.listItemTitle}>Ethereum</Text>
          <Text style={styles.listItemTitle}>0.3 ETH</Text>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.balanceText}>$145.39</Text>
          <Text style={styles.balanceText}>$48.80</Text>
        </View>
      </View>
    );
})
      

  );
};
export default CardListItem;
