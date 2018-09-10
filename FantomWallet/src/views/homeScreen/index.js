import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { connect } from 'react-redux';
const Web3 = require('web3');

import NavigationTab from '../../views/homeScreen/navigationTab/';
import Header from '../../general/header/';

import fantomIcon from '../../images/fantomWhiteIcon.png';
import secondaryIcon from '../../images/icon.png';
import leftIcon from '../../images/notification_red.png';
import settingIcon from '../../images/setting.png';
import { SUCCESS, RECEIVED, SENT, FAILED } from '../../common/constants/';

import config from '../../services/config/';
const configHelper = config();

function scientificToDecimal(num) {
    const sign = Math.sign(num);
    //if the number is in scientific notation remove it
    if(/\d+\.?\d*e[\+\-]*\d+/i.test(num)) {
        const zero = '0';
        const parts = String(num).toLowerCase().split('e'); //split into coeff and exponent
        const e = parts.pop(); //store the exponential part
        let l = Math.abs(e); //get the number of zeros
        const direction = e/l; // use to determine the zeroes on the left or right
        const coeff_array = parts[0].split('.');
        
        if (direction === -1) {
            coeff_array[0] = Math.abs(coeff_array[0]);
            num = zero + '.' + new Array(l).join(zero) + coeff_array.join('');
        }
        else {
            const dec = coeff_array[1];
            if (dec) l = l - dec.length;
            num = coeff_array.join('') + new Array(l+1).join(zero);
        }
    }
    
    if (sign < 0) {
        num = -num;
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
            transactionData: [],
            isLoading: true,
        }
        this.loadTransactionData = this.loadTransactionData.bind(this);
        this.loadFantomTransactionData = this.loadFantomTransactionData.bind(this);
        if (this.props.publicKey) {
            this.getWalletBalance(this.props.publicKey);
            this.getWalletTransaction(this.props.publicKey);
        }
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
            this.getFantomTransactionsFromApiAsync(address);
        }
    }

    ///////////////////////////////////////////   FOR FANTOM OWN END POINT  ////////////////////////////////////////////////////////////////
    /**
     * getFantomBalanceFromApiAsync() :  Api to fetch wallet balance for given address of Fantom own endpoint.
     * @param { String } address : address to fetch wallet balance.
     */
    getFantomBalanceFromApiAsync(address) {
        let dummyAddress = '0xFD00A5fE03CB4672e4380046938cFe5A18456Df4';
        return fetch(configHelper.apiUrl + '/account/' + dummyAddress)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson && responseJson.balance) {
                    const balance = scientificToDecimal(responseJson.balance);
                    const valInEther = Web3.utils.fromWei('' + balance, 'ether');
                    this.setState({
                        balance: valInEther,
                    })
                }
                return responseJson;
            })
            .catch((error) => {
                console.log(error);
            });
    }


    /**
     * getFantomTransactionsFromApiAsync():  Api to fetch transactions for given address of Fantom own endpoint.
     * @param {String} address : address to fetch transactions.
     */
    getFantomTransactionsFromApiAsync(address) {
        const dummyAddress = '0x68a07a9dc6ff0052e42f4e7afa117e90fb896eda168211f040da69606a2aeddc';

        fetch(configHelper.apiUrl + '/transaction/' + dummyAddress)

            // fetch(configHelper.apiUrl+'/transactions/'+ dummyAddress)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('from fantom own wallet , transaction response : ', responseJson);
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
            .catch((error) => {
                // console.error(error);
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
        let publicKey = '0xfd00a5fe03cb4672e4380046938cfe5a18456df4'.toLowerCase();
        // let publicKey = this.props.publicKey.toLowerCase();
        let type = '';
        let transactionId = '';
        // for (let data of result) {
        let data = result;
        if (publicKey === data.from.toLowerCase()) {
            type = SENT;
            transactionId = data.to;
        } else if (publicKey === data.to.toLowerCase()) {
            type = RECEIVED;
            transactionId = data.from;
        }
        transactionStatus = (data.failed === false) ? SUCCESS : FAILED;
        if (publicKey === data.from || publicKey === data.to) {
            const value = data.value || '0';
            const valInEther = Web3.utils.fromWei(value, 'ether');

            transactionData.push({
                type: type,
                amount: valInEther,
                transactionId: transactionId,
                transactionStatus: transactionStatus,
                amountUnit: 'FTM',
                from: data.from,
                to: data.to,
                isError: (data.failed === false) ? '0' : '1',
            });
        }
        // }
        transactionData = transactionData.reverse();
        this.setState({
            transactionData,
            isLoading: false,
        });
    }

    ///////////////////////////////////////////   FOR ETHER END POINT  ////////////////////////////////////////////////////////////////

    /**
     * getEtherBalanceFromApiAsync() :  Api to fetch Ether wallet balance for given address.
     * @param { String } address : address to fetch wallet balance.
     */
    getEtherBalanceFromApiAsync(address) {
        const dummyAddress = '0x4d8868F7d7581d770735821bb0c83137Ceaf18FD'
        return fetch('https://api-ropsten.etherscan.io/api?module=account&action=balance&address=' + dummyAddress + '&tag=latest&apikey=WQ1D9TBEG4IWFNGZSX3YP4QKXUI1CVAUBP')
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status && responseJson.status === "1") {
                    const balance = responseJson.result;
                    const valInEther = Web3.utils.fromWei(balance, 'ether');
                    this.setState({
                        balance: valInEther,
                    })
                }
                return responseJson;
            })
            .catch((error) => {
                console.error(error);
            });
    }

    /**
     * getEtherTransactionsFromApiAsync():  Api to fetch transactions for given address.
     * @param {String} address : address to fetch transactions.
     */
    getEtherTransactionsFromApiAsync(address) {
        fetch('http://api-ropsten.etherscan.io/api?module=account&action=txlist&address=' + address + '&startblock=0&endblock=99999999&sort=asc&apikey=WQ1D9TBEG4IWFNGZSX3YP4QKXUI1CVAUBP')
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson && responseJson.result && responseJson.result.length) {
                    this.loadTransactionData(responseJson);
                } else {
                    this.setState({
                        isLoading: false,
                    });
                }
                return responseJson;
            })
            .catch((error) => {
                console.error(error);
                this.setState({
                    isLoading: false,
                });
            });
    }

    /**
     * loadTransactionData() :  Function to create array of objects from response of Api calling for storing transactions.
     * @param {*} responseJson : Json of transaction response data from Api.
     */
    loadTransactionData(responseJson) {
        let transactionData = [];
        let publicKey = this.props.publicKey.toLowerCase();
        let type = '';
        let transactionId = '';
        for (let data of responseJson.result) {

            if (publicKey === data.from.toLowerCase()) {
                type = SENT;
                transactionId = data.to;
            } else if (publicKey === data.to.toLowerCase()) {
                type = RECEIVED;
                transactionId = data.from;
            }
            transactionStatus = (data.isError === "0") ? SUCCESS : FAILED;
            if (publicKey === data.from || publicKey === data.to) {
                const value = data.value;
                const valInEther = Web3.utils.fromWei(value, 'ether');

                transactionData.push({
                    type: type,
                    amount: valInEther,
                    transactionId: transactionId,
                    transactionStatus: transactionStatus,
                    amountUnit: 'FTM',
                    from: data.from,
                    to: data.to,
                    isError: data.isError
                });
            }
        }
        transactionData = transactionData.reverse();
        this.setState({
            transactionData,
            isLoading: false,
        });
    }

    /**
     * onRefresh() :  To reload the transaction data on page refresh.
     */
    onRefresh() {
        if (this.props.publicKey && !this.props.isLoading) {
            this.setState({
                isLoading: true,
            })
            this.getWalletBalance(this.props.publicKey);
            this.getWalletTransaction(this.props.publicKey);
        }
    }

    onRightIconPress() {
        this.props.navigation.navigate('Settings');
    }

    render() {
        console.log('public key  :', this.props.publicKey)
        const { balance, transactionData, isLoading } = this.state;
        return (
            <View style={{ flex: 1, }}>
                <StatusBar barStyle="light-content" />
                <Header text='FANTOM'
                    rightButtonIcon={settingIcon}
                    headerStyle={{ backgroundColor: '#EEBD12', }}
                    onRightIconPress={this.onRightIconPress.bind(this)}
                    fantomIcon={fantomIcon}
                    secondaryButtonIcon={secondaryIcon}
                    leftButtonIcon={leftIcon}
                />
                <NavigationTab
                    navigation={this.props.navigation}
                    balance={balance}
                    transactionData={transactionData}
                    isLoading={isLoading}
                    onRefresh={this.onRefresh.bind(this)}
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        publicKey: state.keyReducer.publicKey,
    };
},
    mapDispatchToProps = (dispatch) => {
        return {
        };
    };


export default connect(mapStateToProps, mapDispatchToProps)(TransactionEntity);