
import { Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const style = {
    mainContainerStyle: {
        flex: 1,
        backgroundColor: 'white'
    },
    backArrow: {
        marginTop: deviceHeight * 0.04
    },
    header: {
        marginTop: deviceHeight * 0.05,
        alignSelf: 'center'
    },
    headerText: {
        fontSize: deviceWidth * 0.06,
        fontWeight: 'bold'
    },
    mid: {
        // padding: deviceHeight * 0.03,
        marginTop: 50,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: '#fff',
        shadowColor: 'rgba(0,0,0,0.1)',
        shadowRadius: 8,
        shadowOffset: { width: -1, height: 1 },
        shadowOpacity: 1,
        paddingLeft: 20,
    },
    textFieldStyle: {

        paddingRight: 20,
        marginTop: 10,
        height: 50,
    },
    footerStyle: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
    },
    buttonViewStyle: {
        flex: 1,
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0
    },
    additionalInfoTextStyle: {
        fontSize: 14,
        marginTop: 30
    },
    //styling of TextField begins from here
    mainTextFieldView: {
        flex: 1,
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: 'rgb(101,101,101)',
        borderColor: 'gray',
        justifyContent: 'center'
    },
    inputFieldStyle: {
        flex: 1,
        height: 40,
        paddingLeft: 10,
        fontSize: 18,
        fontWeight: '700',
    },
    additionalViewStyles: {
        position: 'absolute',
        height: 40,
        right: 10,
        justifyContent: 'center'
    },
    rightSideTextStyle: {
        fontSize: 18,
        color: 'rgb(101,101,101)'
    },
}

export default style;