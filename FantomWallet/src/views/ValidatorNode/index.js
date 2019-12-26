import React, { useState, useEffect } from "react";
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
import { getValidatorsList as getValidatorsListAction } from "~/redux/staking/actions";
import { connect } from "react-redux";
import { convertFTMValue, formatNumber } from "~/utils/converts";

const ValidatorNode = props => {
  const { validators, getValidatorsList } = props;

  useEffect(() => {
    getValidatorsList();
  }, []);

  const [nodeExpanded, setNodeExpanded] = useState("");
  const selectItem = (item, index) => {
    const ind = validators.findIndex(i => (index + 1).toString() === i.id);
    if (nodeExpanded && nodeExpanded.id === item.id) {
      setNodeExpanded("");
    } else {
      setNodeExpanded(validators[ind]);
    }
  };

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
            data={validators}
            extraData={nodeExpanded}
            renderItem={({ item, index }) => {
              const status =
                item.deactivatedEpoch === "0" ? "Active" : "Inactive";

              const stakingSpace = 15 * item.totalStake - item.delegatedMe;
              return (
                <View>
                  <TouchableOpacity
                    style={{
                      ...styles.mainView,
                      marginTop: index === 0 ? getHeight(20) : getHeight(10)
                    }}
                    onPress={() => selectItem(item, index)}
                  >
                    <View style={styles.rowView}>
                      <Text style={styles.validatorName}>{item.address}</Text>
                      <Text style={styles.stakeText}>Total staked</Text>
                    </View>
                    <View style={{ ...styles.rowView, marginTop: 10 }}>
                      <View style={styles.activeIconTextView}>
                        <FontAwesome
                          name="circle"
                          size={12}
                          color={
                            status === "Active"
                              ? Colors.activeGreen
                              : Colors.offlinePink
                          }
                        ></FontAwesome>
                        <Text style={styles.statusText}>{status}</Text>
                      </View>
                      <Text style={styles.nameText}>
                        {formatNumber(
                          Number(convertFTMValue(item.totalStake, "validator"))
                        )}
                      </Text>
                    </View>
                    {/* Third Optional row */}
                    {nodeExpanded.address === item.address && (
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
                          <Text style={styles.nameText}>{stakingSpace}</Text>
                        </View>
                        {stakingSpace <= 0 ? (
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
                                  routes.root.StakingAmount,
                                  {
                                    validatorId: item.id
                                  }
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
};

const mapStateToProps = state => ({
  validators: state.stakes.validators
});

const mapDispatchToProps = {
  getValidatorsList: getValidatorsListAction
};

export default connect(mapStateToProps, mapDispatchToProps)(ValidatorNode);
