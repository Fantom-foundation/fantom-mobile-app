import { StyleSheet } from 'react-native';
import { Colors, fonts, FontSize } from '~/theme';
import { getHeight, getWidth } from '~/utils/pixelResolver';

export default StyleSheet.create({
    containerStyle: {
        flex: 1
    },
    safeAreaView: {
        flex: 1
    },
    backButton: {
        marginHorizontal: getWidth(24),
        marginTop: getHeight(20)
    },
    actionsView: {
        backgroundColor: Colors.white,
        flex: 1,
        borderTopLeftRadius: getHeight(22),
        borderTopRightRadius: getHeight(22),
        padding: getHeight(25),
    },
    actionItemWrapper: {
        width: getWidth(82),
        alignItems: 'center'
    },
    actionIconBackground: {
        backgroundColor: Colors.textBlack,
        height: getHeight(50),
        width: getHeight(50),
        borderRadius: getHeight(25),
        alignItems: 'center',
        justifyContent: 'center'
    },
    actionText: {
        fontFamily: fonts.WorkSansMedium,
        fontSize: FontSize.small,
        color: Colors.textBlack,
        textAlign: 'center',
        marginTop: getHeight(12)
    },
    buttonStyle: {
        borderRadius: 25,
        height: getHeight(60),
        marginTop: getHeight(25),
        backgroundColor: Colors.royalBlue
    },
    buttonText: {
        fontSize: FontSize.base,
        color: Colors.white,
        fontFamily: fonts.WorkSansBold
    },
    buttonDisabledStyle: {
        borderRadius: 25,
        height: getHeight(60),
        marginTop: getHeight(25),
        backgroundColor: Colors.silverGrey
    },
    mainHeadingContainer: {
        // marginTop: getHeight(40)
    },
    mainHeading: {
        textAlign: "center",
        fontSize: FontSize.huge - 4,
        color: Colors.royalBlue,
        fontFamily: fonts.WorkSansBold
    },
    subHeadingContainer: {
        marginTop: getHeight(12),
        alignContent: "center"
    },
    subHeading: {
        textAlign: "center",
        lineHeight: getHeight(24),
        fontSize: FontSize.base,
        color: Colors.textBlack,
        fontFamily: fonts.WorkSansMedium
    },
    textInputStyle: {
        backgroundColor: Colors.silverGrey,
        color: Colors.textBlack,
        borderRadius: 15,
    },
    exportingDesc: {
        textAlign: "center",
        marginTop: getHeight(20),
        lineHeight: getHeight(30),
        fontSize: FontSize.large,
        color: Colors.textBlack,
        fontFamily: fonts.WorkSansMedium
    },
});
