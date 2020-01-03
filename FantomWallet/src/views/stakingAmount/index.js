// @flow
import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  Text,
  ScrollView,
  Alert
} from "react-native";
import { connect } from "react-redux";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import styles from "./styles";
import KeyPad from "../../components/general/keyPad";
import { NavigationService, routes } from "../../navigation/helpers";
import { formatNumber } from "~/utils/converts";
import { delegateAmount as delegateAmountAction } from "../../redux/staking/actions";
import { Colors } from "../../theme";
import Modal from "../../components/general/modal";

const StakingAmount = (props: Props) => {
  const { validators, delegateAmount, keys, currentWallet } = props;

  const keyPad = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "<"];
  const [amount, setAmount] = useState("");
  const [ifStaking, setIfStaking] = useState(false);
  const [stakingModal, setStakingModal] = useState(false);
  const [fontSizeValue, setFontSizeValue] = useState(40);
  const amountHightModalText =
    "The amount exceeds the staking\n space left on this validator node.\n\nPlease input a lower amount or\n choose a different validator\n node.";
  const availableToStake = props.navigation.getParam("availableToStake");

  useEffect(() => {
    if (amount.length <= 5) {
      setFontSizeValue(36);
    } else if (amount.length <= 10) {
      setFontSizeValue(32);
    } else if (amount.length <= 15) {
      setFontSizeValue(28);
    } else {
      setFontSizeValue(20);
    }
  }, [amount]);
  //  function for entered amount from KeyPad
  const handleInputNumber = item => {
    getPrivateKey();
    if (item === "<") {
      let num = amount.slice(0, -1);
      setAmount(num);
    } else {
      const updatedAmount = amount.concat(item);
      setAmount(updatedAmount);
    }
  };

  const selectedValidatorId = props.navigation.getParam("validatorId");
  const validator = validators.find(
    validatorObj => validatorObj.id === selectedValidatorId
  );
  const stakingSpace = 15 * validator.totalStake - validator.delegatedMe;
  const dividend = Math.pow(10, 18);
  const stakingSpaceLeft = formatNumber(
    Number((stakingSpace / dividend).toFixed(2))
  );
  const availableSpace = availableToStake
    ? formatNumber(Number(availableToStake.toFixed(2)))
    : 0;
  const handleMaxStake = () => {
    if (stakingSpace > availableSpace) setAmount(availableSpace.toString());
    else if (stakingSpace < availableSpace)
      setAmount(
        Number(stakingSpace)
          .toFixed(2)
          .toString()
      );
    else if (stakingSpace === availableSpace)
      setAmount(availableSpace.toString());
  };

  const getPrivateKey = () => {
    const { keys, currentWallet } = props;
    const { wallets } = keys;
    if (wallets && wallets.length > 0) {
      const key = wallets.find(w => w.publicKey === currentWallet.publicKey);
      const { privateKey } = key;
      return privateKey;
    }
    return null;
  };
  const handleStakingAmount = () => {
    if (Number(amount) > Number(stakingSpace)) {
      setStakingModal(true);
    } else if (amount !== "") {
      setIfStaking(true);
      delegateAmount({
        amount,
        publicKey: currentWallet.publicKey,
        validatorId: validator.id,
        cbSuccess: () => {
          NavigationService.navigate(routes.root.Success);
          setIfStaking(false);
        }
      });
    } else if (amount === "") {
      Alert.alert("Error", "Please enter valid amount.");
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeAreaView}>
        <TouchableOpacity
          style={styles.crossButton}
          onPress={() => NavigationService.pop()}
        >
          <FontAwesome name="close" size={22} color={Colors.white} />
        </TouchableOpacity>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.validatorNode}>{validator.address}</Text>
          <Text style={styles.stakinSpace}>
            Staking space left: {stakingSpaceLeft}
          </Text>
          {/*for the price entered   */}
          <Text style={{ ...styles.sendPrice, fontSize: fontSizeValue }}>
            {amount ? formatNumber(amount) : 0}
          </Text>

          <View style={styles.availableAmountView}>
            <Text
              style={styles.availablePrice}
            >{`Available: ${availableSpace}`}</Text>
            <TouchableOpacity style={styles.maxButton} onPress={handleMaxStake}>
              <Text style={styles.maxButtonText}>Max</Text>
            </TouchableOpacity>
          </View>
          {/* KeyPad  */}
          <KeyPad
            buttonStyle={styles.numberButton}
            textStyle={styles.numberText}
            keyPad={keyPad}
            keyPadStyle={styles.keyPadView}
            handleInputNumber={item => handleInputNumber(item)}
          />

          {/* Stake Button */}
          <TouchableOpacity
            disabled={ifStaking}
            style={{
              ...styles.stakeButton,
              backgroundColor: !ifStaking ? Colors.lightGrey : Colors.grey
            }}
            onPress={handleStakingAmount}
          >
            <Text style={styles.stakeText}>
              {ifStaking ? "Staking..." : "Stake"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
      {/* Modal For Amount Too High */}
      {stakingModal && (
        <Modal
          modalText={amountHightModalText}
          modalTextStyle={styles.modalTextStyle}
          buttonViewStyle={styles.notEnoughSpaceButtonView}
          buttons={[
            {
              name: "Back",
              style: styles.backButtonStyle,
              onPress: () => setStakingModal(false),
              textStyle: styles.backButton
            }
          ]}
        />
      )}
    </View>
  );
};

const mapStateToProps = state => ({
  validators: state.stakes.validators,
  currentWallet: state.wallet.currentWallet,
  keys: state.keys
});

const mapDispatchToProps = {
  delegateAmount: delegateAmountAction
};

export default connect(mapStateToProps, mapDispatchToProps)(StakingAmount);
