import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Link from "next/link";
import Web3 from "web3";

import WalletButton from "../components/CollectWallet/WalletButton";
import { openConnectModal } from "../redux/actions/main";
import {
  PreSaleMoonContractABI,
  PreSaleEarthContractABI,
  PreSaleSunContractABI,
} from "../utils/abs/abs";
import config from "../config/config";
import PlanetDetailCard from "../components/PreLaunch/PlanetDetailCard";
import PrelaunchFooterArea from "../components/PreLaunch/PrelaunchFooterArea";

function LandingPage(props) {
  const [moonRemaining, setmoonRemaining] = useState(0);
  const [earthRemaining, setearthRemaining] = useState(0);
  const [showBanner, setShowBanner] = useState(true);

  const { user } = props.userinfo;
  const { web3 } = props?.main;

  function padLeadingZeros(num, size) {
    if (!size || size < 0) size = 0;
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }

  useEffect(() => {
    fetchAllRemaing(web3?.desiredChainId);
  }, [web3?.desiredChainId]);

  const fetchAllRemaing = async (chainId) => {
    fetchRemainig("moon", chainId);
    fetchRemainig("earth", chainId);
  };

  const fetchRemainig = async (tokenId, chainId = 1) => {
    let web3 = new Web3(config.infure[chainId]);
    const configs = getContractConfig(tokenId, chainId);
    let contract = await new web3.eth.Contract(configs.abi, configs.address);
    let data = await contract.methods.balance().call();
    data = data ? Number(data) : 0;
    if (tokenId === "moon") setmoonRemaining(data);
    if (tokenId === "earth") setearthRemaining(data);
  };

  const getContractConfig = (tokenId = "moon", chainId) => {
    switch (tokenId) {
      case "moon":
        return {
          address: config.preSale[chainId]?.[tokenId],
          abi: PreSaleMoonContractABI,
        };
      case "sun":
        return {
          address: config.preSale[chainId]?.[tokenId],
          abi: PreSaleSunContractABI,
        };
      case "earth":
        return {
          address: config.preSale[chainId]?.[tokenId],
          abi: PreSaleEarthContractABI,
        };
    }
  };

  const handleCloseClick = (e) => {
    setShowBanner(false);
  };

  return (
    <>
      {showBanner && (
        <div className="header-prelaunch">
          PolyOne Marketplace Launching 3.21 🚀 Get on the List
          <button onClick={() => handleCloseClick()} className="dismissHeader">
            X
          </button>
        </div>
      )}

      <div className="landing-page">
        <nav
          className="navbar fixed-top dark"
          style={{
            top: showBanner ? "45px" : "0px",
          }}
        >
          <div className="container navbar-container">
            <div className="col-sm-4">
              <Link href="/">
                <a className="navbar-brand">
                  <img
                    className="logo"
                    src="/images/landing-page/Logo.png"
                    alt="image"
                  />
                </a>
              </Link>
            </div>
            <div className="col-sm-8 d-flex justify-content-end">
              <div className="header-link ">
                <a
                  target="_blank"
                  className="hide-mobile"
                  href="https://instagram.com/"
                >
                  {/* <i className="ri-instagram-fill header-icon"></i> */}
                  <img src="/images/instagram.svg"></img>
                </a>

                <a
                  className="hide-mobile"
                  target="_blank"
                  href="http://twitter.com/polyoneNFT"
                >
                  {/* <i className="ri-twitter-fill header-icon"></i> */}
                  <img src="/images/twitter.svg"></img>
                </a>
                <a
                  className="hide-mobile"
                  target="_blank"
                  href="https://discord.com/"
                >
                  <img src="/images/discord.svg"></img>
                </a>
                <span>
                  <WalletButton />
                </span>
              </div>
            </div>
          </div>
        </nav>
        <header>
          <section className="header-content">
            {/* <img
            src="https://cssanimation.rocks/levelup/public/images/rocky-dashed.svg"
            className="rocky-dashed"
          /> */}
            <h1 className="header-title mt-5">
              PolyOne<sub>Marketplace</sub>
            </h1>
            <h3 className="header-subtitle">Pre-launch</h3>
            <h4 className="mb-5">
              Discover Polyone NFT Marketplace
              <br />
              Pre-launch Ticket Access{" "}
            </h4>
            <div className="btn-container d-flex">
              {!user?.walletAddress && (
                <button
                  onClick={() => {
                    props?.openConnectModal(true);
                  }}
                  className="button btn-grad ml-5"
                >
                  Connect Wallet <i className="ri-arrow-right-line icon"></i>
                </button>
              )}
              <Link href="/mint-nft">
                <a className="button btn-white m-1 mt-0 mb-0">
                  Reserve an XOplanet
                </a>
              </Link>
            </div>
          </section>
        </header>

        <section className="background">
          <div className="container">
            <div className="row">
              <h1 className="text-center section-heading  m-5">
                Polyone exo-planet <br /> collection
              </h1>
              <div className="col-lg-7 mt-5">
                <div className="card-container d-flex">
                  <div
                    style={{
                      backgroundImage:
                        "url(/images/landing-page/background.png)",
                    }}
                    className="card-1"
                  >
                    <div className="card-header m-3 d-flex justify-content-between">
                      <img src="/images/favicon.png" alt="Image"></img>
                      <i className="ri-more-fill"></i>
                    </div>
                    <a className="connect-btn-2">
                      Planet earth #
                      {padLeadingZeros(
                        1112 - earthRemaining,
                        4 - (1112 - earthRemaining).toString().length
                      )}
                    </a>
                  </div>
                  <div
                    style={{
                      backgroundImage:
                        "url(/images/landing-page/Rectangle.png)",
                    }}
                    className="card-2"
                  >
                    <div className="card-header m-3 d-flex justify-content-between">
                      <img src="/images/favicon.png" alt="Image"></img>
                      <i className="ri-more-fill"></i>
                    </div>
                    <a className="connect-btn-2">
                      Planet moon #
                      {padLeadingZeros(
                        1112 - moonRemaining,
                        4 - (1112 - moonRemaining).toString().length
                      )}
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-lg-5 mt-5 font-rubik">
                <div className="position-relative">
                  <h1 className="section-subtitle">
                    Use all the features of PolyOne Exo-Planet Tickets
                  </h1>
                  <img
                    className="position-absolute underline"
                    src="/images/landing-page/line.svg"
                  ></img>
                </div>
                <p className="section-para mt-3">
                  Ticket holders will be <b>Greenlisted</b> on the{" "}
                  <b>PolyOne Marketplace</b> and will benefice of special
                  rewards such as Free minting, pre—access to drops and special
                  launch, Free Airdrops, access to our NFT incubator studios and
                  much more...
                </p>
                <div className="list-group mt-4">
                  <a
                    href="#"
                    className="list-group-item list-group-item-action flex-column align-items-start list-active"
                  >
                    <div className="d-flex w-100 justify-content-between ">
                      <h5 className="mb-1">1. Rewards</h5>
                    </div>
                    <p className="mb-1">
                      Greenlisted holders will have access to multiple rewards,
                      airdrops and lRL access to PolyOne Spaces.
                    </p>
                  </a>
                  <a
                    href="#"
                    className="list-group-item list-group-item-action flex-column align-items-start list-inactive"
                  >
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">2. Green Listing</h5>
                    </div>
                  </a>
                  <a
                    href="#"
                    className="list-group-item list-group-item-action flex-column align-items-start list-inactive"
                  >
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">3. Sell & Secondary Market</h5>
                    </div>
                  </a>
                  <a
                    href="#"
                    className="list-group-item list-group-item-action flex-column align-items-start list-inactive"
                  >
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">4. Buy</h5>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="container  mt-5">
            <div className="row">
              <div className="col-lg-12">
                <h1 className="text-center section-heading  mt-5">
                  Reserve a planet
                </h1>
                <div className="position-relative custom-heading">
                  <h1 className="text-center font-rubik   m-3">
                    Reserve an XOplanet
                  </h1>
                  <img
                    className="position-absolute"
                    src="/images/landing-page/circle.svg"
                  ></img>
                  <p className="text-center font-rubik mt-5 mb-5">
                    Buying a Polyone Pre—Launch NFT Ticket, means you will get
                    one of our <span className="tag pink">Earth</span>{" "}
                    <span className="tag violet">Sun</span> or{" "}
                    <span className="tag orange">Moon</span> <br />
                    Planets Ticket from it. Each Planets comes in from a 1111
                    items collection.
                  </p>
                </div>
              </div>

              <div className="col-md-4 font-rubik mt-5">
                <PlanetDetailCard token={"earth"} />
              </div>

              <div className="col-md-4 font-rubik mt-5">
                <PlanetDetailCard token={"moon"} />
              </div>

              <div className="col-md-4 font-rubik mt-5">
                <PlanetDetailCard token={"sun"} />
              </div>
            </div>
          </div>

          <div className="container mt-5">
            <div className="row">
              <h1 className="text-center section-heading  m-5">Who are we ?</h1>
              <div className="col-lg-5 mt-5 font-rubik">
                <div className="">
                  <h1 className="section-subtitle">
                    What is
                    <br />
                    PolyOne NFT Marketplace?
                  </h1>
                  <img
                    className="hide-mobile"
                    src="/images/landing-page/curved-line.svg"
                  ></img>
                </div>
                <p className="section-para mt-5 pe-5">
                  <b>PolyOne</b> is a unique project built around the Ethereum
                  blockchain. It's a NFT Marketplace where artits can create,
                  upload, earn and sale on a Multi-chain platform with Ethereum.
                  Polygon, and much more.
                  <br />
                  PolyOne Marketplace advanced art and high—end technology meet
                  each other. For this marketplace creation, we gathered partner
                  such as Trendland, BrawHaus and Parlor Gallery to bring the
                  best in Digital art.
                </p>
              </div>
              <div className="col-lg-7 mt-5">
                <img
                  src="/images/landing-page/who-we-are.png"
                  className="img-fluid"
                  alt="Image"
                ></img>
              </div>
            </div>
          </div>

          <div className="container mb-5 road-map-container">
            <div className="row">
              <div className="col-6 col  mt-5">
                <div className="">
                  <h1 className="road-map-title section-heading ">Road Map</h1>
                  <h2 className="road-map-subtitle font-rubik">
                    <i>
                      PolyOne Marketplqce <br />+ Exo-Planet NFTs;
                    </i>
                  </h2>
                </div>
              </div>
              <div className="col-6 col mt-5 position-relative">
                <div className="road-map-content content-1">
                  <h1>2.22.22</h1>
                  <h2>Exo-Planets Minting Ticket launch</h2>
                </div>
                <div className="road-map-content content-2">
                  <h1>3.21.22</h1>
                  <h2>PolyOnellFT Marketplace launch + Erbil Project</h2>
                </div>
                <div className="road-map-content content-3">
                  <h1>4.4.22</h1>
                  <h2>4th Eixo-Planet NFT + Airdrops</h2>
                </div>
                <div className="road-map-content content-4">
                  <h1>5.5.22</h1>
                  <h2>Introduction of our Charity Partners</h2>
                </div>
                <div className="road-map-content content-5">
                  <h1>Q12023</h1>
                  <h2>Planets Metaverse Launch</h2>
                </div>
              </div>
            </div>
          </div>

          <div className="container discord-container mt-5 mb-5">
            <div className="row">
              <h1 className="text-center section-heading  mt-5">Follow Us</h1>
              <h2 className="text-center ">On social network</h2>
              <div className="icon-container text-center mt-3">
                <a href="http://twitter.com/polyoneNFT" target="_blank">
                  <img
                    className="img-fluid"
                    src="/images/landing-page/twitter.svg"
                  ></img>
                </a>

                <img
                  className="img-fluid"
                  src="/images/landing-page/facebook.svg"
                ></img>

                <a href="https://instagram.com/" target="_blank">
                  <img
                    className="img-fluid"
                    src="/images/landing-page/instagram.svg"
                  ></img>
                </a>
              </div>
              <div className="col-lg-12 mt-5 font-rubik discord-container-col">
                <div className="row">
                  <div className="my-auto col-6">
                    <img
                      className="mb-4 discord-logo"
                      src="/images/landing-page/discord.svg"
                    ></img>
                    <h1 className="section-subtitle">
                      Don't miss out on all the action here
                    </h1>
                    <a
                      href="https://discord.com/"
                      target="_blank"
                      type="button"
                      className="discord-btn"
                    >
                      <i className="ri-discord-fill" />
                      Join our Discord
                    </a>
                  </div>
                  <div className="my-auto col-6">
                    <img
                      src="/images/landing-page/planet.png"
                      className="img-fluid"
                      alt="Image"
                    ></img>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mobile-only">
            <div className="row">
              <h1 className="text-center section-heading  m-5"> Subscribe </h1>
              <h1 className="section-subtitle mt-3 mb-3 font-rubik subscribe-text">
                Subscribe to get our latest Drops, Fresh news 84 Artists
                features...
              </h1>
              <div className="col mt-3 font-rubik subcription">
                <div className=""></div>
                <form>
                  <button type="button">Subscribe!</button>
                  <input placeholder="Email"></input>
                </form>
              </div>
              <div className="col mt-3 font-rubik">
                <div className="subcription-card">
                  <img
                    src="/images/landing-page/logo.png"
                    className="mx-auto d-block logo-image"
                  ></img>
                  <h4 className="text-center ">NFT Marketplace</h4>
                  <hr></hr>
                  <h2>
                    Reserve a Planet <br />
                    Become a creator <br />
                    Contact
                  </h2>
                  <img className="favicon" src="/images/favicon.png"></img>
                </div>
              </div>
            </div>
          </div>
          <PrelaunchFooterArea></PrelaunchFooterArea>
        </section>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return { userinfo: state.user, main: state.main };
};

const mapDispatchToProps = { openConnectModal };
export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
