import LocalizedStrings from "react-native-localization";
import { English, Chinese, korean } from "./languages";

export const Messages = new LocalizedStrings({
  "en-US": English,
  en: English,
  "zh-Hans": Chinese,
  ko: korean
});

export const setMylanguage = language => {
  Messages.setLanguage(language);
};
