const isProduction =
  process.env.NEXT_PUBLIC_ENV === "production" ? true : false;

export default {
  infure: {
    1: "https://rinkeby.infura.io/v3/5c057b861e4c45f09a9c64a2c9bff908",
    4: "https://rinkeby.infura.io/v3/5c057b861e4c45f09a9c64a2c9bff908",
    137: "https://polygon-mumbai.g.alchemy.com/v2/J8-3M2QJguuW9sitZF6PfZZ3N-Wl4xnJ",
    80001:
      "https://polygon-mumbai.g.alchemy.com/v2/J8-3M2QJguuW9sitZF6PfZZ3N-Wl4xnJ",
  },
  contractDetails: {
    1: {
      polyoneContractAddress: "0x7f12D70786A584430425Ec0F9Dc42e36ba7eF2BF",
      marketplaceContractAddress: "0xF32E4fEF3f6AEF6Ff02F4Af7eF963F7Eda5ce44b",
      polyoneOwnerAddress: "0xe04AA2F94F43AdDc3574548AD8AF68FE4bc86A38",
    },
    4: {
      polyoneContractAddress: "0x7f12D70786A584430425Ec0F9Dc42e36ba7eF2BF",
      marketplaceContractAddress: "0xF32E4fEF3f6AEF6Ff02F4Af7eF963F7Eda5ce44b",
      polyoneOwnerAddress: "0xe04AA2F94F43AdDc3574548AD8AF68FE4bc86A38",
    },
    137: {
      polyoneContractAddress: "0xdD79112B58DD70394a75FD4a8A6Aa1E23973360c",
      marketplaceContractAddress: "0xB07512102D48131f6f4fA33fCa2e08bf80f84613",
      polyoneOwnerAddress: "0xe04AA2F94F43AdDc3574548AD8AF68FE4bc86A38",
    },
    80001: {
      polyoneContractAddress: "0xdD79112B58DD70394a75FD4a8A6Aa1E23973360c",
      marketplaceContractAddress: "0xB07512102D48131f6f4fA33fCa2e08bf80f84613",
      polyoneOwnerAddress: "0xe04AA2F94F43AdDc3574548AD8AF68FE4bc86A38",
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
