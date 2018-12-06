import React, { PureComponent } from 'react';
import { View, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import { DEVICE_HEIGHT } from '../../../../../../common/constants';
import style from './style';
import walletWhiteIcon from '../../../../../../images/WalletOutline.png';
/**
 * EmptyTransactionEntity: This component is meant to display informational message,
 *  when wallet does not contains any transaction.
 */
class EmptyTransactionEntity extends PureComponent {
  render() {
    const { title, message } = this.props;
    return (
      <View style={[style.mainViewStyle, { alignSelf: 'center', marginTop: DEVICE_HEIGHT * 0.1 }]}>
        <View style={style.outerIconContainer}>
          <View style={style.innerIconContainer}>
            <Image
              source={walletWhiteIcon}
              resizeMode="contain"
              style={{ height: DEVICE_HEIGHT * 0.07, width: DEVICE_HEIGHT * 0.07 }}
            />
          </View>
        </View>
        <Text style={style.headingInfoStyle}>{title} </Text>
        <Text style={style.textInfoStyle}>{message} </Text>
      </View>
    );
  }
}
EmptyTransactionEntity.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
};
export default EmptyTransactionEntity;
