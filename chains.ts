import { AddEthereumChainParameter } from "@web3-react/types";

const ETH: AddEthereumChainParameter["nativeCurrency"] = {
  name: "Ether",
  symbol: "ETH",
  decimals: 18,
};

const MATIC: AddEthereumChainParameter["nativeCurrency"] = {
  name: "Matic",
  symbol: "MATIC",
  decimals: 18,
};

interface BasicChainInformation {
  urls: string[];
  name: string;
  icon: string;
  chainId: number;
  shortName: string;
  status: boolean;
  index: number;
  currency: string;
}

interface ExtendedChainInformation extends BasicChainInformation {
  nativeCurrency: AddEthereumChainParameter["nativeCurrency"];
  blockExplorerUrls: AddEthereumChainParameter["blockExplorerUrls"];
}

function isExtendedChainInformation(
  chainInformation: BasicChainInformation | ExtendedChainInformation
): chainInformation is ExtendedChainInformation {
  return !!(chainInformation as ExtendedChainInformation).nativeCurrency;
}

export function getAddChainParameters(
  chainId: number
): AddEthereumChainParameter | number {
  const chainInformation = CHAINS[chainId];
  if (isExtendedChainInformation(chainInformation)) {
    return {
      chainId,
      chainName: chainInformation.name,
      nativeCurrency: chainInformation.nativeCurrency,
      rpcUrls: chainInformation.urls,
      blockExplorerUrls: chainInformation.blockExplorerUrls,
    };
  } else {
    return chainId;
  }
}

export const CHAINS: {
  [chainId: number]: BasicChainInformation | ExtendedChainInformation;
} = {
  1: {
    urls: [
      process.env.NEXT_PUBLIC_INFURA_KEY
        ? `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`
        : undefined,
      process.env.NEXT_PUBLIC_ALCHEMY_KEY
        ? `https://eth-mainnet.alchemyapi.io/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`
        : undefined,
      "https://cloudflare-eth.com",
    ].filter((url) => url !== undefined),
    name: "Mainnet",
    shortName: "Ethereum",
    icon: "/images/icons/Ethereum.png",
    chainId: 1,
    currency: "ETH",
    status: true,
    index: 0,
  },
  // 3: {
  //   urls: [
  //     process.env.NEXT_PUBLIC_INFURA_KEY
  //       ? `https://ropsten.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`
  //       : undefined,
  //   ].filter((url) => url !== undefined),
  //   name: "Ropsten",
  //   icon: "/images/icons/Ethereum.png",
  //   chainId: 3,
  // },
  // 4: {
  //   urls: [
  //     process.env.NEXT_PUBLIC_INFURA_KEY
  //       ? `https://rinkeby.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`
  //       : undefined,
  //   ].filter((url) => url !== undefined),
  //   name: "Rinkeby",
  //   shortName: "Ethereum Testnet",
  //   icon: "/images/icons/Ethereum.png",
  //   chainId: 4,
  //   currency: "ETH",
  //   status: false,
  //   index: 1,
  // },
  // Polygon
  137: {
    urls: [
      process.env.NEXT_PUBLIC_INFURA_KEY
        ? `https://polygon-mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`
        : undefined,
      "https://polygon-rpc.com",
    ].filter((url) => url !== undefined),
    name: "Polygon Mainnet",
    shortName: "Polygon",
    nativeCurrency: MATIC,
    blockExplorerUrls: ["https://polygonscan.com"],
    icon: "https://app.1inch.io/assets/images/network-logos/polygon.svg",
    currency: "MATIC",
    chainId: 137,
    status: false,
    index: 2,
  },
  80001: {
    urls: [
      process.env.NEXT_PUBLIC_INFURA_KEY
        ? `https://polygon-mumbai.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`
        : undefined,
    ].filter((url) => url !== undefined),
    name: "Polygon Mumbai",
    shortName: "Polygon Testnet",
    nativeCurrency: MATIC,
    blockExplorerUrls: ["https://mumbai.polygonscan.com"],
    icon: "https://app.1inch.io/assets/images/network-logos/polygon.svg",
    currency: "MATIC",
    chainId: 80001,
    status: true,
    index: 3,
  },
  // 5: {
  //   urls: [
  //     process.env.NEXT_PUBLIC_INFURA_KEY
  //       ? `https://goerli.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`
  //       : undefined,
  //   ].filter((url) => url !== undefined),
  //   name: "Görli",
  //   icon: "/images/icons/Ethereum.png",
  //   chainId: 5,
  // },
  // 42: {
  //   urls: [
  //     process.env.NEXT_PUBLIC_INFURA_KEY
  //       ? `https://kovan.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`
  //       : undefined,
  //   ].filter((url) => url !== undefined),
  //   name: "Kovan",
  //   icon: "/images/icons/Ethereum.png",
  //   chainId: 42,
  // },
  // Optimism
  // 10: {
  //   urls: [
  //     process.env.NEXT_PUBLIC_INFURA_KEY
  //       ? `https://optimism-mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`
  //       : undefined,
  //     "https://mainnet.optimism.io",
  //   ].filter((url) => url !== undefined),
  //   name: "Optimism",
  //   shortName: "Optimism",
  //   nativeCurrency: ETH,
  //   blockExplorerUrls: ["https://optimistic.etherscan.io"],
  //   icon: "https://app.1inch.io/assets/images/network-logos/optimism.svg",
  //   chainId: 10,
  //   status: false,
  //   index: 4,
  // },
  // 69: {
  //   urls: [
  //     process.env.NEXT_PUBLIC_INFURA_KEY
  //       ? `https://optimism-kovan.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`
  //       : undefined,
  //     "https://kovan.optimism.io",
  //   ].filter((url) => url !== undefined),
  //   name: "Optimism Kovan",
  //   nativeCurrency: ETH,
  //   blockExplorerUrls: ["https://kovan-optimistic.etherscan.io"],
  //   icon: "/images/icons/Ethereum.png",
  //   chainId: 69,
  // },
  // Arbitrum
  // 42161: {
  //   urls: [
  //     process.env.NEXT_PUBLIC_INFURA_KEY
  //       ? `https://arbitrum-mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`
  //       : undefined,
  //     "https://arb1.arbitrum.io/rpc",
  //   ].filter((url) => url !== undefined),
  //   name: "Arbitrum",
  //   shortName: "Arbitrum",
  //   nativeCurrency: ETH,
  //   icon: "https://app.1inch.io/assets/images/network-logos/arbitrum.svg",
  //   blockExplorerUrls: ["https://arbiscan.io"],
  //   chainId: 42161,
  //   status: false,
  //   index: 5,
  // },
  // 421611: {
  //   urls: [
  //     process.env.NEXT_PUBLIC_INFURA_KEY ? `https://arbitrum-rinkeby.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}` : undefined,
  //     'https://rinkeby.arbitrum.io/rpc',
  //   ].filter((url) => url !== undefined),
  //   name: 'Arbitrum Testnet',
  //   nativeCurrency: ETH,
  //   blockExplorerUrls: ['https://testnet.arbiscan.io'],
  // },
};

