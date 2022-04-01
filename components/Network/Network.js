import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Link from "next/link";
import Web3 from "web3";

import { openConnectModal, setNetwork } from "../../redux/actions/main";
import { LogoutUser } from "../../redux/actions/user";

const images = {
  Ethereum: "Ethereum.png",
  Polygon: "Polygon.svg",
  "Polygon Mumbai": "Polygon.svg",
  Rinkeby: "Ethereum.png",
};

function WalletButton(props) {
  const network = props?.main?.network;

  useEffect(() => {
    const _network = localStorage.getItem("network") || "Ethereum";
    props.setNetwork(_network);
    localStorage.setItem("network", _network);
  }, []);

  const handleChange = (value) => {
    if (value != network) handleLogout();
    props.setNetwork(value);
    localStorage.setItem("network", value);
  };

  const handleLogout = () => {
    props.LogoutUser();
  };

  return (
    <>
      <div className="dropdown hide-mobile" role="button">
        <div className=" nav-link drop-link p-0">
          <button
            type="button"
            className="connect-btn"
            style={{
              minHeight: "49px",
            }}
          >
            <img
              src={`/images/icons/${images[network]}`}
              height={network == "Polygon" ? 15 : 20}
            />{" "}
            &nbsp;
            {network}
          </button>
          <div
            className="dropdown-content"
            style={{
              padding: "20px 20px",
              minWidth: "230px",
            }}
          >
            <div className="d-flex" onClick={() => handleChange("Rinkeby")}>
              <div className="header-profile-logo-section complete-center m-0">
                <img src="/images/icons/Ethereum.png" height={20} />
              </div>
              <div className="header-profile-title">Rinkeby</div>
            </div>

            <div
              className="d-flex mt-3"
              onClick={() => handleChange("Polygon Mumbai")}
            >
              <div className="header-profile-logo-section complete-center m-0">
                <img src="/images/icons/Polygon.svg" height={15} />
              </div>
              <div className="header-profile-title">Polygon Mumbai</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return { userinfo: state.user, main: state?.main };
};

const mapDispatchToProps = {
  openConnectModal,
  LogoutUser,
  setNetwork,
};
export default connect(mapStateToProps, mapDispatchToProps)(WalletButton);
