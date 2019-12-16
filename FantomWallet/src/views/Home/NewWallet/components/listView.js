import React,{useState} from "react";
import { View, Text, ImageBackground,TouchableOpacity } from "react-native";
import styles from "../styles";
import CardListItem from "./cardListItem";
const ListView = (props) => {
  const [isOpen,setIsOpen]=useState(false)
  const {data}=props
  return (
    <View>
      <TouchableOpacity
        onPress={() => setIsOpen(!isOpen)}
        style={[styles.listViewContainer, { backgroundColor: data.color }]}
      >
        <Text style={styles.listTitleText}>My Fantom Wallet</Text>
        <Text style={styles.rightTextStyle}>90,680 FTM</Text>
      </TouchableOpacity>
      {isOpen && <CardListItem data={data} />}
    </View>
  );
};
export default ListView;
