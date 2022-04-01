/* eslint-disable no-unused-vars */
import { useMemo } from 'react';
import Web3 from 'web3';
import useActiveWeb3React from '../hooks/useActiveWeb3React';

const useContract = (address = undefined, ABI, withSignerIfPossible = true) => {
  const { library } = useActiveWeb3React();

  const { ethereum } = window;
  window.web3 = new Web3(ethereum);

  return useMemo(() => {
    if (!address || !ABI || !library) return null;
    try {
      const contractInstance = new window.web3.eth.Contract(ABI, address);
      return contractInstance;
    } catch (error) {
      console.error('Failed to get contract', error);
      return null;
    }
  }, [library]);
};

export default useContract;
