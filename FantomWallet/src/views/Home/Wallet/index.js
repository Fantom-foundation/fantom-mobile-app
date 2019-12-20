// @flow
import React, { useEffect } from "react";
import { View, Image } from "react-native";
import { connect } from "react-redux";

import {
  getBalance as getBalanceAction,
  getHistory as getHistoryAction
} from "~/redux/wallet/actions";
import styles from "./styles";
// components
import WalletViewInfo from "./walletViewInfo";
import BackgroundImage from "~/images/BackgroundIcon.png";

type Props = {
  balance: string,
  isLoading: boolean,
  publicKey: string,
  history: Array<any>,
  getBalance: ({ loading: boolean }) => void,
  getHistory: () => void,
  navigation: {
    navigate: string => void
  }
};

/**
 * To Display WalletTab related tasks
 */
export const Wallet = ({
  balance,
  publicKey,
  history,
  getBalance,
  getHistory,
  isLoading
}: Props) => {
  const getData = (loading: boolean = false) => {
    if (publicKey && !isLoading) {
      getBalance({ loading });
      getHistory();
    }
  };

  useEffect(() => {
    getData();
    setInterval(getData, 5000);
  }, []);

  return (
    <View style={styles.walletScreenStyle}>
      <Image
        style={styles.backgroundImgStyle}
        source={BackgroundImage}
        resizeMode="contain"
      />
      <WalletViewInfo
        transactionData={history}
        balance={balance}
        isLoading={isLoading}
        onRefresh={getData}
        publicKey={publicKey}
      />
    </View>
  );
};

const mapStateToProps = state => ({
  publicKey: state.keys.publicKey,
  balance: state.wallet.balance,
  isLoading: state.wallet.loading,
  history: state.wallet.history
});

const mapDispatchToProps = {
  getBalance: getBalanceAction,
  getHistory: getHistoryAction
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
