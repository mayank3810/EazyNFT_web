import axios from "axios";
const api = process.env.NEXT_PUBLIC_API_URL;

class API {
  /**
   * A helper function used to handle request
   * @param {string} method
   * @param {string} api
   * @param {object} params
   * @param {object} config
   */
  static handleRequest(method = "post", url, params = {}, config = {}) {
    return new Promise((resolve, reject) => {
      try {
        if (method != "get") {
          if (localStorage.getItem("walletAddress"))
            params["walletAddress"] = localStorage.getItem("walletAddress");
          if (localStorage.getItem("signature"))
            params["signature"] = localStorage.getItem("signature");
        }
      } catch (error) {
        console.log(error);
      }
      axios[method](url, params, config)
        .then((response) => resolve(response.data))
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * Signin User
   * @param {string} walletAddress
   * @param {string} signature
   */
  static signin(walletAddress, signature) {
    const url = api + "/user/login";
    const params = {
      walletAddress,
      signature,
    };
    return new Promise((resolve, reject) => {
      axios
        .post(url, params)
        .then((response) => resolve(response?.data))
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * Signup User
   * @param {object} params
   */
  static signUp(params) {
    const url = api + "/user/signup";
    return this.handleRequest("post", url, params);
  }

  /**
   * Update user details
   * @param {string} walletAddress
   */
  static getUserProfile(walletAddress) {
    const url = api + "/user/getBuyerProfile/" + walletAddress;
    return this.handleRequest("get", url);
  }

  /**
   * Update user details
   * @param {object} params
   */
  static updateUser(params) {
    const url = api + "/user/editUserProfile";
    return this.handleRequest("put", url, params);
  }

  /**
   * Verify User Email sendEmailOtp
   * @param {object} params
   */
  static sendEmailOtp(params) {
    const url = api + "/user/resendEmailVerification";
    return this.handleRequest("put", url, params);
  }

  /**
   * Verify User Email verifyEmailOtp
   * @param {object} params
   */
  static verifyUser(params) {
    const url = api + "/user/verifiedEmail?emailToken=" + params;
    return this.handleRequest("get", url, params);
  }

  static checkEmailVerified(params) {
    const url = api + "/user/checkEmailVerified/" + params;
    return this.handleRequest("get", url, params);
  }

  /**
   * Create MetaDATA for nft
   * @param {object} details
   */
  static async createMeta(params) {
    let url = api + "/collectible/createMeta";
    const result = await this.handleRequest("post", url, params);
    return result?.data;
  }

  /**
   * Create New NFT
   * @param {object} details
   */
  static async createNFT(params) {
    let url = api + "/collectible/create";
    const result = await this.handleRequest("post", url, params);
    return result?.data;
  }

  /**
   * Update New NFT
   * @param {object} details
   */
  static async saveNFT(params) {
    let url = api + "/collectible/editCollectible";
    const result = await this.handleRequest("put", url, params);
    return result?.data;
  }

  /**
   * Update New NFT
   * @param {number} tokenId
   */
  static async updateNFTDetails(tokenId) {
    let url = api + `/collectible/updateNFTDetails/${tokenId}`;
    const result = await this.handleRequest("get", url);
    return result?.data;
  }

  /**
   * Buy NFT
   * @param {object} details
   */
  static async buyNFT(params) {
    let url = api + "/collectible/buyCollectible";
    const result = await this.handleRequest("post", url, params);
    return result?.data;
  }

  /**
   * GET Collectibles by token id
   * @param {object} details
   */
  static async getCollectible(tokenId) {
    let url = api + "/collectible/" + tokenId;
    const result = await this.handleRequest("get", url);
    return result?.data;
  }

  /**
   * Get getCollectibles
   * @param {object} details
   */
  static getCollectibles(walletAddress) {
    let url = api + "/collectible/getCollectibles/" + walletAddress;
    return this.handleRequest("get", url);
  }

  /**
   * Get getCollectiblesCreatedBy
   * @param {object} details
   */
  static getCollectiblesCreatedBy(walletAddress) {
    let url = api + "/collectible/getCollectiblesCreatedBy/" + walletAddress;
    return this.handleRequest("get", url);
  }

  /**
   * Get GET Categories
   * @param {void}
   */
  static getCategories() {
    let url = api + "/general/getCategories";
    return this.handleRequest("get", url);
  }

  /**
   * Get GET Collection Categories
   * @param {void}
   */
  static getCollectionCategories() {
    let url = api + "/general/getCollectionCategories";
    return this.handleRequest("get", url);
  }

  /**
   * Get get All Collectiables
   * @param {object} limit, etc.
   */
  static getAllCollectiables(data = {}) {
    const filter = data.filter || {};
    // if (!filter?.isDrop && !filter?.isProfile)
    //   filter["dropDetails.liveAt"] = { $not: { $gt: Date.now() } };
    let url = api + "/collectible/getAllCollectibles";
    return this.handleRequest("post", url, data);
  }

  /**
   * Get get All Collectiables
   * @param {object} limit, etc.
   */
  static getHeaderNFT(data = {}) {
    let url = api + "/collectible/getHeaderNFT";
    return this.handleRequest("post", url, data);
  }

  /**
   * Get get All Collectiables
   * @param {void}
   */
  static getAllUsers({ filter = {}, sort, page = 0, perPag = 12 }) {
    let url = api + "/user/getUserListApi";
    let params = {
      filter,
      sort,
      page,
      perPag,
    };
    return this.handleRequest("post", url, params);
  }

  /**
   * Get get All Collectiables
   * @param {string} collectionName
   */
  static verifyCollectionName(name) {
    let url = api + "/collection/verifyName";
    return this.handleRequest("post", url, { name: name });
  }

  /**
   * Create new collection
   * @param {string} collection details
   */
  static createCollection(params) {
    let url = api + "/collection/create";
    return this.handleRequest("post", url, params);
  }

  /**
   * Update collection collection
   * @param {string} collection details
   */
  static updateCollection(params) {
    let url = api + "/collection/saveCollection";
    return this.handleRequest("post", url, params);
  }

  /**
   * Get user collections
   * @param {string} walletAddress
   */
  static getCollections(params) {
    let url = api + "/collection/getCollections";
    return this.handleRequest("post", url, params);
  }

  /**
   * Get user collections
   * @param {string} collection name
   */
  static getCollection(params) {
    let url = api + `/collection/getCollection/${params?.name}`;
    return this.handleRequest("get", url);
  }

  /**
   * Get user collections through wwalletadress
   * @param {string} collection name
   */
  static getUserCollections(params) {
    let url = api + `/collection/userCollections`;
    return this.handleRequest("post", url, params);
  }

  /**
   * Get filter details
   * @param {void}
   */
  static getFilterInfo(props) {
    let url =
      api + `/collectible/getFilterInfo` + (props?.isDrop ? "?id=drop" : "");
    return this.handleRequest("get", url);
  }

  /**
   * Get NFT Count details
   * @param {void}
   */
  static getNFTCountDetails() {
    let url = api + `/collectible/getNFTCountDetails`;
    return this.handleRequest("get", url);
  }

  /**
   * Get all user media details
   * @param {void}
   */
  static getAllUserMediaDetails(params) {
    let url = api + `/collectible/getMeta`;
    return this.handleRequest("post", url, params);
  }

  /**
   * Get all user media details
   * @param {void}
   */
  static updateUserMediaDetails(params) {
    let url = api + `/collectible/updateMetadata`;
    return this.handleRequest("post", url, params);
  }

  /**
   * Post update user followers
   * @param {object}
   */
  static updateUserFollowers(params) {
    let url = api + `/user/updateFollowing`;
    return this.handleRequest("post", url, params);
  }

  /**
   * To update user bid
   * @param {void}
   */
  static placeBid(params) {
    let url = api + `/collectible/placeBid`;
    return this.handleRequest("post", url, params);
  }

  /**
   * To settle auction
   * @param {void}
   */
  static settleAuction(params) {
    let url = api + `/collectible/settle`;
    return this.handleRequest("post", url, params);
  }

  /**
   * To User Wishlist
   * @param {void}
   */
  static getUserWishlist(params) {
    let url = api + `/collectible/getWishlist`;
    return this.handleRequest("post", url, params);
  }

  /**
   * Admin User Wishlist
   * @param {void}
   */
  static adminGetUserList(params) {
    let url = api + `/admin/getAllUser`;
    return this.handleRequest("post", url, params);
  }

  /**
   * Admin Get User
   * @param {String} walletAddress
   */
  static adminGetUser(walletAddress) {
    let url = api + `/admin/viewUser/${walletAddress}`;
    return this.handleRequest("get", url);
  }

  /**
   * Admin Update User
   * @param {Object} userdetails
   */
  static adminUpdateUser(params) {
    let url = api + `/admin/editUser`;
    return this.handleRequest("post", url, params);
  }

  /**
   * Admin Categories
   * @param {Object} type
   */
  static adminAllCategories(params) {
    let url = api + `/admin/getAllCategory`;
    return this.handleRequest("post", url, params);
  }

  /**
   * Admin Update Categories
   * @param {Object} type
   */
  static adminUpdateCategory(params) {
    let url = api + `/admin/editCategory`;
    return this.handleRequest("put", url, params);
  }

  /**
   * Admin Update Categories
   * @param {Object} type
   */
  static adminUpdateCategory(params) {
    let url = api + `/admin/editCategory`;
    return this.handleRequest("put", url, params);
  }

  /**
   * Admin Create Categories
   * @param {Object} type
   */
  static adminCreateCategory(params) {
    let url = api + `/admin/createCategory`;
    return this.handleRequest("post", url, params);
  }

  /**
   * Admin Update Collection
   * @param {Object} type
   */
  static adminUpdateCollection(params) {
    let url = api + `/admin/updateCollection`;
    return this.handleRequest("post", url, params);
  }

  /**
   * Admin delete Collection
   * @param {Object} type
   */
  static adminDeleteCollection(params) {
    let url = api + `/admin/deleteCollection`;
    return this.handleRequest("post", url, params);
  }

  /**
   * Get user profile count
   * @param {Object} type
   */
  static getUserProfileNFTCount(params) {
    let url = api + `/collectible/getUserProfileDetailCount`;
    return this.handleRequest("post", url, params);
  }

  /**
   * GET BALANCE
   * @param {string} base
   * @param {string} quote
   */
  static getBalance(base, quote) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `https://min-api.cryptocompare.com/data/price?fsym=${base}&tsyms=${quote}`
        )
        .then((response) => resolve(response.data))
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * GET followers
   * @param {string} walletAddress
   */
  static getFollowers(walletAddress) {
    let url = `${api}/user/getFollowing/${walletAddress}`;
    return this.handleRequest("get", url);
  }

  /**
   * GET user follow
   * @param {string} walletAddress
   */
  static getUserFollowCount(walletAddress) {
    let url = `${api}/user/getUserFollowCount/${walletAddress}`;
    return this.handleRequest("get", url);
  }

  /**
   * GET user getUserNFTCount
   * @param {string} walletAddress
   */
  static getUserNFTCount(walletAddress) {
    let url = `${api}/user/getUserNFTCount/${walletAddress}`;
    return this.handleRequest("get", url);
  }
  /**
   * GET pre launch token detail
   * @param {string} tokenId
   */
  static getPreLaunchToken(tokenId) {
    let url = `${api}/pre-launch/${tokenId}`;
    return this.handleRequest("get", url);
  }

  /**
   * Post buy prelaunch token
   * @param {string} tokenId
   */
  static buyPreLaunch(params) {
    let url = `${api}/pre-launch/buy`;
    return this.handleRequest("post", url, params);
  }

  /**
   * Post buy prelaunch token balance
   * @param {string} tokenId
   */
  static getUserPreLaunchBalance(params) {
    let url = `${api}/pre-launch/getUserBalance`;
    return this.handleRequest("post", url, params);
  }

  /**
   * Post buy prelaunch token all balance
   * @param {string} tokenId
   */
  static getUserAllBalance(params) {
    let url = `${api}/pre-launch/getUserAllBalance`;
    return this.handleRequest("post", url, params);
  }

  /**
   * Post buy prelaunch all user token
   * @param {object} params
   */
  static getUserPrelaunchNFT(params) {
    let url = `${api}/pre-launch/getUserNFT`;
    return this.handleRequest("post", url, params);
  }

  /**
   * Post buy prelaunch all user token
   * @param {object} params
   */
  static getCollectionsCount(params) {
    let url = `${api}/collection/getCollectionsCount`;
    return this.handleRequest("post", url, params);
  }

  /**
   * Upload file
   * @param {object} params
   */

  static uploadImage(file) {
    let url = `${api}/general/uploadImage`;
    const formData = new FormData();
    formData.append("file", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    return this.handleRequest("post", url, formData, config);
  }
}

export default API;
