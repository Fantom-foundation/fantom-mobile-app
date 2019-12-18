import React from "react";
import {
  Text,
  FlatList,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { Colors } from "~/theme";
import { getHeight, getWidth } from "~/utils/pixelResolver";
import { NavigationService, routes } from "~/navigation/helpers";
import styles from "./styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const validatorData = [
  {
    text: "Validator node 1",
    status: "Active",
    amount: "230,000,000",
    id: 0
  },
  {
    text: "Fantom validator",
    status: "Active",
    amount: "215,735,250",
    id: 1
  },
  {
    text: "Europe validator",
    status: "Active",
    amount: "195,199,366",
    id: 2
  },
  {
    text: "Satoshi node",
    status: "Active",
    amount: "170,345,678",
    id: 3
  },
  {
    text: "Node validator",
    status: "Offline",
    amount: "112,654,100",
    id: 4
  },
  {
    text: "Validator node 2",
    status: "Active",
    amount: "99,135,717",
    id: 5
  }
];
export default class ValidatorNode extends React.Component<any, any> {
  state = {
    nodeExpanded: ""
  };
  selectItem = (item, index) => {
    const { nodeExpanded } = this.state;
    const ind = validatorData.findIndex(i => index === i.id);
    if (nodeExpanded && nodeExpanded.id === item.id) {
      this.setState({ nodeExpanded: "" });
    } else {
      this.setState({ nodeExpanded: validatorData[ind] });
    }
  };
  render() {
    const { nodeExpanded } = this.state;
    return (
      <View style={styles.mainContainer}>
        <SafeAreaView style={styles.mainContainer}>
          <StatusBar barStyle="dark-content"></StatusBar>
          <ScrollView
            style={{ flex: 1, marginBottom: 30 }}
            showsVerticalScrollIndicator={false}
          >
            <TouchableOpacity
              style={styles.backIconView}
              onPress={() => NavigationService.pop()}
            >
              <Ionicons
                name="ios-arrow-back"
                size={25}
                color={Colors.black}
              ></Ionicons>
            </TouchableOpacity>
            <Text style={styles.headingText}>Select a validator node</Text>

            <FlatList
              data={validatorData}
              extraData={nodeExpanded}
              renderItem={({ item, index }) => {
                return (
                  <View>
                    <TouchableOpacity
                      style={{
                        ...styles.mainView,
                        marginTop: index === 0 ? getHeight(20) : getHeight(10)
                      }}
                      onPress={() => this.selectItem(item, index)}
                    >
                      <View style={styles.rowView}>
                        <Text style={styles.nameText}>{item.text}</Text>
                        <Text style={styles.stakeText}>Total staked</Text>
                      </View>
                      <View style={{ ...styles.rowView, marginTop: 10 }}>
                        <View style={styles.activeIconTextView}>
                          <FontAwesome
                            name="circle"
                            size={12}
                            color={
                              item.status === "Active"
                                ? Colors.activeGreen
                                : Colors.offlinePink
                            }
                          ></FontAwesome>
                          <Text style={styles.statusText}>{item.status}</Text>
                        </View>
                        <Text style={styles.nameText}>{item.amount}</Text>
                      </View>
                      {/* Third Optional row */}
                      {nodeExpanded.text === item.text && (
                        <>
                          <View
                            style={{
                              ...styles.rowView,
                              marginTop: getHeight(23)
                            }}
                          >
                            <Text style={styles.statusText}>Uptime</Text>
                            <Text style={styles.stakeText}>
                              Staking room left
                            </Text>
                          </View>
                          <View
                            style={{
                              ...styles.rowView,
                              marginTop: getHeight(7)
                            }}
                          >
                            <Text style={styles.nameText}>100%</Text>
                            <Text style={styles.nameText}>0</Text>
                          </View>
                          {item.text.toLowerCase().includes("validator") ? (
                            <View style={styles.descView}>
                              <Text style={styles.descText}>
                                This node is full at the moment.
                              </Text>
                              <Text style={styles.descText}>
                                Please select a different node.
                              </Text>
                            </View>
                          ) : (
                            <View style={styles.selectButtonView}>
                              <TouchableOpacity
                                style={styles.selectButton}
                                onPress={() =>
                                  NavigationService.navigate(
                                    routes.root.Success
                                  )
                                }
                              >
                                <Text style={styles.selectText}>Select</Text>
                              </TouchableOpacity>
                            </View>
                          )}
                        </>
                      )}
                    </TouchableOpacity>
                  </View>
                );
              }}
              keyExtractor={item => item.id}
            />
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}
