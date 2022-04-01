//import { useState } from 'react';
import React, { useState, useEffect } from "react";
import SearchModal from "./SearchModal";
import Link from "../../utils/ActiveLink";
import { wrapper } from "../../redux/store";
import { connect } from "react-redux";
import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import { walletShotener } from "../../utils/wallet";
import { toast } from "react-toastify";
import { setRedirect, openConnectModal } from "../../redux/actions/main";
import WalletButton from "../CollectWallet/WalletButton";
import { useRouter } from "next/router";

const NavbarTwo = (ctx) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showWallet, setShowWallet] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [sticky, setSticky] = useState(false);
  const { pathname } = useRouter();
  const router = useRouter();
  const { web3 } = ctx?.main;
  const { provider, desiredChainId, account } = web3;
  const currentUser = ctx?.user?.user;
  const isAdmin = (currentUser.roles || []).includes("admin");

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const toggleWallet = () => {
    setShowWallet(!showWallet);
  };

  const toggleSearchModal = () => {
    setShowSearchModal(!showSearchModal);
  };

  //sticky menu
  const showStickyMenu = () => {
    if (window.scrollY >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };
  if (typeof window !== "undefined") {
    // browser code
    window.addEventListener("scroll", showStickyMenu);
  }
  const copyLink = (value) => {
    const el = document.createElement("textarea");
    el.value = value;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    toast.success("Address copied");
  };

  const checkRedirect = (link) => {
    if (!currentUser?.walletAddress) {
      ctx.setRedirect(link);
      ctx.openConnectModal(true);
    } else router.push(link);
  };

  return (
    <>
      <div className={sticky ? "is-sticky navbar-area" : "navbar-area"}>
        <div className="mobile-responsive-nav">
          <div className="container-fluid">
            <div className="mobile-responsive-menu">
              <div
                onClick={() => toggleMenu()}
                className="hamburger-menu hamburger-two"
              >
                {showMenu ? (
                  <i className="ri-close-line"></i>
                ) : (
                  <i className="ri-menu-line"></i>
                )}
              </div>
            </div>
          </div>
        </div>

        <div
          className={
            showMenu ? "show desktop-nav nav-area" : "desktop-nav nav-area"
          }
        >
          <div className="container-fluid">
            <nav className="navbar navbar-expand-md navbar-light ">
              <Link href="/">
                <a className="navbar-brand">
                  <img
                    src={"https://po-web-prod.vercel.app/images/logo.png"}
                    alt="Logo"
                  />
                </a>
              </Link>

              <div className="nav-widget-form nav-widget-form-bg">
                <form className="search-form">
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Search items, Creators "
                  />
                  <button type="submit">
                    <i className="ri-search-line"></i>
                  </button>
                </form>
              </div>

              <div
                className="collapse navbar-collapse mean-menu"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link href="/home" activeClassName="active">
                      <a className="nav-link">Home</a>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link href="/discover" activeClassName="active">
                      <a className="nav-link">Discover</a>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link href="/drops" activeClassName="active">
                      <a className="nav-link">Drops</a>
                    </Link>
                  </li>

                  <li
                    className="nav-item"
                    onClick={() => checkRedirect("/dashboard")}
                  >
                    <a
                      className={
                        pathname === "/dashboard"
                          ? "nav-link active"
                          : "nav-link "
                      }
                      role="button"
                    >
                      Dashboard
                    </a>
                  </li>

                  <li
                    className="nav-item"
                    onClick={() => checkRedirect("/create")}
                  >
                    <a
                      className={
                        pathname === "/create" ? "nav-link active" : "nav-link "
                      }
                      role="button"
                    >
                      Create
                    </a>
                  </li>
                </ul>

                {/* <div className="others-options nav2">
                  <ul className="optional-item-list">
                    {account ? (
                      <li className="text-success">
                        <div style={{ textAlign: "right" }}>
                          <div>
                            <i className="ri-checkbox-circle-fill"></i> Wallet
                            Connected
                          </div>
                          <div
                            style={{ fontSize: "14px" }}
                            className="text-secondary"
                            role="button"
                            onClick={() => copyLink(account)}
                          >
                            {walletShotener(account)}
                          </div>
                        </div>
                      </li>
                    ) : (
                      <li>
                        <Link href="/add-wallet" activeClassName="active">
                          <a className="active">Connect Wallet</a>
                        </Link>
                      </li>
                    )}
                  </ul>
                </div> */}
              </div>

              <div className="currentUserName nav2">
                <WalletButton showMore={true} isAdmin={isAdmin} />
                {/* <ul className="navbar-nav mr-auto">
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        id="navbarDropdown"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        {currentUser?.name || "Unnamed"}
                      </a>
                      <div
                        className="dropdown-menu p-2"
                        aria-labelledby="navbarDropdown"
                      >
                        <Link href="/dashboard" activeClassName="active">
                          <a>Dashboard</a>
                        </Link>
                        <div className="dropdown-divider"></div>
                        <Link href="/collections" activeClassName="active">
                          <a>Collections</a>
                        </Link>
                        <div className="dropdown-divider"></div>

                        <Link href="/profile" activeClassName="active">
                          <a>Update Profile</a>
                        </Link>
                        {isAdmin && (
                          <>
                            <div className="dropdown-divider"></div>
                            <Link href="/admin/users">
                              <a>Admin</a>
                            </Link>
                          </>
                        )}
                        <div className="dropdown-divider"></div>
                        <Link href="/logout" activeClassName="active">
                          <a>Logout</a>
                        </Link>
                      </div>
                    </li>
                  </ul> */}
              </div>
              {/* {currentUser?.walletAddress &&
                <Link href='/login' >
                  <a className="login-btn">Log In</a>
                </Link>
              } */}
            </nav>
          </div>
        </div>

        <div className="mobile-nav">
          <div
            className="search-btn global-pointer"
            onClick={() => toggleSearchModal()}
          >
            {/* <a data-bs-toggle='modal' data-bs-target='#searchmodal'>
              <i className='ri-search-line'></i>
            </a> */}
          </div>
        </div>
        {!currentUser?.walletAddress && (
          <div className="side-nav-responsive">
            <div className="container-max">
              <div className="dot-menu" onClick={() => toggleWallet()}>
                <div className="circle-inner">
                  <div className="circle circle-one"></div>
                  <div className="circle circle-two"></div>
                  <div className="circle circle-three"></div>
                </div>
              </div>

              {/* <div className={showWallet ? "container active" : "container"}>
                <div className="side-nav-inner">
                  <div className="side-nav justify-content-center align-items-center">
                    <div className="side-nav-item">
                      <ul className="optional-item-list">
                        <li>
                          <Link href="/create" activeClassName="active">
                            <a>Create</a>
                          </Link>
                        </li>
                        <li>
                          <Link href="/add-wallet" activeClassName="active">
                            <a className="active">Connect Wallet</a>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        )}
      </div>
      <SearchModal
        showSearchModal={showSearchModal}
        toggleSearchModal={toggleSearchModal}
      />
    </>
  );
};

export const getInitialPageProps = wrapper.getInitialPageProps(
  ({ store, req, res }) => {
    const state = store.getState();
  }
);

const mapStateToProps = (state) => {
  return { main: state.main, user: state.user };
};

const mapDispatchToProps = {
  setRedirect,
  openConnectModal,
};
export default connect(mapStateToProps, mapDispatchToProps)(NavbarTwo);
