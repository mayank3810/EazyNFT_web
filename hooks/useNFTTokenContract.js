import useContract from './useContract';
import NFT_TOKEN_ABIS from '../contract/PolyOne.json';

const useNFTTokenContract = () => {
  const NFT_CONTRACT = process.env.REACT_APP_RINKBY_NFT_CONTRACT_ADDRESS;

  return useContract(NFT_CONTRACT, NFT_TOKEN_ABIS, false);
};

export default useNFTTokenContract;
