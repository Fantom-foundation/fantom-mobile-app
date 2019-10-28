import React, { PureComponent } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import style from './style';

/**
 * DialogBox: This component displays a dialog, when user clicks on confirm button after contact editing.
 */
class DialogBox extends PureComponent {
  render() {
    return (
      <View style={style.container}>
        <View style={style.subContainer}>
          <View style={style.addressTextContainer}>
            <Text>This address already exists.</Text>
            <Text>Please re- enter your wallet address.</Text>
          </View>
          <View style={style.confirmContainer}>
            <TouchableOpacity onPress={this.props.onConfirm}>
              <Text style={style.confirmText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default DialogBox;
