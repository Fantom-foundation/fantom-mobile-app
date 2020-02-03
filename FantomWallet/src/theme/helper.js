import { Messages } from "./messages";
import {
  CrossIcon,
  ShareIcon,
  ReviewIcon,
  QuestionIcon,
  TelegramIcon,
  TwitterIcon,
  WalletIcon,
  MoonIcon,
  DollarIcon,
  NotificationIcon,
  RightArrowIcon,
  PlusIcon,
  ShieldIcon,
  RegionLaguage
} from "../images";

export const helper = () => {
  const settingData = [
    {
      text: Messages.addWallet,
      rightArrowIcon: RightArrowIcon,
      source: PlusIcon,
      notificationsToggleButton: false,
      darkToggleButton: false,
      to: "AddWallet"
    },
    {
      text: Messages.manageWallet,
      rightArrowIcon: RightArrowIcon,
      source: WalletIcon,
      notificationsToggleButton: false,
      darkToggleButton: false,
      to: "ManageWallet"
    },

    // {
    //   text: 'Dark Mode',
    //   rightArrowIcon: '',
    //   source: MoonIcon,
    //   notificationsToggleButton: false,
    //   darkToggleButton: true
    // },
    // {
    //   text: 'Dark Mode',
    //   rightArrowIcon: '',
    //   source: MoonIcon,
    //   notificationsToggleButton: false,
    //   darkToggleButton: true
    // },
    // {
    //   text: 'Privacy and security',
    //   rightArrowIcon: RightArrowIcon,
    //   source: ShieldIcon,
    //   notificationsToggleButton: false,
    //   darkToggleButton: false,
    //   to: 'PrivacyAndSecurity'
    // },
    // {
    //   text: 'Push notifications',
    //   rightArrowIcon: '',
    //   source: NotificationIcon,
    //   notificationsToggleButton: true,
    //   darkToggleButton: false
    // },
    // {
    //   text: 'Currency',
    //   rightArrowIcon: RightArrowIcon,
    //   source: DollarIcon,
    //   notificationsToggleButton: false,
    //   darkToggleButton: false,
    //   to: 'Currency'
    // },

    {
      text: Messages.shareWithFreinds,
      rightArrowIcon: RightArrowIcon,
      source: ShareIcon,
      notificationsToggleButton: false,
      darkToggleButton: false,
      isShareApp: true
    },
    {
      text: Messages.about,
      rightArrowIcon: RightArrowIcon,
      source: QuestionIcon,
      notificationsToggleButton: false,
      darkToggleButton: false,
      isOpenUrl: true
    },
    {
      text: Messages.language,
      rightArrowIcon: RightArrowIcon,
      source: RegionLaguage,
      notificationsToggleButton: false,
      darkToggleButton: false,
      isShareApp: false,
      isLanguageSelect: true,
      to: "LanguageSelect"
    },
    {
      text: Messages.review,
      rightArrowIcon: RightArrowIcon,
      source: ReviewIcon,
      notificationsToggleButton: false,
      darkToggleButton: false,
      isShareApp: true
    }
  ];
  return settingData;
};
