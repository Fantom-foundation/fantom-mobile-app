declare type TButtonTypes = {
  activeOpacity?: number,
  text: string,
  onPress: () => void,
  buttonStyle?: { [key: string]: string },
  textStyle?: { [key: string]: string }
};

declare type TInputBoxTypes = {
  phraseNumber: number | string,
  text: string,
  onChangeText: string => void
};

declare type TKeypadTypes = {
  keyPad?: [],
  handleInputNumber: () => {},
  buttonStyle?: { [key: string]: string },
  textStyle?: { [key: string]: string },
  keyPadStyle?: { [key: string]: string }
};

declare type TLoaderTypes = {
  loaderStyle?: number,
  loaderColor?: string,
  isLoading?: boolean
};

declare type TProgressBarTypes = {
  completed: string,
  remaining: string
};

declare type THeaderTypes = {
  text?: string,
  headerStyle?: ViewStyleProp,
  textStyle?: TextStyleProp,
  activeOpacity?: 0 | 1,
  fantomIcon?: string,
  isShowSecondaryButtonIcon?: string,
  onSecondaryIconPress?: () => void,
  secondaryButtonIcon?: string,
  isShowLeftButtonIcon?: string,
  onLeftIconPress?: () => void,
  leftButtonStyle?: ViewStyleProp,
  leftButtonIcon?: string,
  leftIconSize?: number,
  leftIconColor?: string,
  onRightIconPress?: () => void,
  isShowRightButtonIcon?: string,
  isRightBtnImage?: boolean,
  rightButtonIcon?: string,
  rightButtonStyle?: ViewStyleProp,
  rightIconSize?: number,
  rightIconColor?: string,
  rightImageStyling?: ImageStyleProp
};

declare type TSuccessScreenTypes = {
    text: string,
    onPress: ()=>void
  };