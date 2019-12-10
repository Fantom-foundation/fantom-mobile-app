import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, ImageBackground, StatusBar } from 'react-native';
import styles from './style';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
class SuccessScreen extends Component {
    constructor(props){
        super(props);
    }
    render() {
        const { text} = this.props;
        return (<View
            style={styles.imageBackground}
        >
            <StatusBar barStyle="light-content" />
            <View style={styles.mainContainer}>
                <Text style={styles.walletText}>{text}</Text>
                <FontAwesome name="check" size={100} color="green" style={styles.checkIcon}/>
            </View>
        </View >
        );
    }
}

export default SuccessScreen;
