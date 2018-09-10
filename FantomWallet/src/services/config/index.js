//Libraries
import _ from 'lodash';

//Helpers
import config from './apiConfig';

export default function() {
    let configUrls = {};
    // const environment = `${process.env.NODE_ENV}`;

    // if (_.has(config, environment)) {
    //     configUrls = config[environment]
    // } else {
    //     configUrls = config['development']
    // }

    // configUrls = config['ethereum'];
    configUrls = config['testnet']    

    return configUrls
}
