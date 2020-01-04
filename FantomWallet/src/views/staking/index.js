// @flow
import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
  Dimensions
} from "react-native";
import styles from "./styles";
import question from "../../images/question.png";
import Carousel from "react-native-snap-carousel";
import { Metrics, getWidth } from "../../utils/pixelResolver";
import Modal from "../../components/general/modal";
import { NavigationService, routes } from "../../navigation/helpers";
import { connect } from "react-redux";
import { Colors } from "../../theme";
import { formatNumber } from "~/utils/converts";
import {
  delegateByAddresses as delegateByAddressesAction,
  delegateUnstake as delegateUnstakeAction,
  delegateWithdraw as delegateWithdrawAction
} from "~/redux/staking/actions";

const modalText = "You need at least 1 FTM to \n stake.";

const unstakeText =
  "Are you sure you want to  request to withdraw \n your tokens from staking??\n\nThe tokens will be available\n after 7 days in your wallet.";

const Staking = (props: Props) => {
  const [isUnstakeModalOpened, openUnstakingModal] = useState(false);
  const [ifUnstaking, setIfUnstaking] = useState(false);
  const [ifWithdrawing, setifWithdrawing] = useState(false);
  const [isWithdrawModalOpened, openWithdrawModal] = useState("");
  const [delegateAmount, setDelegateAmount] = useState("");
  const [unstakeKey, setUnstakeKey] = useState("");
  const [stakeAmountModal, setStakeAmountModal] = useState(false);
  const { delegateByAddresses, stakes, wallets, navigation } = props;
  console.log("st", stakes);

  const [values, setValues] = useState(wallets);
  const [carouselWidth, setCarouselWidth] = useState(getWidth(279));
  useEffect(() => {
    setValues(wallets);
    delegateByAddresses();
    setTimeout(() => {
      setCarouselWidth(getWidth(280));
    }, 500);
  }, [wallets.length]);

  useEffect(() => {
    if (values && values.length > 1) {
      if (!!carousRef) carousRef.triggerRenderingHack();
      setTimeout(() => {
        if (!!carousRef) carousRef.triggerRenderingHack();
      }, 1000);
    }
  }, [carouselWidth]);

  const formatValues = (value, isDividedBy = true) => {
    const dividend = isDividedBy ? Math.pow(10, 18) : 1;
    const dividedValue = value / dividend;
    if (value <= 0.01) {
      return !!value && value > 0 ? formatNumber(Number(value).toFixed(8)) : 0;
    }
    return formatNumber(Number(dividedValue.toFixed(2)));
  };

  const _renderItem = ({ item, index }) => {
    const stakeData = stakes.find(stake => stake.publicKey === item.publicKey);
    const isDeligate = stakeData && stakeData.isDeligate;
    if (!stakeData) {
      return null;
    }

    const availableToStake = item.balance;
    const currentDate = new Date();
    const nextSevenDays = currentDate.setDate(currentDate.getDate() + 7);
    const delegateDate = new Date();
    // const deactivatedDate = delegateDate.setDate(
    //   delegateDate.getDate() + Number(stakeData.deactivatedTime || 0)
    // );
    const deactivatedEpoch = Number(stakeData.deactivatedEpoch || 0);
    const deactivatedTime = Number(stakeData.deactivatedTime || 0);
    const timeLeft =
      delegateDate.getTime() - (deactivatedTime + currentDate.getTime());
    // const date1 = new Date(deactivatedDate);
    // const date2 = new Date(nextSevenDays);
    // const diffTime = Math.abs(date2 - date1);
    // const timeLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const currentlyStaking = formatValues(Number(stakeData.amount || 0));

    // const timeLeft =
    //   new Date().getTime() -
    //   (Number(stakeData.deactivatedTime || 0) + nextSevenDays);

    const isUnstaking = navigation.getParam("isUnstaking");
    return (
      <View
        style={{
          ...styles.walletView
        }}
      >
        <View style={{ paddingHorizontal: 22 }}>
          <Text numberOfLines={1} style={{ ...styles.titleView }}>
            {item.name}
          </Text>
          <Text style={{ ...styles.amountStyle }}>
            {formatValues(availableToStake, false)}
          </Text>
          <Text style={{ ...styles.walletTextStyle }}>Available to stake</Text>

          <Text style={{ ...styles.amountStyle }}>{currentlyStaking}</Text>
          <Text style={{ ...styles.walletTextStyle }}>Currently staking</Text>
          {deactivatedEpoch <= 0 && (
            <View>
              <Text style={{ ...styles.amountStyle }}>
                {formatValues(stakeData.claimedRewards)}
              </Text>
              <Text style={{ ...styles.walletTextStyle }}>Earned rewards</Text>
            </View>
          )}
          {timeLeft > 0 && deactivatedEpoch > 0 ? (
            <Text style={{ ...styles.bottomTextStyle, marginTop: 15 }}>
              {`Your ${currentlyStaking} FTM will be available in ${timeLeft} days`}
            </Text>
          ) : deactivatedEpoch > 0 && isDeligate && currentlyStaking > 0 ? (
            <TouchableOpacity
              onPress={() => {
                if (stakeData) setUnstakeKey(stakeData.publicKey);
                openWithdrawModal(true);
                setDelegateAmount(currentlyStaking);
              }}
            >
              <Text style={{ ...styles.bottomTextStyle, marginTop: 15 }}>
                Withdraw {currentlyStaking} FTM now
              </Text>
            </TouchableOpacity>
          ) : (
            <View />
          )}

          {deactivatedEpoch <= 0 && (
            <View>
              <Text style={{ ...styles.amountStyle }}>
                {formatValues(stakeData.pendingRewards, false)}
              </Text>
              <Text style={{ ...styles.walletTextStyle }}>Pending rewards</Text>
            </View>
          )}
        </View>
        <View style={styles.buttonView}>
          {/* {availableToStake.isDeligate ? ( */}
          {isDeligate && deactivatedEpoch <= 0 ? (
            <TouchableOpacity
              style={styles.buttonUnstakeView}
              onPress={() => {
                if (stakeData) setUnstakeKey(stakeData.publicKey);
                openUnstakingModal(true);
              }}
            >
              <Text
                style={{
                  ...styles.buttonText
                }}
              >
                Unstake
              </Text>
            </TouchableOpacity>
          ) : (
            <View
              style={{
                ...styles.buttonUnstakeView,
                backgroundColor: Colors.royalBlue
              }}
            />
          )}
          {currentlyStaking <= 0 && (
            <TouchableOpacity
              style={styles.buttonStakeView}
              onPress={() => handleStakeButton(availableToStake)}
            >
              <Text
                style={{
                  ...styles.buttonText
                }}
              >
                Stake
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  //onUnstake Button
  const handleUnstakePress = () => {
    setIfUnstaking(true);
    const { navigation, delegateUnstake } = props;

    delegateUnstake({
      publicKey: unstakeKey,
      cbSuccess: isSuccess => {
        if (isSuccess)
          navigation.navigate("WalletImported", {
            text: "Requested to unstake successfully",
            navigationRoute: "Back"
          });
        setIfUnstaking(false);
      }
    });
  };

  //onUnstake Button
  const handleWithdrawPress = () => {
    const { navigation, delegateWithdraw } = props;
    setifWithdrawing(true);
    delegateWithdraw({
      publicKey: unstakeKey,
      cbSuccess: isSuccess => {
        if (isSuccess)
          navigation.navigate("WalletImported", {
            text: "Tokens successfully withdrawn!",
            navigationRoute: "Staking"
          });
        setifWithdrawing(false);
      }
    });
  };

  const handleStakeButton = item => {
    if (item >= 1) {
      NavigationService.navigate(routes.root.ValidatorNode, {
        availableToStake: item
      });
    } else if (item < 1) {
      setStakeAmountModal(true);
    }
  };
  const withdrawText = `Withdraw ${delegateAmount} FTM now`;
  let carousRef = React.createRef(null);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.stakingTextView}>
        <Text style={styles.stakingText}>Staking</Text>
      </View>
      <View style={styles.crauselView}>
        {values && values.length === 1 ? (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {_renderItem({ item: values[0], index: 0 })}
          </View>
        ) : (
          <Carousel
            ref={carouselRef => (carousRef = carouselRef)}
            data={values}
            shouldOptimizeUpdates={false}
            renderItem={_renderItem}
            sliderWidth={Metrics.screenWidth}
            itemWidth={carouselWidth}
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
            extraData={carouselWidth !== 279}
          />
        )}
      </View>

      {/* Not Enought Ftm to Stake */}
      {stakeAmountModal && (
        <Modal
          modalText={modalText}
          modalTextStyle={styles.modalTextStyle}
          buttonViewStyle={styles.notEnoughSpaceButtonView}
          buttons={[
            {
              name: "Back",
              style: styles.backButtonStyle,
              onPress: () => setStakeAmountModal(false)
            }
          ]}
        />
      )}

      {/* Unstake Confirm */}
      {!!isWithdrawModalOpened && (
        <Modal
          modalText={withdrawText}
          stakingView={styles.unstakeOuterView}
          modalTextStyle={styles.modalTextStyle}
          buttonViewStyle={{
            ...styles.unstakeView,
            justifyContent: ifWithdrawing ? "center" : "space-between"
          }}
          buttons={
            ifWithdrawing
              ? [
                  {
                    name: "Withdrawing...",
                    style: {
                      ...styles.unstakeButton,
                      backgroundColor: Colors.grey
                    },
                    textStyle: styles.unStakeText,
                    disabled: true
                  }
                ]
              : [
                  {
                    name: "Cancel",
                    style: styles.backButtonStyle,
                    onPress: () => openWithdrawModal(""),
                    textStyle: styles.backButton,
                    disabled: ifWithdrawing
                  },
                  {
                    name: "Withdraw",
                    style: {
                      ...styles.unstakeButton,
                      backgroundColor: Colors.red
                    },

                    onPress: handleWithdrawPress,
                    textStyle: styles.unStakeText,
                    disabled: false
                  }
                ]
          }
        />
      )}

      {isUnstakeModalOpened && (
        <Modal
          modalText={unstakeText}
          stakingView={styles.unstakeOuterView}
          modalTextStyle={styles.modalTextStyle}
          buttonViewStyle={styles.unstakeView}
          buttons={[
            {
              name: "Cancel",
              style: styles.backButtonStyle,
              onPress: () => openUnstakingModal(!isUnstakeModalOpened),
              textStyle: styles.backButton,
              disabled: ifUnstaking
            },
            {
              name: ifUnstaking ? "Unstaking..." : "Unstake",
              style: {
                ...styles.unstakeButton,
                backgroundColor: ifUnstaking ? Colors.grey : Colors.red
              },
              onPress: handleUnstakePress,
              textStyle: styles.unStakeText,
              disabled: ifUnstaking
            }
          ]}
        />
      )}
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  stakes: state.stakes.data,
  wallets: state.wallet.walletsData
});

const mapDispatchToProps = {
  delegateByAddresses: delegateByAddressesAction,
  delegateUnstake: delegateUnstakeAction,
  delegateWithdraw: delegateWithdrawAction
};

export default connect(mapStateToProps, mapDispatchToProps)(Staking);
