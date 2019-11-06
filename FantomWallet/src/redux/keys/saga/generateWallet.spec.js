/* eslint-disable import/first */
import { expectSaga } from 'redux-saga-test-plan';

jest.mock('react-native-randombytes');

import { generateWallet } from './generateWallet';
import { setKeys } from '../actions';

it('just works!', () => {
  const payload = {
    mnemonic: 'fury image nephew candy witness spoil flip unfold square frown find stamp',
    cb: () => {},
  };
  return expectSaga(generateWallet, { payload })
    .put(
      setKeys({
        masterKey: '257699fd48316ecabd5f9f4c30ba27a4faf91f7bebc8a43ddde86bce40c7234a',
        privateKey: '0xbb815881ec74a1bb6d80ff334be095035ebf714eb4c5e99a16c9480ae51d57d5',
        publicKey: '0xe983ebB369DCDf71F1eEEca2231b16D7db9c8105',
      })
    )
    .run();
});
