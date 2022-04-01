import useContract from './useContract';
import MARKETPLACE_ABI from '../contract/MarketPlace.json';

const MARKETPLACE_CONTRACT = process.env.REACT_APP_RINKBY_MARKETPLACE_CONTRACT_ADDRESS;
const useMarketplaceContract = () => useContract(MARKETPLACE_CONTRACT, MARKETPLACE_ABI, false);

export default useMarketplaceContract;
