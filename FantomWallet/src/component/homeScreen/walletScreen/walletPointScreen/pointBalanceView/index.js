import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { AsyncStorage } from "react-native";
import style from './style';

class PointBalanceView extends Component {
    constructor(props) {
        super(props);
        this.state = {
          balanceTextThree: 0
        }
        this.getPublicKey();
        // this.state.balanceTextThree = this.getEtherBalanceFromApiAsync(this.getPublicKey());

    }
    getEtherBalanceFromApiAsync(address) {
       fetch('https://api-ropsten.etherscan.io/api?module=account&action=balance&address='+address+'&tag=latest&apikey=WQ1D9TBEG4IWFNGZSX3YP4QKXUI1CVAUBP')
        .then((response) => response.json())
        .then((responseJson) => {
            console.log('responseJson');
        console.log(responseJson);
            if(responseJson && responseJson.status === "1" && responseJson.result) {
                this.setState({
                balanceTextThree: responseJson.result
            })
            }
            
          return responseJson;
        })
        .catch((error) => {
          console.error(error);
        });
    }
    getPublicKey() {
      AsyncStorage.getItem('publicKey').then((val) => {
        console.log('getPublicKey');
        console.log(val);
        this.getEtherBalanceFromApiAsync(val);
      });
    }
    render() {
        const { pointTransactionArr } = this.props;

        let balanceTextOne = '8,230,000';
        let balanceTextTwo = 'FTP';
        let balanceTextFour = 'FTM';

        if (pointTransactionArr.length === 0) {
            balanceTextOne = '00.00000000';
        }

        return (
            <View style={style.pointBalanceView}>
                <View style={style.balanceViewText}>
                    <Text style={style.balanceViewTextOne}> {balanceTextOne} </Text>
                    <Text> {balanceTextTwo} </Text>
                </View>
                <View style={style.balanceTextRowStyle}>
                    <Text style={style.balanceTextStyle}> {this.state.balanceTextThree} </Text>
                    <Text style={style.balanceTextUnitStyle}> {balanceTextFour} </Text>
                </View>
            </View>
        )
    }
}

export default PointBalanceView;
