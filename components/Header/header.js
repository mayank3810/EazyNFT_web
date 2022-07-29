import Link from "next/link";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Web3 from "web3";
import { openConnectModal } from "../../redux/actions/main";
import { walletShotener } from "../../utils/wallet";
import { formatEther } from "@ethersproject/units";
import config from "../../config/config";
import WalletButton from "../CollectWallet/WalletButton";

function index(props) {
  const [inputTags, setInputTags] = useState(false);
  const [balance, setbalance] = useState(0);

  const { user } = props.userinfo;

  const { web3 } = props.main;
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
  }, [web3?.provider, web3?.accounts]);

  return (
    <>
      <nav className="navbar sticky-top navbar-expand-lg navbar-light">
        <div className=" container-fluid  navbar-bg">
          <ul className="font-tomica navbar-nav mr-auto header-navbar">
            <li className="nav-item">
              <a className="navbar-brand" role="button">
                <Link href="/home">
                  <img
                    src="/images/home-v1/logo-home.svg"
                    className="logo"
                    alt="logo"
                  />
                </Link>
              </a>
            </li>
            <li className="nav-item">
              {/* <a className="nav-link" href="#">
                Curators
              </a> */}

              <div className="dropdown">
                <Link href="/certificates">
                  <a className=" nav-link drop-link">Discover</a>
                </Link>

                <div className="dropdown-content">
                  <Link href="/certificates">
                    <a href="#">
                      <img src="/images/home-v1/apps.svg"></img>Discover
                      <i className="ri-arrow-drop-right-line"></i>
                    </a>
                  </Link>
                  <a href="/collections">
                    <img src="/images/home-v1/grid_on.svg"></img>Collection
                    <i className="ri-arrow-drop-right-line"></i>
                  </a>
                  <a href="#">
                    <img src="/images/home-v1/fire.svg"></img>Trending
                    <i className="ri-arrow-drop-right-line"></i>
                  </a>
                  <a href="#">
                    <img src="/images/home-v1/show_chart.svg"></img>Drops
                    <i className="ri-arrow-drop-right-line"></i>
                  </a>
                </div>
              </div>
            </li>
            <li className="nav-item ">
              <div className="dropdown">
                <a className="nav-link drop-link cursor-pointer">Curators</a>
                <div className="dropdown-content curator">
                  <a href="#">
                    <img src="/images/home-v1/curator.png"></img>Trendland
                    <i className="ri-arrow-drop-right-line"></i>
                  </a>
                  <a href="#">
                    <img src="/images/home-v1/curator.png"></img>BrawHaus
                    <i className="ri-arrow-drop-right-line"></i>
                  </a>
                  <a href="#">
                    <img src="/images/home-v1/curator.png"></img>Parlor Gallery
                    <i className="ri-arrow-drop-right-line"></i>
                  </a>
                  <a href="#" className="drop-link-text">
                    Become a Curator
                  </a>
                </div>
              </div>
            </li>

            <li className="nav-item active">
              <a className="nav-link" href="#">
                Blog
              </a>
            </li>
            <li className="nav-item">
              <div className="input-group search-bar">
                <input
                  onFocus={() => {
                    setInputTags(true);
                  }}
                  onBlur={() => {
                    setInputTags(false);
                  }}
                  type="text"
                  className="form-control search"
                  aria-label="Recipient's username"
                />

                <span>
                  <button id="search-btn" className="btn-search" type="button">
                    <i className="ri-search-line" />
                  </button>
                </span>
                {inputTags && (
                  <div className="search-bar-tags">
                    <h3>Popular tags :</h3>
                    <spna className="search-bar-tag">Digital Art</spna>
                    <spna className="search-bar-tag">3D</spna>
                    <spna className="search-bar-tag">Photography</spna>
                    <spna className="search-bar-tag">Dance</spna>
                    <spna className="search-bar-tag">Abstract</spna>
                    <spna className="search-bar-tag">2D</spna>
                    <spna className="search-bar-tag">Generative Art</spna>
                    <spna className="search-bar-tag">Movies</spna>
                    <spna className="search-bar-tag">Animation</spna>
                    <spna className="search-bar-tag">Illustration</spna>
                  </div>
                )}
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <i className="ri-moon-fill"></i>
              </a>
            </li>
            <li className="nav-item">
              <Link href="/create">
                <a className="nav-link" href="#">
                  <button className="btn btn-gradient" type="submit">
                    Create
                  </button>
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <WalletButton />
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

const mapStateToProps = (state) => {
  return { userinfo: state.user, main: state?.main };
};

const mapDispatchToProps = { openConnectModal };
export default connect(mapStateToProps, mapDispatchToProps)(index);
