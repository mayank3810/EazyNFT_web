import * as t from "../types";

const mainReducer = (
  state = {
    name: "guest",
    confetti: false,
    categories: [],
    redirect: null,
    connectModal: false,
    ethPrice: {},
    network: "",
    web3: {},
  },
  action
) => {
  switch (action.type) {
    case t.SET_NAME:
      return {
        ...state,
        name: action.payload,
      };
    case t.SET_CONFETTI:
      return {
        ...state,
        confetti: action.payload,
      };
    case t.UPDATE_CATEGORIES:
      return {
        ...state,
        categories: action.response,
      };
    case t.SET_REDIRECT:
      return {
        ...state,
        redirect: action.payload,
      };

    case t.GET_USERS:
      return {
        ...state,
        connectModal: false,
      };
    case t.CONNECT_MODAL:
      return {
        ...state,
        connectModal: action.payload,
      };
    case t.ETH_BALANCE:
      let obj = {};
      obj[action?.response?.symbol] = action?.response?.USD;
      return {
        ...state,
        ethPrice: {
          ...state.ethPrice,
          ...obj,
        },
      };
    case t.SET_NETWORK:
      return {
        ...state,
        network: action.payload,
      };
    case t.UPDATE_WEB3:
      return {
        ...state,
        web3: action.payload,
      };
    default:
      return { ...state };
  }
};

export default mainReducer;
