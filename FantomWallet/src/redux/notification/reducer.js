// @flow
import { types } from "./actions";

type Notification = {
  type: string,
  text: string | false,
  cancel: boolean | false,
  style?: { [string]: string }
};

type actionType = {
  type: string,
  payload: Notification
};

const initialState = {
  type: "",
  text: false,
  style: {},
  cancel: false
};

const notificationReducer = (
  state: Notification = initialState,
  action: actionType
) => {
  switch (action.type) {
    case types.SET_DROPDOWN_ALERT:
      return {
        ...state,
        type: action.payload.type,
        text: action.payload.text,
        cancel: action.payload.cancel ? action.payload.cancel : false,
        style: action.payload.style
      };
    default:
      return state;
  }
};

export default notificationReducer;
