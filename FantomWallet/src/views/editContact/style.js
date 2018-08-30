
import { Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const style = {
    mainContainerStyle: {
        flex: 1,
        backgroundColor: 'white'
    },
    add: { flex: 1, alignItems: 'center', height: 40, justifyContent: 'center', backgroundColor: 'rgb(232,232,232)' },
    favorites: { flex: 1, alignItems: 'center', height: 40, justifyContent: 'center', backgroundColor: 'rgb(232,232,232)' },
    scrollView: {
        padding: deviceWidth * 0.05, backgroundColor: 'white', flex: 1
    },
    header: {
        padding: deviceHeight * 0.025, alignItems: 'center', height: deviceHeight * 0.1, backgroundColor: 'rgb(242,242,242)',
        borderColor: 'rgb(200,200,200)', borderRadius: 2, borderWidth: 1, flexDirection: 'row', justifyContent: 'space-between'
    },
    fantomContainer: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
    },
    fantomIcon: {
        color: '#656565', alignSelf: 'flex-end'
    },
    fantomText: {
        fontSize: deviceWidth * 0.05, marginLeft: 10, color: '#656565', fontWeight: 'bold',fontFamily:'SFProDisplay-Regular'
    },
    downArrowIcon: {
        color: 'black', alignSelf: 'flex-end'
    },
    addressContainer: {
        marginTop: deviceHeight * 0.08,
    },
    addressText: {
        fontSize: deviceWidth * 0.05, fontWeight: 'bold',fontFamily:'SFProDisplay-Regular'
    },
    addressInputContainer: {
        height: 44,
        flexDirection: 'row',
        marginTop: 10,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#afaeaf',
        shadowColor: 'rgb(174,175,174)',
        shadowOffset:{width:1,height:1},
        shadowOpacity:0.3,
        elevation:1,
    },
    addressTextInput: {
        fontSize: 16,
        flex: 1,
        height: 44,
        paddingLeft: 10,
        color: '#a7a7a7'
    },
    iconContainer: {
        alignItems: 'center', width: 32, marginRight: 8,flexDirection: 'row', justifyContent: 'flex-end'
    },
    qrCodeIcon: {
        color: 'grey'
    },
    nameContainer: {
        marginTop: 40
    },
    nameText: {
        fontSize: deviceWidth * 0.05, fontWeight: 'bold',fontFamily:'SFProDisplay-Regular'
    },
    nameTextInputContainer: {
        height: 44, flexDirection: 'row', marginTop: 10, borderWidth: 1, borderRadius: 2, borderColor: '#afaeaf',shadowColor: 'rgb(174,175,174)',
        shadowOffset:{width:1,height:1},
        shadowOpacity:0.3,elevation:1,
    },
    nameTextInput: {
        fontSize: 16, flex: 1, height: 44, paddingLeft: 10, color: '#a7a7a7'
    },
    footer: {
        flexDirection: 'row', position: 'absolute', bottom: 0
    },
    cancelButton: {
        width: deviceWidth * 0.5, backgroundColor: 'black'
    },
    confirmButton: {
        width: deviceWidth * 0.5, backgroundColor: 'rgb(233,177,18)'
    }

}

export default style;