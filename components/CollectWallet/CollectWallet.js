import React, { useEffect, useRef, useState } from "react";
import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import { useEagerConnect, useInactiveListener } from "../../hooks";
import { connect } from "react-redux";
import { signMessage } from "../../utils/getSignature";
import { isMobile } from "react-device-detect";
import { toast, ToastContainer } from "react-toastify";
import { LogoutUser, LoginUser, AddUser } from "../../redux/actions/user";
import { setRedirect } from "../../redux/actions/main";
import { supportedChainIds } from "../../utils/connectors";
import { useRouter } from "next/router";

const ConnectWallet = (props) => {
  const { account, deactivate, connector, library, error } =
    useActiveWeb3React();
  const router = useRouter();
  const triedEager = useEagerConnect();
  const [forNewUser, setForNewUser] = useState(false);
  const [signature, setSignature] = useState("");
  const { user } = props?.user;
  useEffect(() => {
    if (
      window?.ethereum?.networkVersion &&
      !supportedChainIds.includes(Number(window?.ethereum?.networkVersion))
    )
      toast.error("You're connected to an unsupported network.");
  }, []);

  useEffect(() => {
    const signature = localStorage.getItem("signature");
    const walletAddress = localStorage.getItem("walletAddress");
    if (walletAddress && signature) {
      props.LoginUser(walletAddress, signature);
    }
  }, []);

  // useEffect(() => {
  //   const signature = localStorage.getItem("signature");
  //   if (account && signature) {
  //     if (account !== signature) {
  //       props.LogoutUser();
  //     }
  //   }
  // }, [account]);

  useEffect(() => {
    if (library && account) {
      const signature = localStorage.getItem("signature");
      const walletAddress = localStorage.getItem("walletAddress");
      if (
        ((!signature || !walletAddress) && account) ||
        account !== walletAddress
      ) {
        props.LogoutUser();
        askForSignature();
      }
    }
  }, [account, library]);

  useEffect(() => {
    if (user?.newUser && !forNewUser && account && signature) {
      setForNewUser(true);
      props.AddUser({ walletAddress: account, signature });
    }
  }, [user, account, signature]);

  async function askForSignature() {
    try {
      const signature = await signMessage(
        library,
        account,
        `Verify your account: ${account}`
      );
      setSignature(signature);
      await props.LoginUser(account, signature);
      if (props.main.redirect) {
        router.push(props.main.redirect);
        props.setRedirect(null);
      }
    } catch (e) {
      if (e.code === 4001) {
        deactivate();
        props.LogoutUser();
      }
    }
  }

  return null;
};

const mapStateToProps = (state) => {
  return { user: state.user, main: state.main };
};

const mapDispatchToProps = {
  LogoutUser,
  LoginUser,
  AddUser,
  setRedirect,
};
export default connect(mapStateToProps, mapDispatchToProps)(ConnectWallet);
