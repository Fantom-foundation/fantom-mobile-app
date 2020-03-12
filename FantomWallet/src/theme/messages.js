import LocalizedStrings from "react-native-localization";
import { English, Chinese, korean, Vietnamese } from "./languages";

export const Messages = new LocalizedStrings({
  "en-US": English,
  en: English,
  "zh-Hans": Chinese,
  ko: korean,
  vi: Vietnamese
});

export const setMylanguage = language => {
  Messages.setLanguage(language);
};
