import React, { Component } from 'react';
import {
  View,
  StatusBar,
  Text,
  ScrollView,
  ImageBackground,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import styles from './styles';
import Button from '../../../components/general/Button';
import Icon from 'react-native-vector-icons/FontAwesome';
import GridIcon from '../../../images/card-01.png';
import CardView from './components/cardView';
import ListView from './components/listView';

import StickyHeader from './components/stickyHeader';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import Carousel from 'react-native-snap-carousel';
import { getHeight, getWidth } from '../../../utils/pixelResolver';
import { Colors } from '../../../theme';
import WalletMenu from './components/walletMenu';
import CardHeader from './components/cardListHeader';
import { connect } from 'react-redux';
import {
  getBalance as getBalanceAction,
  getHistory as getHistoryAction,
  setCurrentWallet as setCurrentWalletAction
} from '~/redux/wallet/actions';
import Loader from '~/components/general/Loader';
import { fantomToDollar } from '../../../utils/converts';
import axios from 'axios';

class Wallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isListView: false,
      isHiddenText: false,
      activeSlide: 0,
      headerHeight: 1,
      isScaleView: 1
    };
    this.carousel = React.createRef();

  }
  componentDidMount() {
    const { getBalance, getHistory, isLoading, walletsData } = this.props;
    if (walletsData && walletsData.length > 0 && !isLoading) {
      console.log(walletsData, '***** walletsData ****');
      getBalance({ loading: isLoading });
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

  render() {
    const {
      isListView,
      activeSlide,
      headerHeight,
      isScaleView,
      isHiddenText
    } = this.state;

    const { isLoading, wallets, walletsData, setCurrentWallet } = this.props;

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
              </ScrollView >
            </View>
          ) : (
              <ParallaxScrollView
            
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
              stickyHeaderHeight={getHeight(headerHeight)}
              parallaxHeaderHeight={getHeight(230)}
              renderStickyHeader={() => (
                <View
                  style={[
                    styles.stickyHeaderContainer,
                    styles.marginHorizontal
                  ]}
                >
                  <WalletMenu
                    isListView={isListView}
                    changeView={this.changeView}
                    customStyle={{
                      marginVertical: getHeight(40)
                    }}
                  />
                  <StickyHeader
                    setCurrentWallet={setCurrentWallet}
                    data={walletsData[activeSlide] || []}
                  />
                </View>
              )}
              renderForeground={() => (
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
              )}
            >
              <Carousel
                style={styles.listContainer}
                sliderWidth={Dimensions.get('window').width}
                ref={c => {
                  this.carousel = c;
                }}
                contentContainerCustomStyle={{
                  justifyContent: 'center'
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
                activeSlideAlignment={'center'}
                pagingEnabled={true}
                swipeThreshold={150}
                itemWidth={Dimensions.get('window').width - 40}
                renderItem={({ item, index }) => {
                  return (isScaleView?
                    <CardView
                    setCurrentWallet={setCurrentWallet}
                      isHiddenText={isHiddenText}
                      data={item}
                      showCard={true}
                      showList={false}
                    />:<View/>
                  );
                }}
                data={walletsData}
              />
              <View style={[styles.marginHorizontal]}>
                  <CardView
                    setCurrentWallet={setCurrentWallet}
                  isHiddenText={isHiddenText}
                  data={walletsData[activeSlide] || []}
                  showCard={false}
                  showList={true}
                />
              </View>
            </ParallaxScrollView>
          )}
        </SafeAreaView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  wallets: state.keys.wallets,
  walletsData: state.wallet.walletsData,
  isLoading: state.wallet.loading
});

const mapDispatchToProps = {
  getBalance: getBalanceAction,
  getHistory: getHistoryAction,
  setCurrentWallet: setCurrentWalletAction
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
