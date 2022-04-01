import type { Web3ReactHooks } from "@web3-react/core";
import type { MetaMask } from "@web3-react/metamask";
import { Network } from "@web3-react/network";
import { WalletConnect } from "@web3-react/walletconnect";
import type { WalletLink } from "@web3-react/walletlink";
import { useCallback, useEffect, useState } from "react";
import {
  CHAINS,
  SUPPORTED_WALLETS,
  getAddChainParameters,
  URLS,
} from "../../chains.ts";

function Select({
  chainId,
  switchChain,
  displayDefault,
  chainIds,
}: {
  chainId: number;
  switchChain: (chainId: number) => void | undefined;
  displayDefault: boolean;
  chainIds: number[];
}) {
  const _network = Object.values(CHAINS).sort((a, b) => a.index - b.index);

  return (
    <div className="grid-5 mt-3">
      {_network.map((value) => (
        <div
          className="text-center"
          role="button"
          style={{ opacity: value?.status ? 1 : 0.3 }}
          onClick={() => {
            switchChain?.(Number(value?.chainId));
          }}
        >
          <div className="position-relative">
            <img src={value?.icon} height={40} />
            {value?.chainId == chainId && (
              <img
                src="/images/circle-done.svg"
                className="wallet-active-circle"
              />
            )}
          </div>
          <div className="mt-2" style={{ fontSize: "12px" }}>
            {value?.shortName}
          </div>
        </div>
      ))}
    </div>
  );
}

export function ConnectWithSelect({
  connector,
  chainId,
  isActivating,
  error,
  isActive,
  updateDesiredWallet,
  desiredWallet,
  setDesiredChainId,
  desiredChainId,
}: {
  connector: MetaMask | WalletConnect | WalletLink | Network;
  chainId: ReturnType<Web3ReactHooks["useChainId"]>;
  isActivating: ReturnType<Web3ReactHooks["useIsActivating"]>;
  error: ReturnType<Web3ReactHooks["useError"]>;
  isActive: ReturnType<Web3ReactHooks["useIsActive"]>;
  updateDesiredWallet: Function;
  desiredWallet: String;
  setDesiredChainId: Function;
  desiredChainId: Number;
}) {
  const supportedWallets = Object.values(SUPPORTED_WALLETS).sort(
    (a, b) => a.index - b.index
  );
  const isNetwork = connector instanceof Network;
  const displayDefault = !isNetwork;
  const chainIds = (isNetwork ? Object.keys(URLS) : Object.keys(CHAINS)).map(
    (chainId) => Number(chainId)
  );

  useEffect(() => {
    if (chainId) setDesiredChainId(chainId || 1);
  }, [chainId]);

  const switchChain = useCallback(
    async (desiredChainId: number) => {
      setDesiredChainId(desiredChainId);
    },
    [connector, chainId]
  );

  const handleWalletChange = (connector, name) => {
    if (isActivating) return;
    updateDesiredWallet(name);
  };

  return (
    <>
      <Select
        chainId={desiredChainId}
        switchChain={isActivating ? undefined : switchChain}
        displayDefault={displayDefault}
        chainIds={chainIds}
      />
      <div className="mt-3 mb-3">
        <div>Choose Wallet</div>
        <div className="grid-5 mt-3 ">
          {supportedWallets.map((value) => (
            <div
              className="text-center"
              role="button"
              style={{ opacity: value?.status ? 1 : 0.3 }}
              onClick={() => handleWalletChange(connector, value?.name)}
            >
              <div className="position-relative">
                <img src={value?.icon} height={40} />
                {desiredWallet === value?.name && isActive && (
                  <img
                    src="/images/circle-done.svg"
                    className="wallet-active-circle"
                  />
                )}
              </div>
              <div className="mt-2" style={{ fontSize: "12px" }}>
                {value?.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
