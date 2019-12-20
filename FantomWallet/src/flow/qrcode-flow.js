declare type TQrCodeGeneratorTypes = {
    qrLink: ?string,
    titleText: string,
};

declare type TQrCodeSaveTypes = {
    content: string,
    amount: string
};

declare type TQrCodeScannerTypes = {
    onRead: (any) => void,
    reactivate?: boolean,
    reactivateTimeout?: number,
    fadeIn?: boolean,
    showMarker?: boolean,
    cameraType?: 'front' | 'back',
    customMarker?: any,
    containerStyle?: any,
    cameraStyle?: any,
    permissionDialogTitle?: string,
    permissionDialogMessage?: string,
    checkAndroid6Permissions?: boolean,
};

declare type TQrCodeLogoTypes = {
    content: string,
};