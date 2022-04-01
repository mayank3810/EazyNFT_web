import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { hooks as metaMaskHook, metaMask } from "../../connectors/metaMask.ts";
import {
  hooks as walletConnectkHook,
  walletConnect,
} from "../../connectors/walletConnect.ts";
import {
  hooks as walletLinkHook,
  walletLink,
} from "../../connectors/walletLink.ts";
import { signMessage } from "../../utils/getSignature";
import { ConnectWithSelect } from "./ConnectWithSelect.tsx";
import { LogoutUser, LoginUser, AddUser } from "../../redux/actions/user";
import { updateWeb3 } from "../../redux/actions/main";
import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import { CONNECTOR_ID } from "../../utils/storagekeys";
import { CHAINS } from "../../chains.ts";

function getDetails(wallet) {
  if (wallet === "MetaMask") {
    return {
      hooks: metaMaskHook,
      connector: metaMask,
    };
  } else if (wallet === "WalletConnect") {
    return {
      hooks: walletConnectkHook,
      connector: walletConnect,
    };
  } else if (wallet === "Coinbase") {
    return {
      hooks: walletLinkHook,
      connector: walletLink,
    };
  } else return { hooks: {}, connector: {} };
}

function MetaMaskCard(props) {
  const [desiredWallet, setdesiredWallet] = useState("MetaMask");
  const [desiredChainId, setDesiredChainId] = useState<number>(1);
  const {
    // account, deactivate, connector, library, error
    setData,
  } = useActiveWeb3React();
  const { hooks, connector } = getDetails(desiredWallet);
  const {
    useChainId,
    useAccounts,
    useError,
    useIsActivating,
    useIsActive,
    useProvider,
  } = hooks;
  const chainId = useChainId();
  const accounts = useAccounts();
  const error = useError();
  const isActivating = useIsActivating();
  const _account = accounts?.length ? accounts[0] : "";

  const isActive = useIsActive();
  const provider = useProvider();

  useEffect(() => {
    const _connectedAt = localStorage.getItem("connectedAt");
    let _currentTime = Date.now();
    if (!_connectedAt || Number(_connectedAt) < _currentTime - 86400000) {
      connector?.deactivate();
      if (props?.user?.user?.walletAddress) props.LogoutUser();
      localStorage.removeItem(CONNECTOR_ID);
      localStorage.removeItem("signature");
      localStorage.removeItem("walletAddress");
    }
  }, []);

  useEffect(() => {
    let _id = localStorage.getItem(CONNECTOR_ID);
    if (!chainId && _id === "MetaMask") {
      metaMask.connectEagerly();
    }
  }, [metaMask, chainId]);

  useEffect(() => {
    if (!_account && props?.main?.web3?.account) {
      props.LogoutUser();
    }
  }, [props?.main?.web3, _account]);

  useEffect(() => {
    const signature = localStorage.getItem("signature");
    const walletAddress = localStorage.getItem("walletAddress");
    if (walletAddress && signature && isActive) {
      props.LoginUser(walletAddress, signature);
    }
  }, [isActive]);
  useEffect(() => {
    props.updateWeb3({
      chainId,
      accounts,
      error,
      isActivating,
      isActive,
      provider,
      _account,
      hooks,
      connector,
      account: _account,
      desiredChainId,
      desiredWallet,
      networkDetails: CHAINS[desiredChainId],
    });
    setData({
      chainId,
      accounts,
      error,
      isActivating,
      isActive,
      provider,
      _account,
      hooks,
      connector,
      account: _account,
      desiredChainId,
      desiredWallet,
      networkDetails: CHAINS[desiredChainId],
    });
  }, [
    chainId,
    accounts,
    error,
    isActivating,
    _account,
    isActive,
    provider,
    hooks,
    connector,
    _account,
    desiredChainId,
    desiredWallet,
  ]);

  useEffect(() => {
    if (_account && isActive) {
      const signature = localStorage.getItem("signature");
      const walletAddress = localStorage.getItem("walletAddress");
      if (
        ((!signature || !walletAddress) && _account) ||
        _account !== walletAddress
      ) {
        props.LogoutUser();
        askForSignature();
      }
    }
  }, [_account, isActive]);

  async function askForSignature() {
    try {
      const signature = await signMessage(
        provider,
        _account,
        `Verify your account: ${_account}`
      );
      await props.LoginUser(_account, signature, desiredWallet);
      localStorage.setItem("connectedAt", Date.now().toString());
    } catch (error) {
      connector?.deactivate();
      console.log(error);
    }
  }

  const handleChangeWallet = (value) => {
    setdesiredWallet(value);
    if (!isActive || desiredWallet != value) {
      if (isActive) connector?.deactivate();
      const { connector: newConnector } = getDetails(value);
      newConnector.activate(desiredChainId);
    }
  };

  return (
    <ConnectWithSelect
      connector={connector}
      chainId={chainId}
      isActivating={isActivating}
      error={error}
      isActive={isActive}
      updateDesiredWallet={handleChangeWallet}
      setDesiredChainId={setDesiredChainId}
      desiredWallet={desiredWallet}
      desiredChainId={desiredChainId}
    />
  );
}

const mapStateToProps = (state) => {
  return { user: state.user, main: state.main };
};

const mapDispatchToProps = {
  LogoutUser,
  LoginUser,
  AddUser,
  updateWeb3,
};
export default connect(mapStateToProps, mapDispatchToProps)(MetaMaskCard);
