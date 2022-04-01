import * as t from "../types";
import API from "../../services/API";

export const createNFT = (payload) => {
  return (dispatch) => {
    try {
      let result = API.createNFT(payload);
      dispatch({
        type: t.CREATE_NFT,
        response: result?.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getCollection = (payload) => {
  return (dispatch) => {
    API.getCollectibles(payload)
      .then((res) => {
        dispatch({
          type: "GET_COLLECTIBLES",
          response: res.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const getAllCollectiables = (payload) => {
  return (dispatch) => {
    try {
      API.getAllCollectiables(payload)
        .then((result) => {
          dispatch({
            type: t.GET_ALL_COLLECTIBLES,
            response: result?.data,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getAllCollectionCategories = () => {
  return (dispatch) => {
    try {
      API.getCollectionCategories()
        .then((result) => {
          dispatch({
            type: t.GET_ALL_COLLECTION_CATEGORIES,
            response: result?.data,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getUserWishlist = (payload) => {
  return (dispatch) => {
    try {
      API.getUserWishlist(payload)
        .then((result) => {
          dispatch({
            type: t.GET_ALL_USER_WISHLIST,
            response: result?.data,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
};
