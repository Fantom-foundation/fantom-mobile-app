import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, ImageBackground, StatusBar } from 'react-native';
import styles from './style';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Colors } from '../../theme/colors';
class SuccessScreen extends Component {
    constructor(props){
        super(props);
    }
    render() {
        const { text,onPress} = this.props;
        return (
          <TouchableOpacity onPress={()=>onPress()} style={styles.imageBackground}>
            <StatusBar barStyle="light-content" />
            <View style={styles.mainContainer}>
              <Text style={styles.walletText}>{text}</Text>
              <FontAwesome
                name="check"
                size={120}
                color={Colors.lightGreen}
                style={styles.checkIcon}
              />
            </View>
          </TouchableOpacity>
        );
    }
}

export default SuccessScreen;
