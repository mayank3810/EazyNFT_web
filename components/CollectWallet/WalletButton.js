import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";

import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import { openConnectModal } from "../../redux/actions/main";
import { walletShotener } from "../../utils/wallet";
import { LogoutUser } from "../../redux/actions/user";
import { formatEther } from "@ethersproject/units";

function WalletButton(props) {
  // const { account } = useActiveWeb3React();
  const [balance, setbalance] = useState(0);
  const router = useRouter();

  const { user } = props.userinfo;
  const { web3 } = props.main;
  const isAdmin = (user.roles || []).includes("admin");

  useEffect(() => {
    let provider = web3?.provider;
    let accounts = web3?.accounts;
    if (provider && accounts?.length) {
      let stale = false;

      void Promise.all(
        accounts.map((account) => provider.getBalance(account))
      ).then((balances) => {
        if (!stale) {
          const _balance = formatEther(balances[0]);
          setbalance(Number(Number(_balance).toFixed(4)));
        }
      });

      return () => {
        stale = true;
        setbalance(0);
      };
    }
  }, [web3?.provider, web3?.accounts, web3?.desiredChainId]);

  const handleLogout = () => {
    props.LogoutUser();
    web3?.connector?.deactivate();
  };

  const currencyUnit = web3?.networkDetails?.currency || "ETH";

  return (
    <>
      {/* <Network /> */}
      {user?.walletAddress ? (
        <div className="dropdown">
          <div className=" nav-link drop-link p-0">
            <button
              type="button"
              className="connect-btn"
              onClick={() => {
                if (!user?.walletAddress) props.openConnectModal(true);
              }}
            >
              <i class="ri-arrow-drop-down-line icon-drop"></i>{" "}
              {walletShotener(user?.walletAddress, 6)}
              <img
                className="avatar border-radius-50"
                style={{
                  height: "30px",
                  width: "30px",
                  display: "inline-block",
                }}
                src={
                  user?.profilePic || "/images/landing-page/avatar-holder.png"
                }
              ></img>
            </button>
            {user?.walletAddress && (
              <div
                className="dropdown-content"
                style={{
                  padding: "20px 20px",
                  minWidth: "230px",
                }}
              >
                <div className="d-flex">
                  <div className="header-profile-wallet">
                    <div className="balance">
                      {balance} {currencyUnit}
                    </div>
                    <div className="address">
                      {walletShotener(user?.walletAddress, 7)}
                    </div>
                  </div>
                </div>
                {/* <div
                  className="d-flex mt-3"
                  onClick={() => router.push(`/artist/${user?.walletAddress}`)}
                >
                  <div className="header-profile-logo-section complete-center m-0">
                    <i className="ri-user-line ri-lg"></i>
                  </div>
                  <div className="header-profile-title">Profile</div>
                </div> */}
                <div
                  className="d-flex mt-3"
                  onClick={() => router.push("/artist/" + user?.walletAddress)}
                >
                  <div className="header-profile-logo-section complete-center m-0">
                    <i className="ri-dashboard-3-line ri-lg"></i>
                  </div>
                  <div className="header-profile-title">Dashboard</div>
                </div>

                <div
                  className="d-flex mt-3"
                  onClick={() => router.push("/profile")}
                >
                  <div className="header-profile-logo-section complete-center m-0">
                    <i className="ri-dashboard-3-line ri-lg"></i>
                  </div>
                  <div className="header-profile-title">My Profile</div>
                </div>


               
                {isAdmin && (
                  <div
                    className="d-flex mt-3"
                    onClick={() => router.push("/admin/users")}
                  >
                    <div className="header-profile-logo-section complete-center m-0">
                      <i className="ri-admin-line ri-lg"></i>
                    </div>
                    <div className="header-profile-title">Admin</div>
                  </div>
                )}

                <div className="d-flex mt-3" onClick={() => handleLogout()}>
                  <div className="header-profile-logo-section complete-center m-0">
                    <i class="ri-logout-circle-r-line ri-lg"></i>
                  </div>
                  <div className="header-profile-title">Logout</div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <button
          onClick={() => props.openConnectModal(true)}
          type="button"
          className="connect-btn"
          style={{ paddingRight: "20px" }}
        >
          Connect Wallet <i className="ri-arrow-right-line icon"></i>
        </button>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return { userinfo: state.user, main: state.main };
};

const mapDispatchToProps = {
  openConnectModal,
  LogoutUser,
};
export default connect(mapStateToProps, mapDispatchToProps)(WalletButton);
