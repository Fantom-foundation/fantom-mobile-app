import { Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const style = {
    withdrawViewStyle: {
        flex: 1,
        padding: 15,
        backgroundColor: '#fff'
    },
    sendContainer: {
        alignItems: 'center'
    },
    sendText: {
        fontSize: 24, fontWeight: 'bold'
    },
    addressContainer: {
        marginTop: deviceHeight * 0.02
    },
    addressText: {
        fontWeight: 'bold'
    },
    addressTextInputContainer: {
        flexDirection: 'row', width: deviceWidth - 32, height: deviceHeight * 0.06, marginTop: deviceHeight * 0.005,
        paddingLeft: 10, paddingRight: 10, borderWidth: 1, borderColor: 'rgb(93,93,93)', alignItems: 'center'
    },
    addressTextInput: {
        flex: 1, fontSize: 16, color: '#a7a7a7'
    },
    priceContainer: {
        marginTop: deviceHeight * 0.02
    },
    priceTextContainer: {
        flexDirection: 'row', justifyContent: 'space-between'
    },
    price: {
        fontWeight: 'bold'
    },
    currentPrice: {
        fontWeight: 'bold'
    },
    priceTextInputContainer: {
        flexDirection: 'row', width: deviceWidth - 32, marginTop: deviceHeight * 0.005, height: deviceHeight * 0.06, paddingLeft: 10, paddingRight: 10,
        borderWidth: 1, borderColor: 'rgb(93,93,93)', alignItems: 'center'
    },
    priceTextInput: {
        flex: 1, fontSize: 16, color: '#a7a7a7'
    },
    sc: {
        width: deviceWidth * 0.1,
    },
    availableContainer: {
        flexDirection: 'row', justifyContent: 'flex-end', marginTop: deviceHeight * 0.01, alignItems: 'center'
    },
    allContainer: {
        borderWidth: 1, borderColor: 'rgb(143,143,143)', borderRadius: 3, paddingHorizontal: 8, backgroundColor: 'rgb(222,222,222)'
    },
    feesContainer: {
        marginTop: deviceHeight * 0.04
    },
    feesText: {
        fontWeight: 'bold'
    },
    feesTextInputContainer: {
        marginTop: 5, flexDirection: 'row', fontSize: 16, height: deviceHeight * 0.06, paddingLeft: 10, color: '#a7a7a7', borderWidth: 1,
        borderColor: 'rgb(93,93,93)'
    },
    feesTextInput: {
        flex: 1
    },
    ftmTextContainer: {
        width: 120, justifyContent: 'center'
    },
    ftmText: {
        fontSize: 12
    },
    speedContainer: {
        flexDirection: 'row', justifyContent: 'space-between', marginTop: deviceHeight * 0.01
    },
    slowBar: {
        backgroundColor: 'rgb(165,165,165)', width: deviceWidth * 0.27, height: deviceHeight * 0.01
    },
    slowText: {
        textAlign: 'center'
    },
    normalBar: {
        backgroundColor: 'rgb(79,79,79)', width: deviceWidth * 0.27, height: deviceHeight * 0.01
    },
    normalText: {
        textAlign: 'center'
    },
    fastBar: {
        backgroundColor: 'rgb(0,0,0)', width: deviceWidth * 0.27, height: deviceHeight * 0.01
    },
    fastText: {
        textAlign: 'center'
    },
    memoContainer: {
        marginTop: deviceHeight * 0.02
    },
    memoText: {
        fontWeight: 'bold'
    },
    memoTextInputContainer: {
        marginTop: 5
    },
    memoTextInput: {
        fontSize: 16, height: deviceHeight * 0.06, paddingLeft: 10, color: '#a7a7a7', borderWidth: 1, borderColor: 'rgb(93,93,93)'
    },
    bottomSendContainer: {
        // alignItems: 'center', width: deviceWidth * 0.7, backgroundColor: 'rgb(233,177,18)', alignSelf: 'center',
        //   position: 'absolute', bottom: deviceHeight * 0.02, padding: deviceHeight * 0.015
        marginTop: 35,
        marginLeft: 35,
        marginRight: 35,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: '#C0C0C0',
        shadowOpacity: 1,
        elevation: 2,
        marginBottom: 10,
    },
    bottomSendText: {
        fontSize: deviceHeight * 0.03
    }

}
export default style;