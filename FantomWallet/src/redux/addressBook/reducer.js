// @flow
import { types } from './actions';

type Contact = {
  address: string,
  name: string,
  isFavourite: boolean,
  timeStamp: string,
};

type actionType = {
  type: string,
  payload: {
    address: string,
    name: string,
    isFavourite: boolean,
    timeStamp: string,
    oldWalletAddress: string,
    newWalletAddress: string,
  },
};

type State = {
  [key: string]: Contact,
};

const initialState = {};

function updateContact(state, action) {
  const oldAddresses = state;
  const addressKey = action.oldWalletAddress;
  const oldAddress = oldAddresses[addressKey];
  const newAddress = action.newWalletAddress;
  if (oldAddress) {
    const updateAddressObject = {
      ...oldAddress,
      address: action.newWalletAddress,
      name: action.name,
    };
    delete oldAddresses[addressKey];

    const newAddresses = {
      ...oldAddresses,
      [newAddress]: updateAddressObject,
    };
    return { ...state, ...newAddresses };
  }
  return state;
}
const AddressReducer = (state: State = initialState, action: actionType) => {
  switch (action.type) {
    case types.ADD_ADDRESS:
      return {
        ...state,
        [action.payload.address]: {
          address: action.payload.address,
          name: action.payload.name,
          timeStamp: action.payload.timeStamp || 0,
          isFavourite: false,
        },
      };
    case types.FAVOURITE_ADDRESS:
      return {
        ...Object.keys(state).reduce((obj, key): any => {
          /* eslint-disable no-param-reassign */
          obj[key] = state[key];
          if (obj[key].address === action.payload.address)
            obj[key].isFavourite = !obj[key].isFavourite;
          return obj;
        }, {}),
      };
    case types.DELETE_ADDRESS:
      return {
        ...Object.keys(state)
          .filter(address => address !== action.payload.address)
          .reduce((obj, key): any => {
            obj[key] = state[key];
            return obj;
          }, {}),
      };
    case types.ADD_UPDATE_ADDRESS:
      return {
        ...state,
        [action.payload.address]: {
          address: action.payload.address,
          name: action.payload.name,
          isFavourite: false,
          ...state[action.payload.address],
          timeStamp: action.payload.timeStamp || 0,
        },
      };
    case types.EDIT_CONTACT:
      return updateContact(state, action.payload);
    default:
      return state;
  }
};

export default AddressReducer;
