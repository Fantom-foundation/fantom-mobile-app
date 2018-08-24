import { WHITE_COLOR, DEVICE_HEIGHT, DEVICE_WIDTH, iPhoneX_Height } from '../../common/constants/';

const isPhoneX = (DEVICE_HEIGHT >= iPhoneX_Height)

const style = {
    mainContainerStyle: {
        flex: 1,
        backgroundColor: WHITE_COLOR,
        justifyContent: 'flex-end',
    },
    tabInfoStyle: {
        flex: 1,
        backgroundColor: 'blue'
    },
    navigationTabStyle: {
        backgroundColor: WHITE_COLOR,
        width: DEVICE_WIDTH,
        flexDirection: 'row',
        height: isPhoneX ? 78 : 64,
        alignItems: 'center',
        shadowOffset: { width: 0, height: -5 },
        shadowColor: 'black',
        shadowOpacity: 0.1
    }
}
export default style;