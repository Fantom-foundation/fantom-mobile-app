import React from "react";
import { View, Text, ImageBackground } from "react-native";
import styles from "../styles";
import CardImage from "../../../../images/fantomWhiteIcon.png";

const StickyHeader = (props) => {
  const {data}=props
  return (
    <View style={[styles.stickyHeaderStyle, { backgroundColor: data.color}]}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <Text style={styles.cardHeaderText}>My Fantom Wallet</Text>
        <Text style={styles.bottomCardText}>1.03 FTM</Text>
      </View>
      <View style={styles.cardBottomTextContainer}>
        <Text style={styles.bottomCardSubText}>$180.46</Text>
      </View>
      <ImageBackground
        style={styles.stickyHeaderImageStyle}
        source={CardImage}
      />
    </View>
  );
};
export default StickyHeader;
