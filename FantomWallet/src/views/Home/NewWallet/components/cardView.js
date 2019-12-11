import React from "react";
import {
  View,
  Text,
  ImageBackground
} from "react-native";
import styles from "../styles";
import CardImage from "../../../../images/Binance_logo.png";
import CardListItem from "./cardListItem"
const CardView=()=>{

    return (
        <View>
            <View style={styles.cardStyle}>
              <Text style={styles.cardHeaderText}>Orange Wallet</Text>
              <Text style={styles.cardSecretText}>
                0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7
              </Text>
              <View style={styles.cardBottomTextContainer}>
                <Text style={styles.bottomCardText}>1.03 ETH</Text>
                <Text style={styles.bottomCardSubText}>$180.46</Text>
              </View>
              <ImageBackground
                style={styles.cardImageStyle}
                source={CardImage}
              />
             
            </View>
             <CardListItem/>
            </View>
    );
  }
export default CardView
