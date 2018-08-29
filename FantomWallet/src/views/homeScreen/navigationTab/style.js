import { WHITE_COLOR, DEVICE_HEIGHT, DEVICE_WIDTH, iPhoneX_Height } from '../../../common/constants/';

const isPhoneX = (DEVICE_HEIGHT >= iPhoneX_Height)

const style = {
    mainContainerStyle: {
        flex: 1,
        // backgroundColor: 'red',
        
    },
    tabInfoStyle: {
        flex: 1,
        marginBottom: isPhoneX ? 78 : 64,
    },
    navigationTabStyle: {
        position: 'absolute',
        width: DEVICE_WIDTH,
        flexDirection: 'row',
        height: isPhoneX ? 78 : 64,
        bottom: 0,
        shadowOffset: { width: 0, height: -5 },
        shadowColor: 'black',
        shadowOpacity: 0.1,
        elevation:12
    }
}
export default style;