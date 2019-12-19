import React from "react";
import { View, Text, ImageBackground } from "react-native";
import styles from "../styles";
import CardImage from "../../../../images/fantomWhiteIcon.png";

const StickyHeader = ({data}) => {
  const { name, balance } = data;
  return (
    <View style={styles.stickyHeaderStyle}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <Text style={styles.cardHeaderText}>{name || ""}</Text>
        <Text style={styles.bottomCardText}>{`${balance} FTM`}</Text>
      </View>
      <View style={styles.cardBottomTextContainer}>
        <Text style={styles.bottomCardSubText}>{`$${balance}`}</Text>
      </View>
      <ImageBackground
        style={styles.stickyHeaderImageStyle}
        source={CardImage}
      />
    </View>
  );
};
export default StickyHeader;
