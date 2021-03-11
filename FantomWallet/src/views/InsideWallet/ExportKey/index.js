import React from "react";
import {
    TouchableOpacity,
    Text,
    TextInput,
    View,
    SafeAreaView,
    StatusBar,
    Share,
    Clipboard,
    PermissionsAndroid,
    InteractionManager,
    Alert,
} from "react-native";
import Button from "~/components/general/Button";
import { Colors } from "~/theme";
import { NavigationService, routes } from "~/navigation/helpers";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles";
import { Messages } from "../../../theme";
import { connect } from "react-redux";
import { setDopdownAlert as setDopdownAlertAction } from "~/redux/notification/actions";
import crypto from "crypto";
import keythereum from "keythereum";
import RNFS from "react-native-fs";

const colorTheme = Colors.royalBlue; // Color theme can be 16 color palette themes

const ExportKey = (props: TReceiveQcCode) => {
    const { currentWallet, walletsKeys, setDopdownAlert } = props;

    let password = '';
    let path = '/sdcard/' + currentWallet.name + '.json';
    let inProgress = false;

    const options = {
        kdf: "pbkdf2",
        cipher: "aes-128-ctr",
        kdfparams: {
            c: 65536, // default: 262144
            dklen: 32,
            prf: "hmac-sha256"
        }
    };

    const setPassword = (pass) => {
        password = pass;
    }

    const setPath = (pth) => {
        path = pth;
    }

    const exportKey = async () => {
        const wallet = walletsKeys.find(w => w.publicKey === currentWallet.publicKey);
        if (!wallet) {
            Alert.alert('Private key not found');
            return;
        }

        if (password.length < 6) {
            setDopdownAlert('error', Messages.passwordShort);
            return;
        }

        try {
            await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            ]);
        } catch (err) {
            Alert.alert(Messages.storagePermission, err);
        }
        const readGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
        const writeGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
        if(!readGranted || !writeGranted) {
            Alert.alert(Messages.storagePermission);
            return;
        }

        if (await RNFS.exists(path)){
            setDopdownAlert('error', Messages.keystoreAlreadyExists);
            return;
        }

        inProgress = true;
        setDopdownAlert('custom', Messages.exporting);

        const iv = crypto.randomBytes(16); // ivBytes
        const salt = crypto.randomBytes(32); // keyBytes
        const privateKey = wallet.privateKey.slice(2).toLowerCase();

        requestAnimationFrame(() => {
            InteractionManager.runAfterInteractions(async () => {
                keythereum.dump(password, privateKey, salt, iv, options, exportFinish);
            });
        });
    };

    const exportFinish = async (keystoreObject) => {
        try {
            await RNFS.writeFile(path, JSON.stringify(keystoreObject), 'utf8');
            await RNFS.scanFile(path);
            Alert.alert(Messages.keystoreSaved, path);
            NavigationService.pop();
        } catch (e) {
            Alert.alert('Writing file failed', e);
        } finally {
            inProgress = false;
        }
    };

    return (
        <View
            style={{
                ...styles.containerStyle,
                backgroundColor: colorTheme
            }}
        >
            <StatusBar
                barStyle={
                    colorTheme === Colors.royalBlue ||
                    colorTheme === "#8959DD" ||
                    colorTheme === "#A650A6" ||
                    colorTheme === "#4649FD" ||
                    colorTheme === "#E32C2C" ||
                    colorTheme === "#5F5F7C"
                        ? "light-content"
                        : "dark-content"
                }
            />
            <SafeAreaView style={{ flex: 1 }}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => {
                        NavigationService.pop();
                    }}
                >
                    <Ionicons name="ios-arrow-back" size={25} color={Colors.white} />
                </TouchableOpacity>
                <View style={styles.actionsView}>

                            <View style={styles.mainHeadingContainer}>
                                <Text style={styles.mainHeading}>{Messages.exportKey}</Text>
                            </View>
                            <View style={styles.subHeadingContainer}>
                                <Text style={styles.subHeading}>{Messages.passwordToEncrypt}</Text>
                            </View>

                        <TextInput
                            secureTextEntry={true}
                            style={styles.enteredTextStyle}
                            onChangeText={setPassword}
                            disabled={inProgress}
                        />

                    <View style={styles.subHeadingContainer}>
                        <Text style={styles.subHeading}>{Messages.keystorePath}</Text>
                    </View>

                        <TextInput
                            style={styles.enteredTextStyle}
                            defaultValue={path}
                            onChangeText={setPath}
                            disabled={inProgress}
                        />

                        <Button
                            onPress={exportKey}
                            buttonStyle={styles.buttonStyle}
                            textStyle={styles.buttonText}
                            text={Messages.exportKey}
                            disabled={inProgress}
                        />

                </View>
            </SafeAreaView>
        </View>
    );
};
const mapStateToProps = state => ({
    currentWallet: state.wallet.currentWallet,
    walletsKeys: state.keys.wallets,
});

const mapDispatchToProps = {
    setDopdownAlert: setDopdownAlertAction
};

export default connect(mapStateToProps, mapDispatchToProps)(ExportKey);
