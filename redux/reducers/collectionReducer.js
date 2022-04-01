import * as t from "../types";

const collectionReducer = (
  state = {
    collectibles: {},
    allCollectibles: [],
    collectionCategories: [],
    userWishlist: [],
  },
  action
) => {
  switch (action.type) {
    case t.GET_COLLECTIBLES:
      return {
        ...state,
        collectibles: action.response,
      };

    case t.GET_ALL_COLLECTIBLES:
      return {
        ...state,
        allCollectibles: action.response,
      };
    case t.GET_ALL_COLLECTION_CATEGORIES:
      return {
        ...state,
        collectionCategories: action.response,
      };

    case t.GET_ALL_USER_WISHLIST:
      return {
        ...state,
        userWishlist: action.response?.result || [],
      };

    default:
      return { ...state };
  }
};

export default collectionReducer;
