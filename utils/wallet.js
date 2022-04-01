import { isMobile } from "react-device-detect";

const TEST_NET = {
  chainId: "0x61",
  chainName: "Binance Smart Chain - Testnet",
  nativeCurrency: {
    name: "Binance",
    symbol: "BNB",
    decimals: 18,
  },
  rpcUrls: ["https://data-seed-prebsc-2-s1.binance.org:8545/"],
  blockExplorerUrls: ["https://testnet.bscscan.com"],
};

const MAIN_NET = {
  chainId: "1",
  chainName: "Ethereum Mainnet",
  nativeCurrency: {
    name: "Ethereum",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: ["https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"],
  blockExplorerUrls: ["https://etherscan.io"],
};

const ChainId = {
  MAIN_NET: 1,
  TEST_NET: 97,
};

export const IS_DAPP = isMobile && !!window.ethereum;

export const setupNetwork = async () => {
  // const env = process.env.REACT_APP_NODE_ENV;
  const provider = window.ethereum;
  if (provider) {
    try {
      await provider.request({
        method: "wallet_addEthereumChain",
        params: [MAIN_NET],
      });
      return true;
    } catch (error) {
      console.error("Failed to setup the network in Metamask:", error);
      return false;
    }
  } else {
    console.error(
      "Can't setup the BSC network on metamask because window.ethereum is undefined"
    );
    return false;
  }
};

export const walletShotener = (address, length = 10) => {
  let _address = address || "";
  return (
    _address.substr(0, length) +
    "..." +
    _address.substr(_address.length - 4, _address.length)
  );
};
