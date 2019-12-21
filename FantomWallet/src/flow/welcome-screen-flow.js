declare type TCreateMnemonicTypes = {
  setDopdownAlert: (string, string) => void,
  setReduxMnemonic: ({ mnemonic: string }) => void
};

declare type TRecoverWalletTypes = {
  generateWallet: ({ mnemonic: string }) => void,
  generateWalletUsingPrivateKey: ({
    privateKey: string,
    publicKey: string
  }) => void,
  navigation: {
    navigate: string => void,
    goBack: () => void
  }
};
