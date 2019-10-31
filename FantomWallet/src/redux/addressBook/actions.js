// @flow
export const types = {
  ADD_ADDRESS: 'addressBook/add_address',
  FAVOURITE_ADDRESS: 'addressBook/fav_address',
  DELETE_ADDRESS: 'addressBook/delete_address',
  ADD_UPDATE_ADDRESS: 'addressBook/add_update_address',
  EDIT_CONTACT: 'addressBook/edit_contact',
};

export const addUpdateTimestampAddress = (
  address: string,
  name: string = '',
  timeStamp: string
) => ({
  type: types.ADD_UPDATE_ADDRESS,
  payload: {
    address,
    name,
    timeStamp,
  },
});

export const addNewAddress = (address: string, name: string = '') => ({
  type: types.ADD_ADDRESS,
  payload: {
    address,
    name,
  },
});

export const toggleAddress = (address: string) => ({
  type: types.FAVOURITE_ADDRESS,
  payload: {
    address,
  },
});

export const deleteAddress = (address: string) => ({
  type: types.DELETE_ADDRESS,
  payload: { address },
});

export const updateContact = (oldWalletAddress: string, newWalletAddress: string, name: '') => ({
  type: types.EDIT_CONTACT,
  payload: {
    oldWalletAddress,
    newWalletAddress,
    name,
  },
});
