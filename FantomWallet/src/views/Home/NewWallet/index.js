import React, { Component } from "react";
import {
  View,
  StatusBar,
  Text,
  ScrollView,
  ImageBackground,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  RefreshControl,
  Modal,
  NativeModules,
  Platform
} from "react-native";
import { Messages } from "../../../theme";
import { SafeAreaView } from "react-navigation";
import styles from "./styles";
import Button from "../../../components/general/Button";
import Icon from "react-native-vector-icons/FontAwesome";
import GridIcon from "../../../images/card-01.png";
import CardView from "./components/cardView";
import ListView from "./components/listView";
import StickyHeader from "./components/stickyHeader";
import ParallaxScrollView from "react-native-parallax-scroll-view";
import Carousel from "react-native-snap-carousel";
import { getHeight, getWidth } from "../../../utils/pixelResolver";
import { Colors } from "../../../theme";
import WalletMenu from "./components/walletMenu";
import DeviceInfo from "react-native-device-info";
import { getAppStoreVersion } from "../../../utils/converts";
import { setDopdownAlert as setDopdownAlertAction } from "../../../redux/notification/actions";
import { delegateByAddresses as delegateByAddressesAction } from "~/redux/staking/actions";

import CardHeader from "./components/cardListHeader";
import { connect } from "react-redux";
import {
  getBalance as getBalanceAction,
  getHistory as getHistoryAction,
  setCurrentWallet as setCurrentWalletAction,
  sendFtm as sendFtmAction
} from "~/redux/wallet/actions";
import Loader from "~/components/general/Loader";
import { setMylanguage } from "../../../theme";

import ReceiveModal from "../../InsideWallet/SingleWallet/components/ReceiveModal";
import SendModal from "../../InsideWallet/SingleWallet/components/SendModal";

class Wallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isListView: false,
      isHiddenText: false,
      activeSlide: 0,
      headerHeight: 1,
      isScaleView: 1,
      refreshLoader: false,
      showReceiveModal: false,
      showSendModal: false,
      transactionData: null,
      publicKeyModal: ""
    };
    this.carousel = React.createRef();
  }

  componentWillUnmount() {
    clearInterval(this._interval);
  }
  componentDidMount() {
    const {
      getBalance,
      getHistory,
      isLoading,
      walletsData,
      sendFtm,
      setCurrentWallet,
      language,
      setDopdownAlert,
      delegateByAddresses
    } = this.props;
    //  for the app updation Alert
    delegateByAddresses();
    console.log("Component Did mount");
    const version = DeviceInfo.getVersion();
    getAppStoreVersion().then(result => {
      if (result && result.version) {
        if (result && result.version && result.version > version) {
          setDopdownAlert("custom", Messages.updateNow, true);
        }
      }
    });
    // for the language of app
    if (language && language.selectedLanguage) {
      setMylanguage(language.selectedLanguage);
    } else if (language && language.selectedLanguage === "") {
      if (Platform.OS === "ios") {
        const locale = NativeModules.SettingsManager.settings.AppleLocale;
        if (locale.includes("ko")) setMylanguage("ko");
        else if (locale.includes("zh")) setMylanguage("zh-Hans");
        else setMylanguage("en");
      }

      if (Platform.OS === "android") {
        const locale1 = NativeModules.I18nManager.localeIdentifier; // "fr_FR"
        if (locale1.includes("ko")) setMylanguage("ko");
        else if (locale1.includes("zh")) setMylanguage("zh-Hans");
        else setMylanguage("en");
      }
    }

    if (walletsData && walletsData.length > 0 && !isLoading) {
      getBalance({ loading: isLoading });
      sendFtm();
      getHistory();
      this._interval = setInterval(() => {
        getBalance({ loading: isLoading });
        sendFtm();
        getHistory();
      }, 30000);
    }
  }

  changeView = isListView => {
    this.setState({ isListView, activeSlide: 0 });
  };
  setCardHiddenView = () => {
    const { isHiddenText } = this.state;
    this.setState({ isHiddenText: !isHiddenText });
  };

  getTotalCount = walletsData => {
    let totalBalance = 0;
    if (walletsData && walletsData.length > 0) {
      walletsData.forEach(item => {
        totalBalance += Number(item.balance);
      });
    }
    return totalBalance > 0 ? totalBalance.toFixed(2) : 0;
  };
  onRefresh = () => {
    const {
      getHistory,
      walletsData,
      getBalance,
      sendFtm,
      isLoading
    } = this.props;

    this.setState(
      {
        refreshLoader: true
      },
      () => {
        if (walletsData && walletsData.length > 0 && !isLoading) {
          getBalance({ loading: true });
          sendFtm();
          getHistory();
        }
      }
    );
    this.setState({
      refreshLoader: false
    });
  };

  handleTransactionClick = (type, item, publicKey) => {
    if (type && item) {
      if (type === "Sent") {
        this.setState({
          showSendModal: true,
          transactionData: item,
          publicKeyModal: publicKey
        });
      } else {
        this.setState({
          showReceiveModal: true,
          transactionData: item,
          publicKeyModal: publicKey
        });
      }
    }
  };
  render() {
    const {
      isListView,
      activeSlide,
      headerHeight,
      isScaleView,
      isHiddenText,
      refreshLoader,
      showReceiveModal,
      showSendModal,
      transactionData
    } = this.state;

    const {
      isLoading,
      wallets,
      walletsData,
      setCurrentWallet,
      Keys
    } = this.props;

    return (
      <View style={styles.mainContainer}>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar barStyle="dark-content" />
          {isLoading && (
            <Loader
              isLoading={isLoading}
              loaderStyle={0.25}
              loaderColor="#fff"
            />
          )}
          {isListView ? (
            <View>
              <CardHeader
                totalBalance={this.getTotalCount(walletsData)}
                setCardHiddenView={this.setCardHiddenView}
                isHiddenText={isHiddenText}
                margin={22}
                isListView={isListView}
                changeView={this.changeView}
                showCard={false}
              />
              <ScrollView
                style={[
                  {
                    height: getHeight(500),
                    marginHorizontal: getWidth(22)
                  }
                ]}
                showsVerticalScrollIndicator={false}
              >
                <FlatList
                  //  style={styles.listContainer}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  ItemSeparatorComponent={() => (
                    <View style={styles.itemSeperatorStyle} />
                  )}
                  data={walletsData}
                  renderItem={({ item }) => {
                    return (
                      <ListView
                        setCurrentWallet={setCurrentWallet}
                        data={item}
                        handleTransactionClick={this.handleTransactionClick}
                        isHiddenText={isHiddenText}
                      />
                    );
                  }}
                />
              </ScrollView>
            </View>
          ) : (
            <ScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              style={styles.safeAreaStyle}
            >
              <View>
                <View style={styles.marginHorizontal}>
                  <CardHeader
                    totalBalance={this.getTotalCount(walletsData)}
                    margin={0}
                    isHiddenText={isHiddenText}
                    setCardHiddenView={this.setCardHiddenView}
                    isListView={isListView}
                    changeView={this.changeView}
                    showCard={true}
                  />
                </View>
                <View
                  style={{
                    justifyContent: "center"
                  }}
                >
                  <Carousel
                    sliderWidth={
                      (Dimensions.get("window").width - getWidth(40)) *
                      walletsData.length
                    }
                    style={styles.listContainer}
                    sliderWidth={Dimensions.get("window").width}
                    ref={c => {
                      this.carousel = c;
                    }}
                    contentContainerCustomStyle={{
                      justifyContent: "center"
                    }}
                    onSnapToItem={index => {
                      const { walletsData, setCurrentWallet } = this.props;
                      this.setState({ activeSlide: index });
                      if (index > -1) {
                        setCurrentWallet(walletsData[index]);
                      }
                    }}
                    //activeSlideOffset={10}
                    inactiveSlideScale={1}
                    lockScrollWhileSnapping={true}
                    useScrollView={true}
                    //activeSlideAlignment={"center"}
                    pagingEnabled={false}
                    //swipeThreshold={150}
                    itemWidth={Dimensions.get("window").width - getWidth(40)}
                    renderItem={({ item, index }) => {
                      return (
                        <View
                          style={{
                            justifyContent: "center"
                          }}
                        >
                          <CardView
                            emptyView={false}
                            setCurrentWallet={setCurrentWallet}
                            isHiddenText={isHiddenText}
                            data={item}
                            showCard={true}
                            showList={false}
                            handleTransactionClick={this.handleTransactionClick}
                          />
                        </View>
                      );
                    }}
                    data={walletsData}
                  />
                </View>
              </View>

              <View style={[styles.marginHorizontal]}>
                <CardView
                  emptyView
                  setCurrentWallet={setCurrentWallet}
                  isHiddenText={isHiddenText}
                  data={walletsData[activeSlide] || []}
                  showCard={false}
                  showList={true}
                  handleTransactionClick={this.handleTransactionClick}
                />
              </View>
            </ScrollView>
          )}
        </SafeAreaView>

        <Modal
          transparent
          visible={showReceiveModal}
          style={styles.modalStyle}
          onRequestClose={() => this.setState({ showReceiveModal: false })}
        >
          <ReceiveModal
            transactionData={transactionData}
            showReceiveModal={showReceiveModal}
            closeReceiveModal={() => this.setState({ showReceiveModal: false })}
          />
        </Modal>
        <Modal
          transparent
          visible={showSendModal}
          style={styles.modalStyle}
          onRequestClose={() => this.setState({ showSendModal: false })}
        >
          <SendModal
            transactionData={transactionData}
            showSendModal={showSendModal}
            closeSendModal={() => this.setState({ showSendModal: false })}
          />
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  wallets: state.keys.wallets,
  Keys: state.keys,
  walletsData: state.wallet.walletsData,
  isLoading: state.wallet.loading,
  language: state.selectedLanguage
});

const mapDispatchToProps = {
  getBalance: getBalanceAction,
  getHistory: getHistoryAction,
  setCurrentWallet: setCurrentWalletAction,
  sendFtm: sendFtmAction,
  setDopdownAlert: setDopdownAlertAction,
  delegateByAddresses: delegateByAddressesAction
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
