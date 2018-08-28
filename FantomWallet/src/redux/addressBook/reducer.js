import * as Actions from './action'

function addNewAddress(state, action) {
  let oldAddresses = state.addresses;
  const addressKey = action.address;
  const addressObj = {
    address: addressKey,
    name: action.name || '',
    isFavourite: false,
  };
  if (action.timeStamp) {
    addressObj.timeStamp = timeStamp;
  }
  const newAddresses = Object.assign({}, oldAddresses, {
    [addressKey]: addressObj
  });
  return Object.assign({}, state, {
    addresses: newAddresses,
  });;
}

function toggleFavouriteAddress(state, action) {
  let oldAddresses = state.addresses;
  const addressKey = action.address;
  const oldAddress = oldAddresses[addressKey];
  if (oldAddress) {
    oldAddress.isFavourite = !oldAddress.isFavourite;
    const newAddresses = Object.assign({}, oldAddresses, {
      [addressKey]: oldAddress
    });
    return Object.assign({}, state, {
      addresses: newAddresses,
    });
  }
  return state;
}

function updateAddressTimeStamp(state, action) {
  let oldAddresses = state.addresses;
  const addressKey = action.address;
  const oldAddress = oldAddresses[addressKey];
  if (oldAddress && action.timeStamp) {
    oldAddress.timeStamp = action.timeStamp;
    const newAddresses = Object.assign({}, oldAddresses, {
      [addressKey]: oldAddress
    });
    return Object.assign({}, state, {
      addresses: newAddresses,
    });
  }
  return state;
}

function deleteAddress(state, action) {
  let oldAddresses = state.addresses;
  const addressKey = action.address;
  const oldAddress = oldAddresses[addressKey];
  if (oldAddress) {
    delete oldAddresses[addressKey];
    const newAddresses = {
      ...oldAddresses,
    }
    return Object.assign({}, state, {
      addresses: newAddresses,
    });
  }
  return state;
}


const AddressReducer = (state = { addresses: {} }, action) => {
    switch (action.type) {
        case Actions.ADD_ADDRESS:
          return addNewAddress(state, action)
        case Actions.FAVOURITE_ADDRESS:
          return toggleFavouriteAddress(state, action)
        case Actions.TIMESTAMP_ADDRESS:
          return updateAddressTimeStamp(state, action)
        case Actions.DELETE_ADDRESS:
          return deleteAddress(state, action)
        default:
            return state;
    }
}

export default AddressReducer;