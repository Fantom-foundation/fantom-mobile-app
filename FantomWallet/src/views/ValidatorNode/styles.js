import { Dimensions } from 'react-native';
import { getHeight, getWidth } from '../../utils/pixelResolver';
import { fonts, Colors, FontSize } from '../../theme';
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const style = {
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: getWidth(20)
  },
  backIconView: {
    marginTop: getHeight(20)
  },
  headingText: {
    marginTop: getHeight(20),
    fontSize: FontSize.base,
    fontFamily: fonts.WorkSansSemiBold,
    color: Colors.textBlack
  },
  mainView: {
    backgroundColor: 'red',
    marginVertical: getHeight(10),
    backgroundColor: Colors.lightWhite,
    padding: 10,
    borderRadius: 11
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  activeIconTextView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  nameText: {
    fontFamily: fonts.WorkSansSemiBold,
    fontSize: FontSize.base,
    color: Colors.textBlack
  },
  stakeText: {
    fontSize: FontSize.small,
    fontFamily: fonts.WorkSansSemiBold,
    color: Colors.textGrey
  },
  statusText: {
    fontSize: FontSize.small,
    fontFamily: fonts.WorkSansSemiBold,
    color: Colors.silverGrey,
    marginLeft: 5
    },
    descView: {
        marginTop:getHeight(35)
    },
    descText: {
        fontSize: FontSize.mediumSmall,
        fontFamily: fonts.WorkSansBold,
        color: Colors.textBlack,
        textAlign:'center'
    },
    selectButtonView: {
        marginTop: getHeight(28),
        alignItems: 'center',
    },
    selectButton: {
        width: getWidth(152),
        height: getHeight(50),
        backgroundColor: Colors.activeGreen,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:25
    },
    selectText: {
        fontFamily: fonts.WorkSansSemiBold,
        fontSize: FontSize.mediumlarge,
        color:Colors.textBlack
    }
};
export default style;
