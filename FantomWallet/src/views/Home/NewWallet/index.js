import React, { Component } from "react";
import { View, WebView, StatusBar, Text,ScrollView,ImageBackground,FlatList } from "react-native";
import { SafeAreaView } from "react-navigation";
import styles from "./styles";
import Button from "../../../components/general/Button";
import { Colors } from "../../../theme";
import Icon from "react-native-vector-icons/FontAwesome";
import CardImage from "../../../images/Binance_logo.png";
import CardView from "./components/cardView"
export default class Wallet extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar barStyle="light-content" />
          <View style={styles.headerContainer}>
            <View style={styles.headerItems}>
              <Text style={styles.headerText}>$0</Text>
              <Icon
                style={styles.iconStyle}
                name={"eye"}
                size={18}
                color={Colors.grey}
              />
            </View>
            <Text style={styles.subHeading}>Total balance</Text>
          </View>
          <View style={styles.listHeader}>
            <Text style={styles.headerText}>Wallets</Text>
            <Icon
              style={styles.iconStyle}
              name={"list-ul"}
              size={16}
              color={Colors.grey}
            />
          </View>
          {/* <ScrollView
          horizontal={true}
            showsVerticalScrollIndicator={false}
            style={styles.listContainer}
          > */}
          <FlatList
            style={styles.listContainer}
            removeClippedSubviews={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            horizontal
            
            ItemSeparatorComponent={() => (
              <View style={styles.itemSeperatorStyle} />
            )}
            data={[1, 2, 3, 4]}
            renderItem={({ item }) => {
              return (
                <ScrollView
                  style={styles.listScrollView}
                  showsVerticalScrollIndicator={false}
                >
                  <CardView />
                </ScrollView>
              );
            }}
          />

          {/* </ScrollView> */}
        </SafeAreaView>
      </View>
    );
  }
}
