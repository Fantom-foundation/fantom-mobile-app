import {DEVICE_WIDTH} from '../../../common/constants';

const style = {

    containerViewStyle: {
        flex: 1,
        // backgroundColor: '#fff',
        marginBottom:20
    },
    qrGeneratorstyle: {
        marginTop: 12,
        marginBottom:24,
        padding: 16,
        backgroundColor: 'white',
    },
    qrLinkViewStyle: {
        alignItems: 'center',
        width:DEVICE_WIDTH-40,
        alignSelf:'center',
        
    },
    qrLinkTextStyle: {
        fontWeight: 'bold',
        textAlign:'center',
        fontFamily:'SegoeUI-Bold'
    },
}
export default style;