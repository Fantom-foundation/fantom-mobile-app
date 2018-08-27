import * as Actions from './action'

const KeyReducer = (state = {masterKey: '', publicKey: ''}, action) => {
    switch (action.type) {
        case Actions.MASTER_KEY:
            return Object.assign({}, state, {
              masterKey: action.key
            });
        case Actions.PUBLIC_KEY:
            return Object.assign({}, state, {
              publicKey: action.key
            });
        case Actions.MASTER_PUBLIC_KEY:
            return Object.assign({}, state, {
              publicKey: action.publicKey,
              masterKey: action.masterKey
            });
        default:
            return state;
    }
}

export default KeyReducer;