import * as t from "../types";
import API from "../../services/API";
import { CONNECTOR_ID } from "../../utils/storagekeys";

export const LoginUser = (walletAddress, signature, wallet) => {
  localStorage.setItem("signature", signature);
  localStorage.setItem("walletAddress", walletAddress);
  if (wallet) localStorage.setItem(CONNECTOR_ID, wallet);

  return async (dispatch) => {
    try {
      let response = await API.signin(walletAddress, signature);
      dispatch({
        type: t.GET_USERS,
        response: { ...response?.data, signature },
      });
    } catch (error) {
      if (
        error?.response?.status === 400 &&
        error?.response?.data?.data?.newUser
      ) {
        localStorage.removeItem("walletAddress");
        localStorage.removeItem("signature");
        dispatch({
          type: t.GET_USERS,
          response: { newUser: true },
        });
      }
      console.log(error);
      return error;
    }
  };
};

export const LogoutUser = () => {
  localStorage.removeItem("walletAddress");
  localStorage.removeItem("signature");
  window.localStorage.removeItem(CONNECTOR_ID);
  return (dispatch) => {
    dispatch({
      type: t.LOGOUT_USER,
      response: {},
    });
  };
};

export const getAllUsers = (request) => {
  return async (dispatch) => {
    try {
      let response = await API.getAllUsers(request);
      dispatch({
        type: t.GET_ALL_USERS,
        response: response?.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const UpdateUser = (payload) => {
  return async (dispatch) => {
    try {
      let response = await API.updateUser(payload);
      dispatch({
        type: t.UPDATE_USER,
        response: response?.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const sendEmailOtp = (payload) => {
  return async (dispatch) => {
    try {
      let response = await API.sendEmailOtp(payload);
      dispatch({
        type: t.API_RES,
        response: response?.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const VerifyUser = (payload) => {
  return async (dispatch) => {
    try {
      let response = await API.verifyUser(payload);
      dispatch({
        type: t.UPDATE_USER,
        response: response?.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const AddUser = (params) => {
  return async (dispatch) => {
    try {
      let response = await API.signUp(params);
      dispatch({
        type: t.ADD_USER,
        response: response?.data,
      });
    } catch (error) {
      console.log(error);
      return error;
      // reject(error);
    }
  };
};

export const getAllUserMediaDetails = (params) => {
  return async (dispatch) => {
    try {
      let response = await API.getAllUserMediaDetails(params);
      dispatch({
        type: t.GET_USER_MEDIA_DETAILS,
        response: response?.data,
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  };
};

export const getFollowers = (params) => {
  return async (dispatch) => {
    try {
      let response = await API.getFollowers(params);
      dispatch({
        type: t.GET_FOLLOWERS,
        response: response?.data,
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  };
};

export const updateUserRedux = (params) => {
  return async (dispatch) => {
    dispatch({
      type: t.UPDATE_USER_REDUX,
      response: params,
    });
  };
};
