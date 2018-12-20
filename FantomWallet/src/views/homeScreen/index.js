// Library
import React, { Component } from 'react';
import { View, StatusBar, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import Web3 from 'web3';
import DropdownAlert from 'react-native-dropdownalert';

import BigInt from 'big-integer';
// Component
import NavigationTab from './navigationTab';
import Header from '../../general/header';
import config from '../../services/config';
import { SUCCESS, RECEIVED, SENT, FAILED } from '../../common/constants';
// import fantomIcon from '../../images/fantomWhiteIcon.png';fantom_logo_TranparentWhite.png
// import fantomIcon from '../../images/fantom_logo_TranparentWhite.png';
import fantomIcon from '../../images/FantomWalletWhiteIcon.png';
import settingIcon from '../../images/setting.png';
import refreshWhiteIcon from '../../images/refreshWhiteIcon.png';

const configHelper = config();
const deviceHeight = Dimensions.get('window').height;

function scientificToDecimal(num) {
  const sign = Math.sign(num);
  // if the number is in scientific notation remove it
  if (/\d+\.?\d*e[\+\-]*\d+/i.test(num)) {
    // eslint-disable-line
    const zero = '0';
    const parts = String(num)
      .toLowerCase()
      .split('e'); // split into coeff and exponent
    const e = parts.pop(); // store the exponential part
    let l = Math.abs(e); // get the number of zeros
    const direction = e / l; // use to determine the zeroes on the left or right
    const coeffArray = parts[0].split('.');
    if (direction === -1) {
      coeffArray[0] = Math.abs(coeffArray[0]);
      num = `${zero}.${new Array(l).join(zero)}${coeffArray.join('')}`; // eslint-disable-line
    } else {
      const dec = coeffArray[1];
      if (dec) l -= dec.length;
      num = coeffArray.join('') + new Array(l + 1).join(zero); // eslint-disable-line
    }
  }

  if (sign < 0) {
    num = -num; // eslint-disable-line
  }

  return num;
}

/**
 *  This is the Home Screen for App.
 */
class TransactionEntity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: '0',
      gasPrice: 0x000000000001,
      maxFantomBalance: 0,
      transactionData: [],
      isLoading: !!this.props.publicKey,
      activeTabIndex: 0,
    };
    this.loadTransactionData = this.loadTransactionData.bind(this);
    this.loadFantomTransactionData = this.loadFantomTransactionData.bind(this);
    if (this.props.publicKey) {
      this.getWalletBalance(this.props.publicKey);
      this.getWalletTransaction(this.props.publicKey);
    }
    this.onRefresh = this.onRefresh.bind(this);
  }

  componentDidMount() {
    setInterval(() => {
      if (this.props.publicKey && !this.props.isLoading) {
        this.getWalletBalance(this.props.publicKey);
      }
    }, 5000);
  }

  /**
   * onRefresh() :  To reload the transaction data on page refresh.
   */
  onRefresh() {
    if (this.props.publicKey && !this.props.isLoading) {
      this.setState({
        isLoading: true,
      });
      this.getWalletBalance(this.props.publicKey);
      this.getWalletTransaction(this.props.publicKey);
    }
  }

  onRightIconPress() {
    this.props.navigation.navigate('Settings');
  }

  getWalletBalance(address) {
    if (configHelper.isEthereumMode) {
      this.getEtherBalanceFromApiAsync(address);
    } else {
      this.getFantomBalanceFromApiAsync(address);
    }
  }

  getWalletTransaction(address) {
    if (configHelper.isEthereumMode) {
      this.getEtherTransactionsFromApiAsync(address);
    } else {
      // this.getFantomTransactionsFromApiAsync(address);
    }
  }

  // /////////////////////////////////////////   FOR ETHER END POINT  ////////////////////////////////////////////////////////////////

  /**
   * getEtherBalanceFromApiAsync() :  Api to fetch Ether wallet balance for given address.
   * @param { String } address : address to fetch wallet balance.
   */
  getEtherBalanceFromApiAsync(address) {
    // const dummyAddress = '0x4d8868F7d7581d770735821bb0c83137Ceaf18FD';
    return fetch(
      `https://api-ropsten.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=WQ1D9TBEG4IWFNGZSX3YP4QKXUI1CVAUBP`
    )
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.status && responseJson.status === '1') {
          const balance = responseJson.result;
          const valInEther = Web3.utils.fromWei(balance, 'ether');
          this.setState({
            balance: valInEther,
          });
        }
        return responseJson;
      })
      .catch(error => {
        // console.error(error);
      });
  }

  /**
   * getEtherTransactionsFromApiAsync():  Api to fetch transactions for given address.
   * @param {String} address : address to fetch transactions.
   */
  getEtherTransactionsFromApiAsync(address) {
    fetch(
      `http://api-ropsten.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=WQ1D9TBEG4IWFNGZSX3YP4QKXUI1CVAUBP`
    )
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson && responseJson.result && responseJson.result.length) {
          this.loadTransactionData(responseJson);
        } else {
          this.setState({
            isLoading: false,
          });
        }
        return responseJson;
      })
      .catch(error => {
        // console.error(error);
        this.setState({
          isLoading: false,
        });
      });
  }

  // /////////////////////////////////////////   FOR FANTOM OWN END POINT  ////////////////////////////////////////////////////////////////
  /**
   * getFantomBalanceFromApiAsync() :  Api to fetch wallet balance for given address of Fantom own endpoint.
   * @param { String } address : address to fetch wallet balance.
   */
  getFantomBalanceFromApiAsync(address) {
    //eslint-disable-line
    // const dummyAddress = '0xFD00A5fE03CB4672e4380046938cFe5A18456Df4';
    return fetch(`${configHelper.apiUrl}/account/${address}`)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson && responseJson.balance !== undefined && responseJson.balance) {
          const balance = scientificToDecimal(responseJson.balance);
          const valInEther = Web3.utils.fromWei(`${balance}`, 'ether');
          const ftmBalance = valInEther;
          const { gasPrice } = this.state;
          const maxFantomBalance = BigInt(responseJson.balance).minus(gasPrice);
          const convertToEther = Web3.utils.fromWei(`${maxFantomBalance.value}`, 'ether');

          this.setState({
            balance: ftmBalance,
            maxFantomBalance: convertToEther,
            isLoading: false,
          });
        } else {
          this.setState({
            balance: 0,
            maxFantomBalance: 0,
            isLoading: false,
          });
        }

        return responseJson;
      })
      .catch(error => {
        this.setState({
          maxFantomBalance: 0,
          balance: 0,
          isLoading: false,
        });
      });
  }

  onTabChange(index) {
    this.setState({
      activeTabIndex: index,
    });
  }

  /**
   * getFantomTransactionsFromApiAsync():  Api to fetch transactions for given address of Fantom own endpoint.
   * @param {String} address : address to fetch transactions.
   */
  // getFantomTransactionsFromApiAsync(address) {
  getFantomTransactionsFromApiAsync() {
    //eslint-disable-line
    const dummyAddress = '0x68a07a9dc6ff0052e42f4e7afa117e90fb896eda168211f040da69606a2aeddc';

    fetch(`${configHelper.apiUrl}/transaction/${dummyAddress}`)
      // fetch(configHelper.apiUrl+'/transactions/'+ dummyAddress)
      .then(response => response.json())
      .then(responseJson => {
        // if (responseJson && responseJson.result && responseJson.result.length) {
        if (responseJson) {
          // this.loadFantomTransactionData(responseJson.result);
          this.loadFantomTransactionData(responseJson);
        } else {
          this.setState({
            isLoading: false,
          });
        }
        return responseJson;
      })
      .catch(error => {
        this.setState({
          isLoading: false,
        });
      });
  }

  /**
   * loadFantomTransactionData() :  Function to create array of objects from response of Api calling for storing transactions.
   * @param {*} responseJson : Json of transaction response data from Api.
   */
  loadFantomTransactionData(result) {
    let transactionData = [];
    const publicKey = '0xfd00a5fe03cb4672e4380046938cfe5a18456df4'.toLowerCase();
    // let publicKey = this.props.publicKey.toLowerCase();
    let type = '';
    let transactionId = '';
    // for (let data of result) {
    const data = result;
    if (publicKey === data.from.toLowerCase()) {
      type = SENT;
      transactionId = data.to;
    } else if (publicKey === data.to.toLowerCase()) {
      type = RECEIVED;
      transactionId = data.from;
    }
    const transactionStatus = data.failed === false ? SUCCESS : FAILED;
    if (publicKey === data.from || publicKey === data.to) {
      const value = data.value || '0';
      const valInEther = Web3.utils.fromWei(value, 'ether');

      transactionData.push({
        type,
        amount: valInEther,
        transactionId,
        transactionStatus,
        amountUnit: 'FTM',
        from: data.from,
        to: data.to,
        isError: data.failed === false ? '0' : '1',
      });
    }
    // }
    transactionData = transactionData.reverse();
    this.setState({
      transactionData,
      isLoading: false,
    });
  }

  /**
   * loadTransactionData() :  Function to create array of objects from response of Api calling for storing transactions.
   * @param {*} responseJson : Json of transaction response data from Api.
   */
  loadTransactionData(responseJson) {
    let transactionData = [];
    const publicKey = this.props.publicKey.toLowerCase();
    let type = '';
    let transactionId = '';
    for (const data of responseJson.result) {
      if (publicKey === data.from.toLowerCase()) {
        type = SENT;
        transactionId = data.to;
      } else if (publicKey === data.to.toLowerCase()) {
        type = RECEIVED;
        transactionId = data.from;
      }
      let transactionStatus = data.isError === '0' ? SUCCESS : FAILED;
      if (publicKey === data.from || publicKey === data.to) {
        const { value } = data.value;
        const valInEther = Web3.utils.fromWei(value, 'ether');

        transactionData.push({
          type,
          amount: valInEther,
          transactionId,
          transactionStatus,
          amountUnit: 'FTM',
          from: data.from,
          to: data.to,
          isError: data.isError,
        });
      }
    }
    transactionData = transactionData.reverse();
    this.setState({
      transactionData,
      isLoading: false,
    });
  }

  fetchData() {
    const displaytext = 'copied';
    this.dropdown.alertWithType('custom', displaytext.toUpperCase(), '');
  }

  renderToastNotification(data) {
    this.fetchData();
  }

  render() {
    const { balance, transactionData, isLoading, maxFantomBalance, activeTabIndex } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        <Header
          isRightBtnImage
          rightButtonIcon={settingIcon}
          headerStyle={{
            backgroundColor: 'rgb(44,52,58)',
            height: deviceHeight < 810 ? 84 : (106 / 812) * deviceHeight,
          }}
          onRightIconPress={() => this.onRightIconPress()}
          fantomIcon={fantomIcon}
          leftButtonIcon={activeTabIndex === 0 ? 'refresh' : ''}
          leftIconColor="#fff"
          leftIconSize={30}
          rightImageStyling={{
            height: 30,
            width: 30,
          }}
          onLeftIconPress={() => this.onRefresh()}
        />
        <NavigationTab
          navigation={this.props.navigation}
          balance={balance}
          maxFantomBalance={maxFantomBalance}
          transactionData={transactionData}
          isLoading={isLoading}
          onRefresh={this.onRefresh}
          onTabChange={index => this.onTabChange(index)}
          renderToastNotification={data => this.renderToastNotification(data)}
        />
        <DropdownAlert
          containerStyle={{ backgroundColor: 'rgb(0,168,251)' }}
          ref={ref => (this.dropdown = ref)}
          style={{ backgroundColor: 'red' }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  publicKey: state.keyReducer.publicKey,
});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionEntity);
