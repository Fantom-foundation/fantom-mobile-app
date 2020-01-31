import { combineReducers } from "redux";

import keys from "./keys/reducer";
import addressBook from "./addressBook/reducer";
import wallet from "./wallet/reducer";
import notification from "./notification/reducer";
import stakeReducer from "./staking/reducer";
import selectedLanguage from "./language/reducer";

const appReducers = combineReducers({
  keys,
  addressBook,
  wallet,
  notification,
  stakes: stakeReducer,
  selectedLanguage: selectedLanguage
});

export default appReducers;
