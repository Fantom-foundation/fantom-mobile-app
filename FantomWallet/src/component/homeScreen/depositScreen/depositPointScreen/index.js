import React,{Component} from 'react';
import {View, Text} from 'react-native';

import style from './style';

class DepositPointScreen extends Component {
     render(){
         return(
             <View style={style.pointViewStyle}>
                 <Text> Point </Text>
            </View>
         )
     }
}

export default DepositPointScreen;