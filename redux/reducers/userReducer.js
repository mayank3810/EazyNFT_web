import * as t from "../types";

const INITIAL_STATE = {
  Users: [],
  user: {},
  loading: false,
  updateUser: {},
  allUsersHash: {},
  userMediaDetails: {},
  wishlistDetails: {},
  isAdmin: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case t.GET_USERS:
      let isAdmin = (action?.response?.roles || []).includes("admin");
      return {
        ...state,
        user: action.response,
        loading: false,
        isAdmin,
      };
    case t.UPDATE_USER:
      isAdmin = (action?.response?.roles || []).includes("admin");
      return {
        ...state,
        user: { ...state.user, ...action.response },
        isAdmin,
      };
    case t.LOGOUT_USER:
      return {
        ...state,
        Users: [],
        user: {},
        loading: false,
        updateUser: {},
        userMediaDetails: {},
        wishlistDetails: {},
        isAdmin: false,
      };
    case t.UPDATE_USER_REDUX:
      if (action.response?.key)
        return {
          ...state,
          [action.response?.key]: action.response?.value,
        };
      else return state;

    case t.GET_ALL_USERS:
      let hash = state.allUsersHash;
      for (let i = 0; i < action?.response?.length; i++)
        hash[action?.response[i]?.walletAddress] = action?.response[i];
      return {
        ...state,
        allUsersHash: hash,
      };
    case t.GET_USER_MEDIA_DETAILS:
      let array = action?.response?.result?.likes || [];
      let array2 = action?.response?.result?.wishlist || [];
      hash = {};
      for (let i = 0; i < array.length; i++) hash[array[i]] = true;
      let hash2 = {};
      for (let i = 0; i < array2.length; i++) hash2[array2[i]] = true;
      return {
        ...state,
        userMediaDetails: hash,
        wishlistDetails: hash2,
      };
    default:
      return state;
  }
};

export default userReducer;
