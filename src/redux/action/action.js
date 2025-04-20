import {
  GET_ALL_SPORTS,
  GET_CRICKET_LOADING,
  GET_LOADING,
  GET_SOCCER_LOADING,
  GET_TENNIS_LOADING,
  SET_BET,
} from "../constant";
export const GetAllSportsAction = () => {
  console.log("get all sports action call");
  return {
    type: GET_ALL_SPORTS,
  };
};
export const setLoading = (loading) => ({
  type: GET_LOADING,
  payload: loading,
});

export const setCricket = (cricket) => {
  console.log("setCricket action");
  return {
    type: GET_CRICKET_LOADING,
    payload: cricket,
  };
};
export const setSoccer = (soccer) => {
  console.log("Soccer action");
  return {
    type: GET_SOCCER_LOADING,
    payload: soccer,
  };
};
export const setTennis = (tennis) => {
  console.log("tennis action");
  return {
    type: GET_TENNIS_LOADING,
    payload: tennis,
  };
};


export const setBet = (BET) => {
  console.log("setCricket action");
  return {
    type: SET_BET,
    payload: BET,
  };
};
