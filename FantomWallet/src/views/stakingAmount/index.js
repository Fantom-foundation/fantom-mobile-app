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
import Web3Agent from "../../services/api/web3";

const StakingAmount = (props: Props) => {
  const { validators, delegateAmount, keys, currentWallet } = props;

  const keyPad = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "<"];
  const [amount, setAmount] = useState("");
  const [ifStaking, setIfStaking] = useState(false);
  const [stakingModal, setStakingModal] = useState(false);
  const [fontSizeValue, setFontSizeValue] = useState(40);
  const [estimationfee, setEstimationfee] = useState(0);
  const amountHightModalText =
    "The amount exceeds the staking\n space left on this validator node.\n\nPlease input a lower amount or\n choose a different validator\n node.";
  const availableToStake = props.navigation.getParam("availableToStake");

  useEffect(() => {
    const gasLimit = 200000;
    Web3Agent.Fantom.estimateFee(gasLimit).then(value => {
      setEstimationfee(value * 2);
    });
  });
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

    if (item === "0" && amount === "") return;
    else if (item === "." && amount.includes(".")) return;
    else if (item === "." && amount === "") {
      let num = amount.concat("0.");
      setAmount(num);
    } else if (item === "<") {
      if (amount === "0.") {
        setAmount("");
      } else {
        let num = amount.slice(0, -1);
        setAmount(num);
      }
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
  const availableSpace = !isNaN(availableToStake)
    ? formatNumber(Number(availableToStake).toFixed(2))
    : 0;

  // Maximum Stake function
  const handleMaxStake = () => {
    if (stakingSpace > availableSpace) {
      const maxwithfee = Number(availableSpace) - Number(estimationfee);
      setAmount(maxwithfee.toString());
    } else if (stakingSpace < availableSpace) {
      const maxwithfee = Number(stakingSpace) - Number(estimationfee);
      setAmount(
        Number(maxwithfee)
          .toFixed(2)
          .toString()
      );
    } else if (stakingSpace === availableSpace) {
      const maxwithfee = Number(availableSpace) - Number(estimationfee);
      setAmount(maxwithfee.toString());
    }
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
    const publicKey = props.navigation.getParam("publicKey");
    if (Number(amount) > Number(stakingSpace)) {
      setStakingModal(true);
    } else if (Number(amount) < 1) {
      Alert.alert("Error", "Minimum 1 FTM required to stake");
    } else if (
      Number(availableSpace) - Number(estimationfee) <
      Number(amount)
    ) {
      const maxStake = Number(availableSpace) - Number(estimationfee);
      Alert.alert(
        "Insufficient funds",
        `You can stake max ${maxStake.toFixed(5)} (Value + gas * price)`
      );
    } else if (amount !== "") {
      setIfStaking(true);
      delegateAmount({
        amount,
        publicKey: publicKey,
        validatorId: validator.id,
        cbSuccess: isSuccess => {
          if (isSuccess) NavigationService.navigate(routes.root.Success);
          setIfStaking(false);
        }
      });
    } else if (amount === "") {
      Alert.alert("Error", "Please enter valid amount.");
    }
  };

  console.log(estimationfee, "****** value *****");
  const availbleAmount = Number(availableSpace) - Number(estimationfee);
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
            >{`Available: ${availbleAmount.toFixed(5)}`}</Text>
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
