import axios from "axios";

const getAPIPathName = apiName => {
  switch (apiName) {
    case "UserLoads":
      return "/api/Load/GetUserLoads";
  }
};

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

export const getDataWithQueryString = (
  apiName,
  queryString,
  cancelToken = null,
  responseType = null
) => {
  if (isMock) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ data: getAPIPath(apiName), status: 200 });
      }, 600);
    });
  }
  if (apiName === "DownloadDocument") {
    return axios
      .get(`${getAPIPath(apiName)}/${queryString}`, {
        responseType: responseType
      })
      .then(response => response);
  }
  if (apiName !== "GetFilterLocations") {
    return axios
      .get(`${getAPIPath(apiName)}?${queryString}`)
      .then(response => response);
  }

  return axios
    .get(`${getAPIPath(apiName)}?${queryString}`, {
      cancelToken: cancelToken
    })
    .then(response => response);
};

export const putDataWithQueryString = (apiName, queryString, data) => {
  if (isMock) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ data: getAPIPath(apiName), status: 200 });
      }, 600);
    });
  }
  return axios
    .put(`${getAPIPath(apiName)}/${queryString}`, data)
    .then(response => response);
};

export const postData = (apiName, data, queryParam = "") => {
  if (isMock) {
    return new Promise(resolve => {
      setTimeout(() => {
        const updatedData = { ...data };
        if (apiName === "AddUserLoad") {
          updatedData.loadId = new Date().getTime();
          updatedData.age = 1;
          updatedData.miles = 500;
          updatedData.dollarPerMile = 1.5;
          updatedData.matches = 3;

          updatedData.bookings = 0;
        }
        resolve({ message: "Success", status: 200, data: updatedData });
      }, 600);
    });
  } else if (queryParam) {
    return axios
      .post(`${getAPIPath(apiName)}/${queryParam}`, data)
      .then(response => response);
  } else {
    return axios
      .post(`${getAPIPath(apiName)}`, data)
      .then(response => response);
  }
};

export const deleteData = (apiName, data) => {
  return axios
    .delete(`${getAPIPath(apiName)}/${data}`)
    .then(response => response);
};
