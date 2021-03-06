const math = require("../../__mocks__/mathjs");
const Web3 = require("web3");
const axios = require("axios");
const { store } = require("../redux/store");
const { GAS_PRICE } = require("../common/constants");
const moment = require("moment");
math.config({
  number: "bignumber"
});

export function scientificToDecimal(num) {
  const sign = Math.sign(num);
  // if the number is in scientific notation remove it
  // eslint-disable-next-line no-useless-escape
  if (/\d+\.?\d*e[\+\-]*\d+/i.test(num)) {
    // eslint-disable-line
    const zero = "0";
    const parts = String(num)
      .toLowerCase()
      .split("e"); // split into coeff and exponent
    const e = parts.pop(); // store the exponential part
    let l = Math.abs(e); // get the number of zeros
    const direction = e / l; // use to determine the zeroes on the left or right
    const coeffArray = parts[0].split(".");
    if (direction === -1) {
      coeffArray[0] = Math.abs(coeffArray[0]);
      num = `${zero}.${new Array(l).join(zero)}${coeffArray.join("")}`; // eslint-disable-line
    } else {
      const dec = coeffArray[1];
      if (dec) l -= dec.length;
      num = coeffArray.join("") + new Array(l + 1).join(zero); // eslint-disable-line
    }
  }

  if (sign < 0) {
    num = -num; // eslint-disable-line
  }

  return num;
}

export function estimationMaxFantomBalance(fantomWei, gasPrice) {
  let wei = fantomWei;

  const isEther = fantomWei < 1;
  if (isEther) {
    wei *= 1e18;
  }

  const maxFantomBalanceWei = math.subtract(math.bignumber(wei), gasPrice);
  return Web3.utils.fromWei(maxFantomBalanceWei.toString(), "ether");

  // due to mock bignumber it is difficult to evaluate the behavior
}

export const toFixed = (num, fixed) => {
  if (!num) return "";
  const re = new RegExp(`^-?\\d+(?:.\\d{0,${fixed || -1}})?`);
  return num.toString().match(re)[0];
};

export const fantomToDollar = value => {
  const { fantomDollarRate } = store.getState().wallet;
  if (fantomDollarRate) {
    return (
      fantomDollarRate * estimationMaxFantomBalance(value, GAS_PRICE)
    ).toFixed(10);
  }
  return value;
};

export const convertFTMValue = value => {
  if (value) {
    return Number(estimationMaxFantomBalance(value, GAS_PRICE)).toFixed(10);
  }
  return 0;
};
export const getConversionRate = value => {
  const { fantomDollarRate } = store.getState().wallet;
  if (fantomDollarRate) {
    return fantomDollarRate;
  }
  return 1;
};

export const formatActivities = (activityDate: any) => {
  const t = new Date(activityDate);
  const dateString = moment(t).format("MMM D, hh:mm A");
  return dateString;
};

export const balanceToDollar = (value, decimal) => {
  const { fantomDollarRate } = store.getState().wallet;
  if (fantomDollarRate) {
    return (fantomDollarRate * value).toFixed(decimal);
  }
  return value;
};
