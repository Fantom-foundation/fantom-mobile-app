import React,{useState} from "react";
import { View, Text, ImageBackground,TouchableOpacity } from "react-native";
import styles from "../styles";
import CardListItem from "./cardListItem";

const ListView = ({data}) => {
  const [isOpen,setIsOpen]=useState(false)
  const { name,  history, balance } = data;
  return (
    <View>
      <TouchableOpacity
        onPress={() => setIsOpen(!isOpen)}
        style={styles.listViewContainer}
      >
        <Text style={styles.listTitleText}>{name || ""}</Text>
        <Text style={styles.rightTextStyle}>{`${balance} FTM`}</Text>
      </TouchableOpacity>
      {isOpen && history && history.length > 0 && (
        <CardListItem data={history} />
      )}
    </View>
  );
};
export default ListView;
