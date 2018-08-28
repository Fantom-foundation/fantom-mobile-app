
import { Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const style = {
    container: {
        marginTop: 10,
        shadowColor: '#000', shadowOffset: { width: 1, height: 1 }, backgroundColor: '#fff', shadowOpacity: 0.3, shadowRadius: 3,elevation:1,
        borderWidth: 0.3, borderColor: 'rgb(209,209,209)'
    },
    subContainer: {
        paddingTop: 15, paddingBottom: 15, paddingLeft: 10, paddingRight: 10
    },
    subSubContainer: {
        flexDirection: 'row', backgroundColor: '#fff'
    },
    nameContainer: {
        fontWeight: 'bold', fontSize: deviceWidth * 0.045,fontFamily:'SFProDisplay-Regular'
    },
    mark: {
        flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 5, height: 48, borderColor: 'rgb(140,165,190)', borderWidth: 2
    },
    markText: {
        fontWeight: 'bold', fontSize: 17,
    },
    mid: {
        flexDirection: 'column', flex: 5, justifyContent: 'center', marginLeft: 12
    },
    icons: {
        flexDirection: 'row', width: 60, alignItems: 'center', justifyContent: 'space-between'
    }
}

export default style;