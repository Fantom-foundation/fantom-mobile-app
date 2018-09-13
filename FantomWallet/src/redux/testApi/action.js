// Libraries
// import _ from 'lodash';

// Helpers
import * as saga from '../../services/saga';

// Constants
const TestApi = saga.createEntityApi('testApi');

// TestApi.api.get = params => ({
//   method: 'GET',
//   url: 'todos/1',
// });

export default TestApi;
