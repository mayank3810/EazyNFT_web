import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";

const INFURA_KEY = process.env.REACT_APP_INFURA_KEY;

const NETWORK_URLS = {
  1: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
  3: `https://ropsten.infura.io/v3/${INFURA_KEY}`,
};

const POLLING_INTERVAL = process.env.REACT_APP_POLLING_INTERVAL;

const RPC_URLS = {
  1: process.env.REACT_APP_RPC_URL_1,
  3: process.env.REACT_APP_RPC_URL_3,
};

export const supportedChain = {
  Ethereum: 1,
  Rinkeby: 4,
  Polygon: 137,
  "Polygon Mumbai": 80001,
};

// Add different connectors
export const supportedChainIds = [1, 4, 137, 80001];
// Add different connectors
export const injected = new InjectedConnector({
  supportedChainIds, // Change according to supported Network Ids
});

export const walletconnect = new WalletConnectConnector({
  rpc: { 1: RPC_URLS[1] },
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
});

export const walletLink = new WalletLinkConnector({
  url: NETWORK_URLS[3], // Change according to supported Network Id
  appName: "NFT Boilerplate",
});
