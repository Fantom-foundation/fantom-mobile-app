import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import { LinkButton } from 'general/';
import Styles from './styles';
import TestApiEntity from 'src/redux/testApi/action';

class CreateWallet extends Component {

	testApi() {
		this.props.api();
	}

	render() {
		return (
			<View style={Styles.mainContainer}>
				<View style={Styles.headerContainer}>
					<Image source={require('../../images/fantom-logo.png')} style={Styles.headerImage}
						resizeMode='contain' />
				</View>
				<View style={Styles.subHeaderContainer}>
					<Text style={Styles.subHeaderText1}>Beyond Blockchain</Text>
					<Text style={Styles.subHeaderText2}>The Future of Decentralized Ecosystem</Text>
				</View>
				<TouchableOpacity style={Styles.createWallet} onPress={() => { this.testApi(); this.props.navigation.navigate('Terms') }}>
					<Text style={Styles.createWalletText}>Create Wallet</Text>
				</TouchableOpacity>
				<LinkButton text="hello" />
				<View style={Styles.footer}>
					<Text style={Styles.footerText1}>Terms of Service</Text>
					<Text style={Styles.footerText2}>Privacy Policy</Text>
				</View>
			</View>
		);
	}
}


const mapStateToProps = (state) => {
	return {
		isRequesting: state.testApiReducer.isRequesting,
		testApiReducer: state.testApiReducer,
	};
},
	mapDispatchToProps = (dispatch) => {
		return {
			getProfile: (params) => {
				dispatch({ type: 'GET_ITEM', params });
			},
			api: () => {
				dispatch(TestApiEntity.ui.get());
				TestApiEntity.after.get = (paramsobj) => {

				};
				TestApiEntity.failure.get = (paramsObj) => {

				}
			}
		};
	};
export default connect(mapStateToProps, mapDispatchToProps)(CreateWallet);
