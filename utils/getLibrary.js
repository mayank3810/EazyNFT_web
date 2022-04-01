import { ethers } from "ethers";
const getLibrary = (provider) => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 15000;
  return library;
};

export default getLibrary;
