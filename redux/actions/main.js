import * as t from "../types";
import API from "../../services/API";

export const setInfo = (name) => (dispatch) => {
  dispatch({
    type: t.SET_NAME,
    payload: name,
  });
};

export const setConfetti = (payload) => (dispatch) => {
  dispatch({
    type: t.SET_CONFETTI,
    payload: payload,
  });
};

export const setRedirect = (payload) => (dispatch) => {
  return dispatch({
    type: t.SET_REDIRECT,
    payload: payload,
  });
};

export const getCategories = () => {
  return async (dispatch) => {
    try {
      let response = await API.getCategories();
      dispatch({
        type: t.UPDATE_CATEGORIES,
        response: response?.data,
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  };
};

export const openConnectModal = (payload) => (dispatch) => {
  return dispatch({
    type: t.CONNECT_MODAL,
    payload: payload,
  });
};

export const fetchETHBalance = (symbol) => {
  return async (dispatch) => {
    try {
      let response = await API.getBalance(symbol, "USD");
      response["symbol"] = symbol;
      dispatch({
        type: t.ETH_BALANCE,
        response: response,
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  };
};

export const setNetwork = (network) => (dispatch) => {
  dispatch({
    type: t.SET_NETWORK,
    payload: network,
  });
};

export const updateWeb3 = (details) => (dispatch) => {
  dispatch({
    type: t.UPDATE_WEB3,
    payload: details,
  });
};
