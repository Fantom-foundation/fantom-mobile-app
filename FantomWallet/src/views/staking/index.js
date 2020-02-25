// @flow
import React, { useState, useEffect, Suspense } from "react";
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Alert,
  FlatList,
  Platform,
  RefreshControl
} from "react-native";
import styles from "./styles";

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
import { getBalance as getBalanceAction } from "~/redux/wallet/actions";
import moment from "moment";
import { Messages } from "../../theme";
import Fantom from "web3-functions";
import _ from "lodash";
import { ScrollView } from "react-native-gesture-handler";

const Staking = (props: Props) => {
  const [isUnstakeModalOpened, openUnstakingModal] = useState(false);
  const [ifUnstaking, setIfUnstaking] = useState(false);
  const [ifWithdrawing, setifWithdrawing] = useState(false);
  const [isWithdrawModalOpened, openWithdrawModal] = useState("");
  const [delegateAmount, setDelegateAmount] = useState("");
  const [unstakeKey, setUnstakeKey] = useState("");
  const [estimatedfee, setEstimatedfee] = useState(0);
  const [stakeAmountModal, setStakeAmountModal] = useState(false);
  const { delegateByAddresses, stakes, wallets, navigation } = props;

  const [flag, setFlag] = useState(0);
  const [values, setValues] = useState(wallets);
  const [carouselWidth, setCarouselWidth] = useState(getWidth(279));
  const [reRender, setRerender] = useState(0);
  const modalText = Messages.atleast1Ftm;
  const unstakeText = Messages.withdrawAlert;

  useEffect(() => {
    const gasLimit = 150000;
    Fantom.estimateFeeMobile(gasLimit).then(value => {
      if (value) {
        setEstimatedfee(value * 2);
      }
    });
  });

  useEffect(() => {
    const renderTime = setInterval(() => {
      setRerender(prev => prev + 1);
    }, 2000);

    return () => {
      clearInterval(renderTime);
    };
  }, [reRender]);
  // (wallets.length + 1) * 1000

  const isArrayEqual = (x, y) => {
    return _(x)
      .differenceWith(y, _.isEqual)
      .isEmpty();
  };
  useEffect(() => {
    setValues(wallets);
    const interval = setInterval(() => {
      setValues(wallets);
      delegateByAddresses();
    }, 30000);
    const timer = setInterval(() => {
      setFlag(prev => prev + 1);
    }, 30000);

    return () => {
      clearInterval(interval);
      clearInterval(timer);
    };
  }, [!isArrayEqual(wallets, values)]);

  useEffect(() => {
    setValues(wallets);
    delegateByAddresses();
    setTimeout(() => {
      setCarouselWidth(getWidth(280));
    }, 500);
  }, [wallets.length]);

  // if(!isArrayEqual(wallets, values)){
  //   props.getBalance
  // }

  console.log(wallets, "****** wallets *******");

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
      return !!value && value > 0 ? formatNumber(Number(value).toFixed(6)) : 0;
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
    const todayDate = new Date();
    // const deactivatedDate = delegateDate.setDate(
    //   delegateDate.getDate() + Number(stakeData.deactivatedTime || 0)
    // );

    const deactivatedEpoch = Number(stakeData.deactivatedEpoch || 0);

    const deactivatedTime = Number(stakeData.deactivatedTime || 0);
    // const timeLeft =
    //   delegateDate.getTime() - deactivatedTime + currentDate.getTime();
    const date1 = new Date(deactivatedTime * 1000);
    date1.setDate(date1.getDate() + 7);
    const date2 = new Date();
    const startTime = moment(date1, "YYYY/MM/DD HH:mm");
    const endTime = moment(date2, "YYYY/MM/DD HH:mm");

    const timeLeft = startTime.diff(endTime, "hours", true);

    // const diffTime = Math.abs(date1 - date2);
    // const timeLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const currentlyStaking = formatValues(Number(stakeData.amount || 0));

    const isUnstaking = navigation.getParam("isUnstaking");

    return (
      <View
        style={{
          ...styles.walletView
        }}
      >
        <View style={styles.stakingCard}>
          <Text numberOfLines={1} style={{ ...styles.titleView }}>
            {item.name}
          </Text>
          <Text style={{ ...styles.amountStyle }}>
            {formatValues(availableToStake, false)}
          </Text>
          <Text style={{ ...styles.walletTextStyle }}>
            {Messages.availableStake}
          </Text>

          <Text style={{ ...styles.amountStyle }}>{currentlyStaking}</Text>
          <Text style={{ ...styles.walletTextStyle }}>
            {Messages.currentlyStaking}
          </Text>
          {deactivatedEpoch <= 0 && (
            <View>
              <Text style={{ ...styles.amountStyle }}>
                {formatValues(stakeData.claimedRewards)}
              </Text>
              <Text style={{ ...styles.walletTextStyle }}>
                {Messages.earnedRewards}
              </Text>
            </View>
          )}
          {timeLeft > 0 && deactivatedEpoch > 0 ? (
            <Text style={{ ...styles.amountStyle, textAlign: "center" }}>
              {`${Messages.your} ${currentlyStaking} FTM ${
                Messages.willAvailable
              } ${
                timeLeft / 24 > 0
                  ? Math.floor(timeLeft / 24) + `${Messages.daysAnd}`
                  : ""
              }  ${Math.floor(timeLeft % 24)} ${Messages.hours}`}
            </Text>
          ) : deactivatedEpoch > 0 && isDeligate && currentlyStaking > 0 ? (
            <>
              <Text style={{ ...styles.amountStyle }}>
                {Messages.withdraw} {currentlyStaking} FTM {Messages.now}
              </Text>
              <TouchableOpacity
                style={{ ...styles.buttonStakeView, ...styles.withdraw }}
                onPress={() => {
                  if (Number(item.balance).toFixed(2) < Number(estimatedfee)) {
                    Alert.alert(
                      Messages.insufficentFunds,
                      `${Messages.minimumAmountAlert} ${estimatedfee.toFixed(
                        5
                      )} ${Messages.minimumAmountAlert1}`
                    );
                  } else {
                    if (stakeData) setUnstakeKey(stakeData.publicKey);
                    openWithdrawModal(true);
                    setDelegateAmount(currentlyStaking);
                  }
                }}
              >
                <Text
                  style={{
                    ...styles.buttonText
                  }}
                >
                  {Messages.withdraw}
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <View />
          )}

          {deactivatedEpoch <= 0 && (
            <View>
              <Text style={{ ...styles.amountStyle }}>
                {formatValues(stakeData.pendingRewards, false)}
              </Text>
              <Text style={{ ...styles.walletTextStyle }}>
                {Messages.pendingRewards}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.buttonView}>
          {/* {availableToStake.isDeligate ? ( */}
          {isDeligate && deactivatedEpoch <= 0 ? (
            <TouchableOpacity
              style={styles.buttonUnstakeView}
              onPress={() => {
                if (stakeData) {
                  setUnstakeKey(stakeData.publicKey);
                  if (Number(item.balance).toFixed(2) < Number(estimatedfee)) {
                    Alert.alert(
                      Messages.insufficentFunds,
                      `${Messages.minimumAmountAlert} ${estimatedfee.toFixed(
                        5
                      )} ${Messages.minimumUnstakeAlert}`
                    );
                  } else openUnstakingModal(true);
                }
              }}
            >
              <Text
                style={{
                  ...styles.buttonText
                }}
              >
                {Messages.unstake}
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
              onPress={() =>
                handleStakeButton(availableToStake, item.publicKey)
              }
            >
              <Text
                style={{
                  ...styles.buttonText
                }}
              >
                {Messages.stake}
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
        setIfUnstaking(false);
        if (isSuccess)
          navigation.navigate("WalletImported", {
            text: Messages.unstakeSuccessfull,
            navigationRoute: "Back"
          });
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
        setifWithdrawing(false);
        if (isSuccess)
          navigation.navigate("WalletImported", {
            text: Messages.tokenWidthdraw,
            navigationRoute: "Staking"
          });
      }
    });
  };

  const handleStakeButton = (amount, publicKey) => {
    if (amount >= 1) {
      NavigationService.navigate(routes.root.ValidatorNode, {
        availableToStake: amount,
        publicKey
      });
    } else if (amount < 1) {
      setStakeAmountModal(true);
    }
  };
  const withdrawText = `${Messages.withdraw} ${delegateAmount} FTM ${Messages.now}`;
  let carousRef = React.createRef(null);
  console.log(values, "values");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.stakingTextView}>
        <Text style={styles.stakingText}>{Messages.staking}</Text>
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
          <>
            {Platform.OS === "android" && (
              <FlatList
                data={values}
                renderItem={_renderItem}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.contentContainerStyle}
              />
            )}
            {Platform.OS === "ios" && (
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
          </>
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
              name: Messages.back,
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
                    name: Messages.withdrawing,
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
                    name: Messages.cancel,
                    style: styles.backButtonStyle,
                    onPress: () => openWithdrawModal(""),
                    textStyle: styles.backButton,
                    disabled: ifWithdrawing
                  },
                  {
                    name: Messages.withdraw,
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
          buttonViewStyle={
            ifUnstaking
              ? { ...styles.unstakeView, justifyContent: "center" }
              : styles.unstakeView
          }
          buttons={[
            {
              name: Messages.cancel,
              style: styles.backButtonStyle,
              onPress: () => openUnstakingModal(!isUnstakeModalOpened),
              textStyle: styles.backButton,
              disabled: ifUnstaking,
              isShow: ifUnstaking ? false : true
            },
            {
              name: ifUnstaking ? Messages.unStaking : Messages.unstake,
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
  wallets: state.wallet.walletsData,
  isLoading: state.wallet.loading
});

const mapDispatchToProps = {
  delegateByAddresses: delegateByAddressesAction,
  delegateUnstake: delegateUnstakeAction,
  getBalance: getBalanceAction,

  delegateWithdraw: delegateWithdrawAction
};

export default connect(mapStateToProps, mapDispatchToProps)(Staking);
