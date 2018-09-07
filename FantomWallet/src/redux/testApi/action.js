//Libraries
import _ from 'lodash';

//Helpers
import * as saga from 'services/saga';
import configHelper from 'services/config/';

//Constants
const TestApi = saga.createEntityApi('testApi');

TestApi.api.get = (params) => {
    return {
        method: 'GET',
        url: 'todos/1',
    };
};

export default TestApi;
