
import { Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const style = {

    transactionCardStyle: {
        marginTop: deviceHeight * 0.01,
        marginBottom: deviceHeight * 0.01,
        // marginBottom: 8,
        // height: 56,
        height: deviceHeight * 0.09,
        backgroundColor: '#fff',
        shadowColor: 'rgb(237,231,246)',
        shadowOffset: { width: 0, height: 10 },
        // shadowOpacity: 0.04
        shadowOpacity: 1

    },
    rowOneStyle: {
        flexDirection: 'row',
        margin: 4
    },
    rowOneViewStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    rowOneTextStyle: {
        fontWeight: 'bold'
    },
    rowTwoStyle: {
        flexDirection: 'row',
        margin: 4
    },
    rowTwoViewStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    successTextStyle: {
        color: 'rgb(0,206,91)',
        fontWeight: 'bold',
    },
    failureTextStyle: {
        color: 'red',
        fontWeight: 'bold',
    }
}

export default style;