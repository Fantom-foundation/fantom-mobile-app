import _ from 'lodash';
import model from './model';


const formatTestApi = {
    format(data) {
        const dataFormatted = {
            ...model,
            ...data,
        };
        return dataFormatted;
    },
};

export default formatTestApi;
