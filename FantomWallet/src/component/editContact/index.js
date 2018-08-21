import React, { Component } from 'react';
import { Text, View, TextInput, CheckBox, ScrollView, Platform } from 'react-native';
import Header from '../../general/header/index';
import style from './style';
import Button from '../../general/button/index';
import { StatusBar } from 'react-native';
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dialogbox from './dialogBox/index';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
class EditContact extends Component {
    onLeftIconPress = () => {
        console.log('onLeftIconPressonLeftIconPress');
        this.props.navigation.goBack()
    }
    state = {
        address: '',
        name: '',
        dialogBox: false
    }


    onConfirmClick() {
        console.log('console function')
        this.setState({
            dialogBox: true
        })
    }
    onCancelClick() {
        this.props.navigation.goBack();
    }
    closeDialogBox() {
        this.setState({
            dialogBox: false
        })
    }

    onTextFieldFocus() {
        let scrollValue = (Platform.OS === 'ios') ? 50 : 200

        setTimeout(() => {
            this.scrollView.scrollTo({ x: 0, y: scrollValue, animated: true })
        }, 10);

    }
    onTextFieldBlur() {
        let scrollValue = (Platform.OS === 'ios') ? 0 : 0

        setTimeout(() => {
            this.scrollView.scrollTo({ x: 0, y: scrollValue, animated: true })
        }, 10);
    }
    render() {
        return (
            <View style={style.mainContainerStyle}>
                <StatusBar barStyle="light-content" />
                <Header text='Edit Contact' leftButtonIcon='arrow-back' rightButtonIcon='delete' onLeftIconPress={this.onLeftIconPress} leftIconSize={30} rightIconSize={30} headerStyle={{ backgroundColor: 'rgb(233,177,18)' }} rightButtonStyle={{ backgroundColor: 'rgb(233,177,18)' }} leftButtonStyle={{ backgroundColor: 'rgb(233,177,18)' }} />

                <ScrollView ref={(scroll) => this.scrollView = scroll}
                    style={{ padding: deviceWidth * 0.05, backgroundColor: 'white', flex: 1 }}
                    scrollEnabled={false}
                >
                    <View style={{
                        padding: deviceHeight * 0.025, alignItems: 'center', height: deviceHeight * 0.1, backgroundColor: 'rgb(242,242,242)',
                        borderColor: 'rgb(200,200,200)', borderRadius: 2, borderWidth: 1, flexDirection: 'row', justifyContent: 'space-between'
                    }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                            <Icon style={{ color: '#656565', alignSelf: 'flex-end' }} name='check-square' size={30} />
                            <Text style={{ fontSize: deviceWidth * 0.05, marginLeft: 10,color:'#656565',fontWeight:'bold' }}>FANTOM</Text>
                        </View>
                        <Icon style={{ color: 'black', alignSelf: 'flex-end' }} name='caret-down' size={30} />
                    </View>


                    <View style={{ marginTop: deviceHeight * 0.08, }}>
                        <Text style={{ fontSize: deviceWidth * 0.05, fontWeight: 'bold' }}>Address</Text>
                        <View style={{ height: 44, flexDirection: 'row', marginTop: 10, borderWidth: 1, borderRadius: 2, borderColor: '#afaeaf' }}>
                            <TextInput
                                onChangeText={(address) => this.setState({ address })}
                                value={this.state.address}
                                style={{ fontSize: 16, width: deviceWidth * 0.7, height: 44, paddingLeft: 10, color: '#a7a7a7' }}
                                placeholder='Enter Wallet Address'
                                placeholderTextColor='#a7a7a7'
                                onFocus={() => this.onTextFieldFocus()}
                                onBlur={() => this.onTextFieldBlur()}
                            />
                            <View style={{ alignItems: 'center', flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                                <Icon  name='address-book' size={30} />

                                <Icon style={{ color: 'grey' }} name='qrcode' size={30} />
                            </View>
                        </View>
                    </View>

                    <View style={{ marginTop: 40 }}>
                        <Text style={{ fontSize: deviceWidth * 0.05, fontWeight: 'bold' }}>Name</Text>
                        <View style={{ height: 44, flexDirection: 'row', marginTop: 10, borderWidth: 1, borderRadius: 2, borderColor: '#afaeaf' }}>
                            <TextInput
                                onChangeText={(name) => this.setState({ name })}
                                value={this.state.name}
                                style={{ fontSize: 16, flex: 1, height: 44, paddingLeft: 10, color: '#a7a7a7' }}
                                placeholder='Enter Name'
                                placeholderTextColor='#a7a7a7'
                                onFocus={() => this.onTextFieldFocus()}
                                onBlur={() => this.onTextFieldBlur()}
                            />

                        </View>
                    </View>

                </ScrollView>

                <View style={{ flexDirection: 'row', position: 'absolute', bottom: 0 }}>
                    <Button buttonStyle={{ width: deviceWidth * 0.5, backgroundColor: 'black' }} text="Cancel" onPress={() => this.onCancelClick()}/>
                    <Button buttonStyle={{ width: deviceWidth * 0.5, backgroundColor: 'rgb(233,177,18)' }} onPress={() => this.onConfirmClick()} text="Confirm" />
                </View>
                {
                    this.state.dialogBox && <Dialogbox onConfirm={() => this.closeDialogBox()}/>
                }

            </View>
        );
    }
}

export default EditContact;




{/* <View style={{ flex: 1, flexDirection: 'row',backgroundColor:'red', borderColor: 'rgb(179,179,179)', borderRadius: 2, borderWidth: 1,
                         marginTop: deviceHeight * 0.01,  }}>
                            <TextInput
                                onChangeText={(address) => this.setState({ address })}
                                value={this.state.address}
                                style={{ flex: 7, fontSize: 16 }}
                                placeholder='Enter Wallet Address'
                            />
                            <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Icon style={{ color: 'grey' }} name='address-book' size={30} />

                                <Icon style={{ color: 'grey' }} name='qrcode' size={30} />
                            </View>
                        </View> */}