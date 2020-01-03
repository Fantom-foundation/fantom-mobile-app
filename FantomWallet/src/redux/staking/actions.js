// @flow
export const types = {
  DELEGATE_BY_ADDRESS: "staking/DELEGATE_BY_ADDRESS",
  DELEGATE_BY_ADDRESSES: "staking/DELEGATE_BY_ADDRESSES",
  DELEGATE_BY_STAKER_ID: "staking/DELEGATE_BY_STAKER_ID",
  VALIDATORS_LIST: "staking/VALIDATORS_LIST",
  DELEGATE_AMOUNT: "staking/DELEGATE_AMOUNT",
  DELEGATE_UNSTAKE: "staking/DELEGATE_UNSTAKE",
  WITHDRAW_DELEGATE: "staking/WITHDRAW_DELEGATE"
};

type TDelegateByStakerId = {
  stakerId: string
};

type TDelegateByAddress = {
  publicKey: string
};

export const delegateByAddress = ({ publicKey }: TDelegateByAddress) => ({
  type: types.DELEGATE_BY_ADDRESS,
  payload: { publicKey }
});

export const delegateByAddressSuccess = ({
  publicKey
}: TDelegateByAddress) => ({
  type: `${types.DELEGATE_BY_ADDRESS}_SUCCESS`,
  payload: { publicKey }
});

export const delegateByAddressFailure = () => ({
  type: `${types.DELEGATE_BY_ADDRESS}_FAILURE`
});

export const delegateByAddresses = () => ({
  type: types.DELEGATE_BY_ADDRESSES
});

export const delegateByAddressesSuccess = ({
  publicKey,
  response
}: TDelegateByAddress) => ({
  type: `${types.DELEGATE_BY_ADDRESSES}_SUCCESS`,
  payload: { publicKey, response }
});

export const delegateByAddressesFailure = ({
  publicKey
}: TDelegateByAddress) => ({
  type: `${types.DELEGATE_BY_ADDRESSES}_FAILURE`,
  payload: { publicKey }
});

export const getValidatorsList = () => ({
  type: types.VALIDATORS_LIST
});

export const getValidatorsListSuccess = response => ({
  type: `${types.VALIDATORS_LIST}_SUCCESS`,
  payload: { response }
});

export const getValidatorsListFailure = () => ({
  type: `${types.VALIDATORS_LIST}_FAILURE`
});

export const delegateByStakerId = ({ stakerId }: TDelegateByStakerId) => ({
  type: types.DELEGATE_BY_STAKER_ID,
  payload: { stakerId }
});

export const delegateAmount = ({
  amount,
  publicKey,
  validatorId,
  cbSuccess
}) => ({
  type: types.DELEGATE_AMOUNT,
  payload: { amount, publicKey, validatorId, cbSuccess }
});

export const delegateUnstake = ({ publicKey, cbSuccess }) => ({
  type: types.DELEGATE_UNSTAKE,
  payload: { publicKey, cbSuccess }
});

export const delegateWithdraw = ({ publicKey, cbSuccess }) => ({
  type: types.WITHDRAW_DELEGATE,
  payload: { publicKey, cbSuccess }
});
