import React,{Component} from 'react';
import {View, Text} from 'react-native';

import style from './style';

class WalletEthererumScreen extends Component {
     render(){
         return(
             <View style={style.ethererumViewStyle}>
                 <Text> Ethererum </Text>
            </View>
         )
     }
}

export default WalletEthererumScreen;