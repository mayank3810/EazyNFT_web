import {
  injected,
  walletconnect,
  walletLink,
} from "../utils/connectors";
import { ethers } from "ethers";

export const ConnectorNames = {
  Injected: "injected",
  WalletConnect: "walletconnect",
  WalletLink: "walletlink",
};

export const connectorsByName = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.WalletConnect]: walletconnect,
  [ConnectorNames.WalletLink]: walletLink,
};

export const signMessage = async (provider, account, message) => {
  /**
   * Wallet Connect does not sign the message correctly unless you use their method
   * @see https://github.com/WalletConnect/walletconnect-monorepo/issues/462
   */
  if (provider.provider?.wc) {
    const wcMessage = ethers.utils.hexlify(ethers.utils.toUtf8Bytes(message));
    const signature = await provider.provider?.wc.signPersonalMessage([
      wcMessage,
      account,
    ]);
    return signature;
  }

  return provider.getSigner(account).signMessage(message);
};
