import React, { useEffect, useRef, useState } from "react";
import useActiveWeb3React from "../hooks/useActiveWeb3React";
import { injected, walletconnect, walletLink } from "../utils/connectors";

import Navbar from "../components/Layout/Navbar";
import Copyright from "../components/Common/Copyright";
import Link from "next/link";
import MetaMaskOnboarding from "@metamask/onboarding";
import { useEagerConnect, useInactiveListener } from "../hooks";
import { connect } from "react-redux";
import { UpdateUser } from "../redux/actions/user";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { supportedChainIds } from "../utils/connectors";

const CONNECT_TEXT = "Connect Metamask";

const AddWallet = (props) => {
  const router = useRouter();

  // eslint-disable-next-line no-unused-vars
  const [metamaskButtonText, setMetamaskButtonText] = useState("");
  const [activatingConnector, setActivatingConnector] = useState();
  const [buyer, setBuyer] = useState("");
  // const { login, logout } = useAuth();

  const {
    account,
    activate,
    connector,
    active: walletActive,
    deactivate,
  } = useActiveWeb3React();

  const onboarding = useRef();

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);

  // For Metamask OnBoarding
  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
  }, []);

  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (account && account.length > 0) {
        onboarding.current.stopOnboarding();
      } else {
        setMetamaskButtonText(CONNECT_TEXT);
      }
      if (buyer) {
        let payload = { ...buyer };
        payload.walletAddress = account;
        props
          .UpdateUser(payload)
          .then((res) => {
            console.log("User updated successfully");
          })
          .catch((error) => {
            console.error("User update failed");
          });
      }
    }
  }, [account]);

  useEffect(() => {
    let user = props.userinfo.Users.userInfo;
    if (user) {
      setBuyer(user);
    }
  }, [props]);

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  const onConnectWithMetamaskClick = () => {
    if (
      window?.ethereum?.networkVersion &&
      !supportedChainIds.includes(Number(window?.ethereum?.networkVersion))
    ) {
      toast.error("You're connected to an unsupported network.");
      return;
    }
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      setActivatingConnector(injected);
      // login(injected, "metamask");
    } else {
      onboarding.current.startOnboarding();
    }
    // handleWalletClose();
  };

  const onConnectWithWalletConnectClick = () => {
    setActivatingConnector(walletconnect);
    // login(walletconnect, "wallet");
    // handleWalletClose();
  };

  const onLinkConnectClick = () => {
    setActivatingConnector(walletLink);
    // login(walletLink, "coinbase");
    // handleWalletClose();
  };

  const handleDisconnectWalletClick = () => {
    console.log("Wallet Disconnected");
    localStorage.setItem("shouldEagerConnect", false);
    deactivate();
  };

  return (
    <>
      <Navbar />

      <div className="wallet-area pt-50 pb-70">
        <div className="container">
          {router.query && router.query.newAccount && (
            <div className="pb-70">
              <div className="alert alert-success" role="alert">
                Your account is registered successfully. Please connect your
                wallet.
              </div>
            </div>
          )}

          <div className="section-title">
            <h2>Connect Your wallet</h2>
            <p>
              Connect with one of available wallet providers or create a new
              wallet.{" "}
              <Link href="/help-center">
                <a>What is a wallet?</a>
              </Link>{" "}
            </p>
          </div>

          <div className="row pt-45">
            <div className="col-lg-4 col-6">
              <div
                style={{ cursor: "pointer" }}
                className="wallet-card"
                onClick={() => onConnectWithMetamaskClick()}
              >
                <img src="../images/wallet-img/metamask.svg" alt="Images" />
                <h3>
                  <a>Metamask</a>
                </h3>
                {account && walletActive && (
                  <a onClick={() => handleDisconnectWalletClick()}>
                    Disconnect
                  </a>
                )}

                {!account && <p>Connect with Metamask</p>}
                {account && walletActive && (
                  <div className="top-btn btn-green">Connected</div>
                )}

                {!account && <div className="top-btn">Connect</div>}
              </div>
            </div>

            <div className="col-lg-4 col-6">
              <div
                style={{ cursor: "pointer" }}
                className="wallet-card"
                onClick={() => onConnectWithWalletConnectClick()}
              >
                <img
                  src="../images/wallet-img/wallet-connect.svg"
                  alt="Images"
                />
                <h3>
                  <a>Wallet Connect</a>
                </h3>

                <p>Connect with Wallet Connect</p>

                <div className="top-btn">Connect</div>
              </div>
            </div>

            <div className="col-lg-4 col-6">
              <div
                style={{ cursor: "pointer" }}
                className="wallet-card"
                onClick={() => onLinkConnectClick()}
              >
                <img src="../images/wallet-img/coinbase.svg" alt="Images" />
                <h3>
                  <a>Coinbase Wallet</a>
                </h3>
                <p>Connect with Coinbase Wallet</p>
                <div className="top-btn">Connect</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Copyright />
    </>
  );
};

const mapStateToProps = (state) => {
  return { userinfo: state.user };
};

const mapDispatchToProps = {
  UpdateUser,
};
export default connect(mapStateToProps, mapDispatchToProps)(AddWallet);
