const isProduction =
  process.env.NEXT_PUBLIC_ENV === "production" ? true : false;

export default {
  infure: {
    1: "https://rinkeby.infura.io/v3/9864311673344f61bf94c53c4ca47eb5",
    4: "https://rinkeby.infura.io/v3/9864311673344f61bf94c53c4ca47eb5",
    137: "https://polygon-mumbai.g.alchemy.com/v2/7jGCCAfJ7PrWZGdDjrIqW0NSo-ZkY0__",
    80001:
      "https://polygon-mumbai.g.alchemy.com/v2/7jGCCAfJ7PrWZGdDjrIqW0NSo-ZkY0__",
  },
  contractDetails: {
    1: {
      polyoneContractAddress: "0x5Df435B74f9E56B1d15C610093537ECDCbBBF519",
      marketplaceContractAddress: "0xf688e0593C638631Ef9715BFc41D3d6e3345c71E",
      polyoneOwnerAddress: "0xcE187fEEF192c4D1c8aE7beC7Cd89e3278f8872D",
    },
    4: {
      polyoneContractAddress: "0x5Df435B74f9E56B1d15C610093537ECDCbBBF519",
      marketplaceContractAddress: "0xf688e0593C638631Ef9715BFc41D3d6e3345c71E",
      polyoneOwnerAddress: "0xcE187fEEF192c4D1c8aE7beC7Cd89e3278f8872D",
    },
    137: {
      polyoneContractAddress: "0xbBc88712e5c5f8Be126A78a3Ae4242d9510068eA",
      marketplaceContractAddress: "0xB07512102D48131f6f4fA33fCa2e08bf80f84613",
      polyoneOwnerAddress: "0xcE187fEEF192c4D1c8aE7beC7Cd89e3278f8872D",
    },
    80001: {
      polyoneContractAddress: "0xbBc88712e5c5f8Be126A78a3Ae4242d9510068eA",
      marketplaceContractAddress: "0xB07512102D48131f6f4fA33fCa2e08bf80f84613",
      polyoneOwnerAddress: "0xcE187fEEF192c4D1c8aE7beC7Cd89e3278f8872D",
    },
  },
  isProduction: isProduction,
  etherScanAddress: (address) =>
    `https://${isProduction ? "" : "rinkeby."}etherscan.io/tx/${address}`,

  preSale: {
    1: {
      sun: "0xe68695798A624BafB9F27abe4ffDe183A084601C",
      earth: "0xEb21bEF4f22447F9d22e6B0d77Dc60E0603b9B58",
      moon: "0xA31966b31b78088032B5dB97A8687E29196bb98f",
      expo: "0xAF253D6021b3F251FD4D8A0768D715f64b60e38D",
    },
    4: {
      sun: "0xe68695798A624BafB9F27abe4ffDe183A084601C",
      earth: "0xEb21bEF4f22447F9d22e6B0d77Dc60E0603b9B58",
      moon: "0xA31966b31b78088032B5dB97A8687E29196bb98f",
      expo: "0xAF253D6021b3F251FD4D8A0768D715f64b60e38D",
    },
    137: {
      sun: "0xBC553638a92200623b984c23906BEd1a8a591Dde",
      earth: "0x27399E72e67D23E2E08A2c5Ec8dd2e27d92C92b7",
      moon: "0x605A106a4AB3139B61F63839367915D5E60b380D",
      expo: "0xa233E40845b323041Ddd43121f1bBdE203235DE8",
    },
    80001: {
      sun: "0xBC553638a92200623b984c23906BEd1a8a591Dde",
      earth: "0x27399E72e67D23E2E08A2c5Ec8dd2e27d92C92b7",
      moon: "0x605A106a4AB3139B61F63839367915D5E60b380D",
      expo: "0xa233E40845b323041Ddd43121f1bBdE203235DE8",
    },
  },
};
