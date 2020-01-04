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
  Modal
} from "react-native";
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
import CardHeader from "./components/cardListHeader";
import { connect } from "react-redux";
import {
  getBalance as getBalanceAction,
  getHistory as getHistoryAction,
  setCurrentWallet as setCurrentWalletAction,
  sendFtm as sendFtmAction
} from "~/redux/wallet/actions";
import Loader from "~/components/general/Loader";

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
  componentDidMount() {
    const {
      getBalance,
      getHistory,
      isLoading,
      walletsData,
      sendFtm,
      setCurrentWallet
    } = this.props;
    if (walletsData && walletsData.length > 0 && !isLoading) {
      getBalance({ loading: isLoading });
      sendFtm();
      getHistory();
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
    console.log("all walllets", walletsData, wallets);

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
                        isHiddenText={isHiddenText}
                      />
                    );
                  }}
                />
              </ScrollView>
            </View>
          ) : (
            <SafeAreaView style={styles.safeAreaStyle}>
              <ParallaxScrollView
                refreshControl={
                  <RefreshControl
                    refreshing={refreshLoader}
                    onRefresh={() => this.onRefresh()}
                  />
                }
                onScroll={event => {
                  const threshold = 30;

                  if (
                    event.nativeEvent.contentOffset.y <= threshold &&
                    headerHeight > 1
                  ) {
                    this.setState({ headerHeight: 1, isScaleView: 1 });
                  } else if (
                    event.nativeEvent.contentOffset.y > threshold &&
                    headerHeight === 1
                  ) {
                    this.setState({ headerHeight: 220, isScaleView: 0 });
                  }
                }}
                isForegroundTouchable={true}
                backgroundColor={Colors.white}
                showsVerticalScrollIndicator={false}
                // stickyHeaderHeight={getHeight(headerHeight)}
                parallaxHeaderHeight={getHeight(440)}
                // renderStickyHeader={() => (
                //   <View
                //     style={[
                //       styles.stickyHeaderContainer,
                //       styles.marginHorizontal
                //     ]}
                //   >
                //     <WalletMenu
                //       isListView={isListView}
                //       changeView={this.changeView}
                //       customStyle={{
                //         marginVertical: getHeight(40)
                //       }}
                //     />
                //     <StickyHeader
                //       setCurrentWallet={setCurrentWallet}
                //       data={walletsData[activeSlide] || []}
                //     />
                //   </View>
                // )}
                renderForeground={() => (
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
                    <Carousel
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
                      activeSlideOffset={20}
                      inactiveSlideScale={isScaleView}
                      lockScrollWhileSnapping={true}
                      useScrollView={true}
                      activeSlideAlignment={"center"}
                      pagingEnabled={true}
                      swipeThreshold={150}
                      itemWidth={Dimensions.get("window").width - 40}
                      renderItem={({ item, index }) => {
                        return (
                          <CardView
                            emptyView={false}
                            setCurrentWallet={setCurrentWallet}
                            isHiddenText={isHiddenText}
                            data={item}
                            showCard={true}
                            showList={false}
                            handleTransactionClick={this.handleTransactionClick}
                          />
                        );
                      }}
                      data={walletsData}
                    />
                  </View>
                )}
              >
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
              </ParallaxScrollView>
            </SafeAreaView>
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
  isLoading: state.wallet.loading
});

const mapDispatchToProps = {
  getBalance: getBalanceAction,
  getHistory: getHistoryAction,
  setCurrentWallet: setCurrentWalletAction,
  sendFtm: sendFtmAction
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
