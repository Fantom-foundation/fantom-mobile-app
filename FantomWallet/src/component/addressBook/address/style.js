
import { Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const style = {
    mark: { flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 5, height: 48, borderColor: 'rgb(140,165,190)', borderWidth: 2},
    mid:{ flexDirection: 'column', flex: 3, justifyContent: 'center', paddingLeft: 10 },
    icons: { flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'space-around' }
}

export default style;