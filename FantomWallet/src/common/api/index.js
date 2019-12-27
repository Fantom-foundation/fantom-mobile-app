import axios from "axios";

import { API_URL_FANTOM } from "react-native-dotenv";

const getApiPathName = apiName => {
  return `${API_URL_FANTOM}${getAPIPath(apiName)}`;
};

const getAPIPath = apiName => {
  switch (apiName) {
    case "delegatorByAddress":
      return "api/v1/delegator/address";
    case "delegatorByStakerId":
      return "api/v1/delegator/staker";
    case "validatorList":
      return "api/v1/staker";
  }
};

export const getDataWithQueryString = async (apiName, queryString) =>
  axios.get(`${getApiPathName(apiName)}/${queryString}`);
export const putDataWithQueryString = (apiName, queryString, data) => {
  return axios.put(`${getApiPathName(apiName)}/${queryString}`, data);
};

export const postData = (apiName, data, queryParam = "") => {
  if (!!queryParam) {
    return axios.post(`${getApiPathName(apiName)}/${queryParam}`, data);
  } else {
    return axios.post(`${getApiPathName(apiName)}`, data);
  }
};

export const deleteData = (apiName, data) => {
  return axios.delete(`${getApiPathName(apiName)}/${data}`);
};
