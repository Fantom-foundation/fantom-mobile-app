import React, { PureComponent } from 'react';
import { Text, View, Image, TextInput } from 'react-native';

import styles from './styles';

// Method of generation taken from: https://medium.com/bitcraft/so-you-want-to-build-an-ethereum-hd-wallet-cb2b7d7e4998;

class TextField extends PureComponent {
  render() {
    let url = '';
    let rightSideText = '';
    if (this.props.isimagePresent && this.props.imgUrl && this.props.imgUrl !== '') {
      url = this.props.imgUrl;
    }
    if (this.props.isTextPresent && this.props.rightTextValue && this.props.rightTextValue !== '') {
      rightSideText = this.props.rightTextValue;
    }

    return (
      <View style={styles.mainTextFieldView}>
        <TextInput
          style={[styles.inputFieldStyle, this.props.textinputStyle]}
          placeholder={this.props.placeHolderText}
          value={this.props.text}
          placeholderTextColor="#000"
          editable={false}
          selectTextOnFocus={false}
          autoCapitalize="none"
          underlineColorAndroid="transparent"
          autoCorrect={false}
        />
        {this.props.isimagePresent && (
          <Image
            source={url}
            style={[styles.additionalViewStyles, this.props.imgStyle]}
            resizeMode="cover"
          />
        )}
        {this.props.isTextPresent && (
          <View style={styles.additionalViewStyles}>
            <Text numberOfLines={1} style={styles.rightSideTextStyle}>
              {rightSideText}
            </Text>
          </View>
        )}
      </View>
    );
  }
}

export default TextField;
