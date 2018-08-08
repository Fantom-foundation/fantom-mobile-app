import React, { PureComponent } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './style';

class LinkButton extends PureComponent {
	
	onPress() {
		if (this.props.onPress) {
			this.props.onPress();
		}
	}

	render() {
		const buttonStyle = this.props.buttonStyle || {};
		const textStyleProp = this.props.textStyle || {};
		const textStyle = {
			...styles.text,
			...textStyleProp,
		}
		const { activeOpacity, text } = this.props;
		return (
			<TouchableOpacity style={buttonStyle} activeOpacity={activeOpacity} onPress={this.onPress.bind(this)}>
				<Text style={textStyle}>{text}</Text>
			</TouchableOpacity>
		);
	}
}

LinkButton.defaultProps = {
	text: '',
	buttonStyle: {},
	textStyle: {},
	activeOpacity: 0.2
}

export default LinkButton;