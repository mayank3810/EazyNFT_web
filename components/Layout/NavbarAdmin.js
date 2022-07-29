import React, { useState, useEffect } from "react";
import Link from "../../utils/ActiveLink";
import SearchModal from "./SearchModal";
import { wrapper } from "../../redux/store";
// import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import { connect, useDispatch } from "react-redux";
import { walletShotener } from "../../utils/wallet";
import { toast } from "react-toastify";
import { setRedirect, openConnectModal } from "../../redux/actions/main";
import WalletButton from "../CollectWallet/WalletButton";
import { Router, useRouter } from "next/router";

const NavbarAdmin = (ctx) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showWallet, setShowWallet] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [sticky, setSticky] = useState(false);
  const { pathname, asPath } = useRouter();
  const router = useRouter();
  const { web3 } = ctx?.main;
  // const { provider, desiredChainId, account } = web3;
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
      <div className="navbar sticky-top navbar-expand-lg navbar-light">
        <div className="mobile-responsive-nav">
          <div>
            <Link href="/">
              <img
                src="/images/polyone-white.png"
                style={{ display: "block", maxWidth: "115px" }}
                role="button"
              />
            </Link>
          </div>
          <div className="container-fluid">
            <div className="mobile-responsive-menu">
              <div onClick={() => toggleMenu()} className="hamburger-menu">
                <span className="nav-mobile-user-avatar">
                  <img
                    src={currentUser?.profilePic}
                    height="27px"
                    style={{ display: "block" }}
                  />
                </span>
                <span style={{ position: "relative", top: "-3px" }}>
                  {showMenu ? (
                    <i className="ri-close-line"></i>
                  ) : (
                    <i className="ri-more-fill"></i>
                  )}
                </span>
              </div>
              <div className="logo">
                <Link href="/">
                  <a>
                    <img
                      src="/images/footer-logo.png"
                      alt="logo"
                      style={{ maxHeight: "46px" }}
                    />
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div
          className={
            showMenu
              ? "show desktop-nav desktop-nav-one nav-area"
              : "desktop-nav desktop-nav-one nav-area bg-dark"
          }
        >
          <div className="ml-3">
            <nav className="navbar navbar-expand-md navbar-light ">

              <div className="container">
                <Link href="/">
                  <a className="navbar-brand">
                    <img src="/images/logo.svg" alt="Logo" />
                  </a>
                </Link>

                <div
                  className="collapse navbar-collapse mean-menu justify-content-center"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav">
                    <li>
                      <Link href="/certificates">
                        <a>All Certificates</a>
                      </Link>
                    </li>

                    <li>
                      <Link href="/admin/users">
                        <a>Users</a>
                      </Link>
                    </li>

                    <li>
                      <Link href="/admin/category">
                        <a>Category</a>
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="currentUserName d-flex justify-content-end">
                  <div className="header-link d-flex align-items-center"></div>

                  <WalletButton showMore={true} isAdmin={isAdmin} />
                </div>
              </div>
            </nav>
          </div>
        </div>

        <div className="mobile-nav">
          <div
            className="search-btn global-pointer"
            onClick={() => toggleSearchModal()}
          ></div>
        </div>

        <div className="side-nav-responsive">
          <div className="container-max">
            <div
              className="dot-menu dot-menu-mt"
              onClick={() => toggleWallet()}
            ></div>

            <div
              className={
                showWallet
                  ? "container container-mt active"
                  : "container container-mt"
              }
            >
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
            </div>
          </div>
        </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(NavbarAdmin);
