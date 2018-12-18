// Library
import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import moment from 'moment';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// Styling
import style from './style';

/**
 * TransacationEntity: This component is meant for rendering transaction cards.
 */
class TransacationEntity extends PureComponent {
  toFixed(num, fixed) {
    const re = new RegExp(`^-?\\d+(?:.\\d{0,${fixed || -1}})?`);
    return num.toString().match(re)[0];
  }

  renderDateContainer(date, month) {
    return (
      <View style={style.dateContainer}>
        <Text style={style.dateTextStyle}>{date}</Text>
        <Text style={[style.dateTextStyle, { fontSize: 10 }]}>{month}</Text>
      </View>
    );
  }

  renderIdContainer(Id) {
    return (
      <View style={style.idContainerStyle}>
        <Text style={style.idTextStyle} numberOfLines={1}>
          {Id}
        </Text>
      </View>
    );
  }

  renderTimeDiffcontainer(diff) {
    return (
      <View style={style.timeDiffContainer}>
        <Text style={style.timeDiffTextStyle}>{diff}</Text>
      </View>
    );
  }

  renderAmtcontainer(iconColor, ftmBalance, transactionAmountUnit) {
    return (
      <View style={[style.amountContainerStyle, { backgroundColor: iconColor }]}>
        <Text style={style.amountValueTextStyle}>
          {ftmBalance} {''}
        </Text>
        <Text style={style.amountUnitTextStyle}>{transactionAmountUnit}</Text>
      </View>
    );
  }

  render() {
    const { transaction, publicKey } = this.props;

    let iconName = 'arrow-back';
    let iconColor = 'rgb(255,0,0)';

    let iconStyle = {
      transform: [{ rotateX: '0deg' }, { rotateY: '180deg' }, { rotateZ: '45deg' }],
    };
    let Id = '';
    let date = '';
    let month = '';
    let diff = '';
    let ftmBalance = '';
    let transactionAmountUnit = '';
    if (transaction) {
      if (
        transaction.from &&
        transaction.from !== '' &&
        transaction.from !== null &&
        transaction.from !== undefined &&
        transaction.from !== publicKey
      ) {
        iconColor = 'rgb(94,179,18)';
        iconStyle = {
          transform: [{ rotateX: '0deg' }, { rotateY: '0deg' }, { rotateZ: '-45deg' }],
        };
        Id = transaction.from;
      } else if (
        transaction.to &&
        transaction.to !== '' &&
        transaction.to !== null &&
        transaction.to !== undefined
      ) {
        Id = transaction.to;
      }
    }

    if (
      transaction &&
      transaction.date &&
      transaction.date !== '' &&
      transaction.date !== null &&
      transaction.date !== undefined
    ) {
      date = moment(transaction.date, 'YYYY-MMM-DD hh:mm:ss a').format('DD');
      month = moment(transaction.date, 'YYYY-MMM-DD hh:mm:ss a').format('MMM');
      diff = moment(transaction.date, 'YYYY-MMM-DD hh:mm:ss a').fromNow();
      if (date === 'Invalid date' || month === 'Invalid date') {
        date = '';
        month = '';
        diff = '';
      }
    }

    if (
      transaction &&
      transaction.amount &&
      transaction.amount !== '' &&
      transaction.amount !== null &&
      transaction.amount !== undefined
    ) {
      ftmBalance = this.toFixed(transaction.amount, 4);
    }
    if (
      transaction &&
      transaction.amountUnit &&
      transaction.amountUnit !== '' &&
      transaction.amountUnit !== null &&
      transaction.amountUnit !== undefined
    ) {
      transactionAmountUnit = transaction.amountUnit;
    }

    return (
      <View style={style.mainContainerStyle}>
        {this.renderDateContainer(date, month)}
        <View style={style.iconContainerStyle}>
          <MaterialIcons name={iconName} size={18} color={iconColor} style={iconStyle} />
        </View>
        {this.renderIdContainer(Id)}
        {this.renderTimeDiffcontainer(diff)}
        {this.renderAmtcontainer(iconColor, ftmBalance, transactionAmountUnit)}
      </View>
    );
  }
}

export default TransacationEntity;
