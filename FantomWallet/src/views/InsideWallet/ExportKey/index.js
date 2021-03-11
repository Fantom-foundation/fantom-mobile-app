import React from "react";
import {
    TouchableOpacity,
    Text,
    TextInput,
    View,
    SafeAreaView,
    StatusBar,
    ActivityIndicator,
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

class ExportKey extends React.Component {

    constructor(props) {
        super(props);
        this.state = { inProgress: false };
        this.password = '';
        this.path = '/sdcard/' + props.currentWallet.name + '.json';
    }

    setPassword(password) {
        this.password = password;
    }

    setPath(path) {
        this.path = path;
    }

    async exportKey() {
        const wallet = this.props.walletsKeys.find(w => w.publicKey === this.props.currentWallet.publicKey);

        if (!wallet) {
            Alert.alert('Private key not found');
            return;
        }

        if (this.password.length < 6) {
            this.props.setDopdownAlert('error', Messages.passwordShort);
            return;
        }

        try {
            await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            ]);
        } catch (e) {
            Alert.alert(Messages.storagePermission, e.toString());
        }
        const readGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
        const writeGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
        if(!readGranted || !writeGranted) {
            Alert.alert(Messages.storagePermission);
            return;
        }

        if (await RNFS.exists(this.path)){
            this.props.setDopdownAlert('error', Messages.keystoreAlreadyExists);
            return;
        }

        this.setState({ inProgress: true });

        const _this = this;
        InteractionManager.runAfterInteractions(async () => {
            const iv = crypto.randomBytes(16); // ivBytes
            const salt = crypto.randomBytes(32); // keyBytes
            const privateKey = wallet.privateKey.slice(2).toLowerCase();

            const options = {
                kdf: "pbkdf2",
                cipher: "aes-128-ctr",
                kdfparams: {
                    c: 65536, // default: 262144
                    dklen: 32,
                    prf: "hmac-sha256"
                }
            };

            keythereum.dump(_this.password, privateKey, salt, iv, options, _this.exportFinish.bind(_this));
        });
    };

    async exportFinish(keystoreObject) {
        try {
            await RNFS.writeFile(this.path, JSON.stringify(keystoreObject), 'utf8');
            await RNFS.scanFile(this.path);
            Alert.alert(Messages.keystoreSaved, this.path);
            NavigationService.pop();
        } catch (e) {
            Alert.alert('Writing file failed', e.toString());
        } finally {
            this.setState({ inProgress: false });
        }
    };

    render() {
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
            <SafeAreaView style={{flex: 1}}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => {
                        NavigationService.pop();
                    }}
                >
                    <Ionicons name="ios-arrow-back" size={25} color={Colors.white}/>
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
                        style={styles.textInputStyle}
                        onChangeText={this.setPassword.bind(this)}
                        disabled={this.state.inProgress}
                    />

                    <View style={styles.subHeadingContainer}>
                        <Text style={styles.subHeading}>{Messages.keystorePath}</Text>
                    </View>

                    <TextInput
                        style={styles.textInputStyle}
                        defaultValue={this.path}
                        onChangeText={this.setPath.bind(this)}
                        disabled={this.state.inProgress}
                    />

                    <Button
                        onPress={this.exportKey.bind(this)}
                        buttonStyle={this.state.inProgress ? styles.buttonDisabledStyle : styles.buttonStyle}
                        textStyle={styles.buttonText}
                        text={Messages.exportKey}
                        disabled={this.state.inProgress}
                    />

                    <View style={{ display: this.state.inProgress ? undefined : 'none' }}>
                        <Text style={styles.exportingDesc}>{Messages.exportingDesc}</Text>
                        <ActivityIndicator size="large"/>
                    </View>

                </View>
            </SafeAreaView>
        </View>
      );
    }
};
const mapStateToProps = state => ({
    currentWallet: state.wallet.currentWallet,
    walletsKeys: state.keys.wallets,
});

const mapDispatchToProps = {
    setDopdownAlert: setDopdownAlertAction
};

export default connect(mapStateToProps, mapDispatchToProps)(ExportKey);
