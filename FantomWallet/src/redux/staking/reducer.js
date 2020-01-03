// @flow
import { types } from "./actions";

export type KeyReducerT = {
  publicKey: string,
  amount: number,
  claimedRewards: number
};

type KeyStateT = Array<KeyReducerT>;

type Action = {
  type: string,
  payload: KeyReducerT
};

const initialState = {
  data: [],
  validators: []
};

const StakeReducer = (state: KeyStateT = initialState, action: Action) => {
  switch (action.type) {
    case `${types.DELEGATE_BY_ADDRESSES}_SUCCESS`: {
      let oldStakes = [...state.data];
      const { publicKey, response } = action.payload;
      const {
        amount,
        claimedRewards,
        deactivatedTime,
        pendingRewards,
        createdTime
      } = response;
      const index = oldStakes.findIndex(item => item.publicKey === publicKey);
      const data = {
        amount,
        claimedRewards: claimedRewards || 0,
        pendingRewards: pendingRewards || 0,
        isDeligate: true,
        deactivatedTime,
        createdTime: Number(createdTime)
      };
      if (index > -1) {
        const updatedStake = {
          ...oldStakes[index],
          ...data
        };
        oldStakes.splice(index, 1, updatedStake);
      } else {
        const stake = {
          publicKey,
          ...data
        };
        oldStakes.push(stake);
      }
      return {
        ...state,
        data: oldStakes
      };
    }
    case `${types.DELEGATE_BY_ADDRESSES}_FAILURE`: {
      console.log("types.DELEGATE_BY_ADDRESSES_FAILURE", action.payload);
      let oldStakes = [...state.data];
      const { publicKey } = action.payload;
      const data = {
        publicKey,
        isDeligate: false,
        amount: 0,
        claimedRewards: 0,
        pendingRewards: 0,
        createdTime: new Date().getTime()
      };
      const index = oldStakes.findIndex(item => item.publicKey === publicKey);
      if (index === -1) oldStakes.push(data);
      return {
        ...state,
        data: oldStakes
      };
    }
    case `${types.VALIDATORS_LIST}_SUCCESS`: {
      console.log("types.VALIDATORS_LIST", action.payload);
      const { stakers } = action.payload.response.data.data;

      const validators = stakers.map(staker => {
        const {
          id,
          address,
          totalStake,
          deactivatedEpoch,
          delegatedMe,
          deactivatedTime,
          createdTime
        } = staker;
        return {
          id,
          address,
          totalStake,
          deactivatedEpoch,
          delegatedMe,
          deactivatedTime,
          createdTime
        };
      });
      return {
        ...state,
        validators
      };
    }
    case `${types.VALIDATORS_LIST}_FAILURE`: {
      return state;
    }
    default:
      return state;
  }
};

export default StakeReducer;
