// @flow
import { types } from "./actions";

const initialState = {
  selectedLanguage: ""
};

const LanguageReducer = (state: KeyStateT = initialState, action: Action) => {
  switch (action.type) {
    case types.SET_LANGUAGE:
      return {
        selectedLanguage: action.payload
      };

    default:
      return state;
  }
};

export default LanguageReducer;
