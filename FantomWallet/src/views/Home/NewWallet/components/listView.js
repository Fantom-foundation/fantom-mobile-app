import React,{useState} from "react";
import { View, Text, ImageBackground,TouchableOpacity } from "react-native";
import styles from "../styles";
import CardListItem from "./cardListItem";
const ListView = () => {
  const [isOpen,setIsOpen]=useState(false)
  return (
    <View >
      <TouchableOpacity
        onPress={() => setIsOpen(!isOpen)}
        style={styles.listViewContainer}
      >
        <Text style={styles.listTitleText}>My Fantom Wallet</Text>
        <Text style={styles.rightTextStyle}>90,680 FTM</Text>
      </TouchableOpacity>
     {isOpen&& <CardListItem />}
    </View>
  );
};
export default ListView;
