import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { LinkButton } from 'general/';
import Header from '../../general/header/index';
import style from './style';
import Button from '../../general/button/index';
class CaptionOutput extends Component {
    state = {
        characters: ['course', 'invest', 'nuclear', 'odor', 'dance', 'cousin', 'purity', 'quarter', 'record', 'stove', 'park', 'photo']
    }
    render() {
        return (
            <View style={style.mainContainerStyle}>
                <Header text='Caption Output' leftButtonIcon='arrow-left' />
                <View style={style.mid}>
                    <View style={style.generateText}>
                        <Text>Generate 12 characters for wallet creation.Be sure to keep the following words.</Text>
                    </View>
                    <View style={style.text}>
                        {this.state.characters.map((val, i) => {
                            return (<Text style={style.mapText} >{i + 1}.{val}</Text>);
                        })}
                    </View>
                </View>
                <View style={style.footerStyle}>
                    <Button text='Next' />
                </View>
            </View>
        );
    }
}

export default CaptionOutput;