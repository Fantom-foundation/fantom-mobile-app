export const ADD_ADDRESS = 'add_address';
export const FAVOURITE_ADDRESS = 'fav_address';
export const TIMESTAMP_ADDRESS = 'time_address';
export const DELETE_ADDRESS = 'delete_address';
export const ADD_UPDATE_ADDRESS = 'add_update_address';
export const EDIT_CONTACT = 'edit_contact';

export const addUpdateTimestampAddress = (walletAddress, name, timeStamp) => ({
  type: ADD_UPDATE_ADDRESS,
  address: walletAddress,
  name: name || '',
  timeStamp,
});
