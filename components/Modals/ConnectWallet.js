import React from "react";
import { connect } from "react-redux";

import { UpdateUser, LogoutUser } from "../../redux/actions/user";
import { openConnectModal } from "../../redux/actions/main";
import MetaMaskCard from "./MetaMaskCard.tsx";

function ConnectWallet(props) {
  const onClose = () => {
    props?.openConnectModal(false);
  };

  return (
    <div
      style={{ display: props?.main?.connectModal ? "flex" : "none" }}
      className="modal "
    >
      <div className="modal-content">
        <span onClick={() => onClose()} className="close-btn">
          <i className="ri-close-fill"></i>
        </span>

        <div className="text-center mb-4 mt-2 f-18">Connect Wallet</div>

        <div className="mt-3">
          <div>Choose Network</div>
          <MetaMaskCard />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { userinfo: state.user, main: state.main };
};

const mapDispatchToProps = {
  UpdateUser,
  openConnectModal,
  LogoutUser,
};
export default connect(mapStateToProps, mapDispatchToProps)(ConnectWallet);
