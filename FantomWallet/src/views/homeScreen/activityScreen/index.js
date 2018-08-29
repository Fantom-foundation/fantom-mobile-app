import React, { Component } from 'react';
import { View, Text } from 'react-native';

import style from './style';

/**
* To Display ActivityTab related tasks
*/
export default class ActivityScreen extends Component {
   render() {
       return (
           <View style={style.activityViewStyle}>
               <Text style={style.textViewStyle}>Activity</Text>
           </View>
       );
   }
}