export const URLS: { [chainId: number]: string[] } = Object.keys(
  CHAINS
).reduce<{ [chainId: number]: string[] }>((accumulator, chainId) => {
  const validURLs: string[] = CHAINS[Number(chainId)].urls;

  if (validURLs.length) {
    accumulator[Number(chainId)] = validURLs;
  }

  return accumulator;
}, {});

export const SUPPORTED_WALLETS = {
  METAMASK: {
    name: "MetaMask",
    iconName: "metamask.png",
    description: "Easy-to-use browser extension.",
    href: null,
    color: "#E8831D",
    icon: "https://app.1inch.io/assets/images/wallet-logos/metamask.svg",
    index: 0,
    status: true,
  },
  WALLET_CONNECT: {
    name: "WalletConnect",
    iconName: "walletConnectIcon.svg",
    description: "Connect to Trust Wallet, Rainbow Wallet and more...",
    href: null,
    color: "#4196FC",
    icon: "https://app.1inch.io/assets/images/wallet-logos/wallet-connect.svg",
    index: 1,
    status: true,
  },
  WALLET_LINK: {
    name: "Coinbase",
    iconName: "coinbaseWalletIcon.svg",
    description: "Use Coinbase Wallet app on mobile device",
    href: null,
    color: "#315CF5",
    icon: "https://app.1inch.io/assets/images/wallet-logos/wallet-link.svg",
    index: 1,
    status: true,
  },
  // COINBASE_LINK: {
  //   name: "Open in Coinbase Wallet",
  //   iconName: "coinbaseWalletIcon.svg",
  //   description: "Open in Coinbase Wallet app.",
  //   href: "https://go.cb-w.com/mtUDhEZPy1",
  //   color: "#315CF5",
  //   mobile: true,
  //   mobileOnly: true,
  // },
  // TRUST_WALLET_LINK: {
  //   name: "Open in Trust Wallet",
  //   iconName: "trustWallet.png",
  //   description: "iOS and Android app.",
  //   href: "https://link.trustwallet.com/open_url?coin_id=60&url=https://uniswap.exchange/swap",
  //   color: "#1C74CC",
  //   mobile: true,
  //   mobileOnly: true,
  // },
  // FORTMATIC: {
  //   name: "Fortmatic",
  //   iconName: "fortmaticIcon.png",
  //   description: "Login using Fortmatic hosted wallet",
  //   href: null,
  //   color: "#6748FF",
  //   mobile: true,
  // },
  // Portis: {
  //   name: "Portis",
  //   iconName: "portisIcon.png",
  //   description: "Login using Portis hosted wallet",
  //   href: null,
  //   color: "#4A6C9B",
  //   mobile: true,
  // },
  // Torus: {
  //   name: "Torus",
  //   iconName: "torus.png",
  //   description: "Login via Google, Facebook and others",
  //   href: null,
  //   color: "#5495F7",
  //   mobile: true,
  // },
};
