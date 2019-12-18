import React from "react";
import { View, Text, ImageBackground } from "react-native";
import styles from "../styles";
import CardImage from "../../../../images/Binance_logo.png";
import CardListItem from "./cardListItem";
import { getHeight, getWidth } from "../../../../utils/pixelResolver";
import { Colors, FontSize, fonts } from "../../../../theme";




const CardView = ({ showList, showCard, data, isHiddenText }) => {
  return (
    <View style={{ justifyContent: "center" }}>
      {/* {showCard && (
        <View
          style={{
            backgroundColor: "black",
            borderBottomRightRadius: getWidth(22),
            borderTopRightRadius: getWidth(22),
            borderColor: "black",
            ...styles.cardIndicatorStyle
          }}
        ></View>
      )}
      {showCard && (
        <View
          style={{
            right: 0,
            backgroundColor: "blue",
            borderBottomLeftRadius: getWidth(22),
            borderTopLeftRadius: getWidth(22),
            borderColor: "blue",
            ...styles.cardIndicatorStyle
          }}
        ></View>
      )} */}
      {showCard && data && (
        <View style={[styles.cardStyle, { backgroundColor: data.color }]}>
          <Text style={styles.cardHeaderText}>Orange Wallet</Text>
          <Text style={styles.cardSecretText}>
            0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7
          </Text>
          <View style={styles.cardBottomTextContainer}>
            <Text style={styles.bottomCardText}>
              {isHiddenText ? "********" : "1.03 ETH"}
            </Text>
            <Text style={styles.bottomCardSubText}>
              {isHiddenText ? "" : "$180.46"}
            </Text>
          </View>
          <ImageBackground style={styles.cardImageStyle} source={CardImage} />
        </View>
      )}
      {showList && <CardListItem data={data} isHiddenText={isHiddenText} />}
    </View>
  );
};
export default CardView;
