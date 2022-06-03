import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import Link from "next/link";
import Web3 from "web3";

import WalletButton from "../components/CollectWallet/WalletButton";
import { setConfetti } from "../redux/actions/main";
import {
  PreSaleEarthContractABI,
  PreSaleSunContractABI,
  PreSaleMoonContractABI,
  PreSaleExpoContractABI,
} from "../utils/abs/abs";
import config from "../config/config";
import PlanetDetailCard from "../components/PreLaunch/PlanetDetailCard";
// import useActiveWeb3React from "../hooks/useActiveWeb3React";
import { openConnectModal } from "../redux/actions/main";
import { ethers } from "ethers";
import PrelaunchFooterArea from "../components/PreLaunch/PrelaunchFooterArea";
import { useRouter } from "next/router";
import API from "../services/API";
import { CHAINS } from "../chains.ts";
import Navbar from "../components/Layout/Navbar";
import Copyright from "../components/Common/Copyright";
import Asset from "../components/Image/Asset";
import { LogoutUser } from "../redux/actions/user";
// import { supportedChain } from "../utils/connectors";

function MintPage(props) {
  const [isLoading, setisLoading] = useState(false);
  const [error, seterror] = useState("");

  const { web3 } = props?.main;
  const { user } = props?.userinfo;
  const ethPrice =
    props?.main?.ethPrice[web3?.networkDetails?.currency || "ETH"];
  const { account, desiredChainId, provider } = web3;
  const [tokenDetail, settokenDetail] = useState({});
  const [planetList, setplanetList] = useState(["moon", "earth", "sun"]);
  const [nftCount, setnftCount] = useState(1);
  const [planetBalance, setplanetBalance] = useState(0);
  const [limitError, setlimitError] = useState(false);
  const [successfullyreserved, setsuccessfullyreserved] = useState(false);
  const { query, asPath } = useRouter();
  let { id } = query;
  if (asPath == "/mint-nft") id = "earth";
  else if (id && !planetList.includes(id)) id = "earth";

  useEffect(() => {
    setsuccessfullyreserved(false);
    if (id) fetchTokenDetails(id);
  }, [id]);

  useEffect(() => {
    if (user?.walletAddress && id) getUserBalance();
  }, [user?.walletAddress, id]);

  const getUserBalance = async () => {
    setlimitError(false);
    let response = await API.getUserPreLaunchBalance({ tokenId: id });
    if (response.data == 5) setnftCount(0);
    else if (nftCount > 5 - response.data) setnftCount(5 - response.data);
    setplanetBalance(response.data);
  };

  const fetchTokenDetails = async (token) => {
    let response = await API.getPreLaunchToken(token);
    settokenDetail(response?.data);
  };

  const checkValidations = () => {
    debugger;
    if (!props?.userinfo?.user?.walletAddress) {
      props?.openConnectModal(true);
      return true;
    } else if (!provider) {
      props.LogoutUser();
      web3?.connector?.deactivate();
      setTimeout(() => {
        props?.openConnectModal(true);
      }, 500);
      return true;
    } else if (desiredChainId != tokenDetail?.blockchainChainId) {
      toast.error(
        `Wrong Network: Please change to ${
          CHAINS[tokenDetail?.blockchainChainId]?.name
        }`
      );
      return true;
    } else if (nftCount > 5 - planetBalance) {
      toast.error(`You can reserve upto 5 ${id} planet`);
      return true;
    }
    return false;
  };

  const handleMint = async () => {
    try {
      if (checkValidations()) return;
      setisLoading(true);
      setsuccessfullyreserved(false);
      seterror("");
      const tokenQuantity = nftCount;
      let totalPrice = (tokenQuantity * 0.3).toString();
      totalPrice = ethers.utils.parseEther(totalPrice);
      const signer = provider.getSigner();
      const tx = {
        from: account,
        to: ethers.utils.getAddress(tokenDetail?.ownerAddress),
        value: totalPrice,
        nonce: await provider.getTransactionCount(account, "latest"),
      };
      const transaction = await signer.sendTransaction(tx);
      await transaction.wait();
      let object = {
        tokenId: id,
        hash: transaction?.hash,
        chainId: desiredChainId,
        walletAddress: account,
      };

      await API.buyPreLaunch(object);
      setsuccessfullyreserved(true);
      fetchTokenDetails(id);
      getUserBalance();
      props.setConfetti(true);
      toast.success("NFT reserved successfully");
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
      if (error?.message?.includes("nsufficient"))
        error.message = "Insufficient balance";
      seterror(
        error?.message?.replace("MetaMask Tx Signature:", "") ||
          "Something went wrong"
      );
      toast.error(
        error?.message?.replace("MetaMask Tx Signature:", "") ||
          "Something went wrong"
      );
    }
  };

  const handleValue = (e) => {
    if (e === "add") {
      if (nftCount === 5 - planetBalance) {
        setlimitError(true);
        return;
      }
      setnftCount(nftCount + 1);
    } else if (nftCount !== 1) {
      setnftCount(nftCount - 1);
    }
    setlimitError(false);
  };

  function padLeadingZeros(num, size) {
    if (!size || size < 0) size = 0;
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }

  return (
    <>
      <Navbar />
      <section className="bg-darker pt-20">
        <div className="container margin-custom">
          <div className="row">
            <div className="col-12 d-flex row mb-5">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <h3 className="font-druk text-center">
                  RESERVE YOUR <span className="text-capitalize">{id}</span>
                  -PLANET
                </h3>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <h3 className="font-druk text-center">
                  <span className="text-capitalize">{id}</span> #
                  {padLeadingZeros(
                    tokenDetail?.totalCopies - tokenDetail?.available,
                    3
                  )}
                </h3>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 d-flex justify-content-center">
              <div
                // style={{
                //   backgroundImage: `url(${tokenDetail?.contentSrc})`,
                // }}
                className="d-flex"
              >
                <div className="card-custom">
                  <Asset
                    type={tokenDetail?.contentType || "image"}
                    imageSrc={tokenDetail?.contentSrc}
                    thumbnail={tokenDetail?.contentSrc}
                    videoSrc={[tokenDetail?.contentSrc]}
                    objectFit="cover"
                  />
                  <div className="card-header m-3">
                    <img src="/images/favicon.png" alt="Image"></img>
                  </div>
                  <a className="connect-btn-2">
                    Planet{" "}
                    <span className="text-capitalize">
                      <span className="text-capitalize">{id}</span>
                    </span>{" "}
                    #
                    {padLeadingZeros(
                      tokenDetail?.totalCopies - tokenDetail?.available,
                      3
                    )}
                  </a>
                </div>
                {/* <div
                  style={{
                    backgroundImage: "url(/images/landing-page/Rectangle.png)",
                  }}
                  className="card-2"
                >
                  <div className="card-header m-3 d-flex justify-content-between">
                    <img src="/images/favicon.png" alt="Image"></img>
                    <i className="ri-more-fill"></i>
                  </div>
                  <a className="connect-btn-2">Planet earth #001</a>
                </div> */}
              </div>
            </div>

            <div className="col-lg-6 col-md-6 d-flex justify-content-center ">
              {isLoading || error ? (
                <div className="d-flex justify-content-center align-items-center">
                  <div className="position-relative">
                    {isLoading ? (
                      <>
                        <h1 className="section-subtitle">
                          Your NFT is being reserved
                        </h1>
                        <img
                          className="position-absolute underline"
                          src="/images/landing-page/line-2.svg"
                        ></img>
                      </>
                    ) : (
                      <div className="text-center">
                        <h4
                          style={{ fontSize: "30px" }}
                          className="section-subtitle"
                        >
                          {error}
                        </h4>
                        <button
                          role="button"
                          className="default-btn mt-5"
                          onClick={() => handleMint()}
                        >
                          Try Aagin
                        </button>
                        <button
                          role="button"
                          className="default-btn mt-5 ml-2"
                          onClick={() => seterror("")}
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : successfullyreserved ? (
                <div className="text-center complete-center">
                  <h1 className="section-subtitle" style={{ fontSize: "25px" }}>
                    Congratulation your NFT has been Minted!
                  </h1>
                  <div className="d-flex justify-content-between">
                    <Link href="/discover">
                      <button className="default-btn mt-5">
                        View Dashboard
                      </button>
                    </Link>
                    <Link href="/">
                      <button className="default-btn mt-5 ml-3">
                        Homepage
                      </button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="d-flex justify-content-center w-100">
                  <div className="pricing-table price-table-custom position-relative handle-radius">
                    <div className="price-tag">
                      <span className="amount">
                        {tokenDetail?.price || (0).toFixed(2)}
                      </span>
                      <span className="after">
                        {tokenDetail?.blockchainCurrency}
                      </span>
                    </div>
                    <span className="table-list">
                      Access to PolyOne Marketplace
                    </span>
                    <span className="table-list">Pre-Drops Exclusivity</span>
                    <span className="table-list">
                      Pre-Access to NFT Marketplace
                    </span>
                    <span className="table-list mb-3">
                      IRL access to PolyOne Studios
                    </span>

                    <div className="counter">
                      <span
                        className="action-btn"
                        onClick={() => handleValue("subtract")}
                      >
                        <i className="ri-subtract-fill"></i>
                      </span>
                      <span className="result">{nftCount}</span>
                      <span
                        className="action-btn"
                        onClick={() => handleValue("add")}
                      >
                        <i className="ri-add-fill"></i>
                      </span>
                    </div>

                    <p className="pricing-message">
                      {limitError ? (
                        <span>
                          Maximum 5 Planets can be reserve per wallet.
                        </span>
                      ) : (
                        <span>&nbsp;</span>
                      )}
                    </p>

                    <div className="pricing-features">
                      <div className="feature mb-5">
                        Total
                        <span>
                          {Number((nftCount * tokenDetail?.price).toFixed(2))}{" "}
                          {tokenDetail?.blockchainCurrency}
                          <br />
                          <span className="total-cost">
                            $
                            {(nftCount * tokenDetail?.price * ethPrice).toFixed(
                              2
                            )}
                          </span>
                        </span>
                      </div>
                      <a
                        className="button btn-grad"
                        onClick={() => handleMint()}
                      >
                        Reserve
                      </a>
                    </div>
                    <p className="feature text-center mt-4">
                      <b>
                        {tokenDetail?.available}/{tokenDetail?.totalCopies}
                      </b>{" "}
                      &nbsp; Planets left
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="col-12 row content-custom justify-content-center mt-5">
              <div className="col d-flex justify-content-center col-lg-6 col-md-12">
                <div className="position-relative">
                  <h1 className="section-subtitle">
                    Use all the features of PolyOne NFT Planet Tickets
                  </h1>
                  <img
                    className="position-absolute underline"
                    src="/images/landing-page/line.svg"
                  ></img>
                </div>
              </div>
              <div className=" d-flex justify-content-center col-lg-6 col-md-12">
                <p className="section-para">
                  Ticket holders will be <b>Greenlisted</b> on the{" "}
                  <b>PolyOne Marketplace</b> and will benefice of special
                  rewards such as Free minting, pre—access to drops and special
                  launch, Free Airdrops, access to our NFT incubator studios and
                  much more...
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="container mt-5 mb-5 pb-5"
          style={{ borderTop: "1px solid #00FF47" }}
        >
          <div className="row mt-5">
            <div className="col-lg-12 mt-5">
              {/* <h1 className="text-center section-heading  mt-5">
                Reserve a planet
              </h1> */}
              <div className="position-relative custom-heading">
                <h1 className="text-center    m-3">
                  Reserve your Other <br /> 2 Ticket Access
                </h1>
                <img
                  className="position-absolute"
                  src="/images/landing-page/circle.svg"
                ></img>
                {/* <p className="text-center  mt-5 mb-5">
                  Buying a Polyone Pre—Launch NFT Ticket, means you will get one
                  of our <spna className="tag pink">Earth</spna>{" "}
                  <spna className="tag violet">Sun</spna> or{" "}
                  <spna className="tag orange">Moon</spna> <br />
                  Planets Ticket from it. Each Planets comes in from a 1111
                  items collection.
                </p> */}
              </div>
            </div>
            <div className="row justify-content-around m-0 mt-5">
              {planetList.map((value, index) => {
                if (value != id)
                  return (
                    <div
                      key={index}
                      className="col-lg-4 col-md-6 col-sm-12 p-0 mt-5"
                    >
                      <PlanetDetailCard token={value} />
                    </div>
                  );
              })}
            </div>
            <div className="col-12">
              <div className="col-lg-8 col-md-8 col-sm-12 m-auto">
                <div className="section-para mt-5">
                  Ticket holders of the <b>3 EXO-PLANETS </b> (earth+moon+sun)
                  will be <b>Greenlisted </b>on the PolyOne Marketplace for
                  life. You will have special rewards such as Free minting,
                  pre-access to drops + special launch, Free Airdrops,
                  invitations to invite other artists, access to our NFT
                  incubator studios and much more...
                </div>
              </div>
            </div>
          </div>
        </div>
        <Copyright />
      </section>
    </>
  );
}

const mapStateToProps = (state) => {
  return { userinfo: state.user, main: state?.main };
};

const mapDispatchToProps = { openConnectModal, setConfetti, LogoutUser };
export default connect(mapStateToProps, mapDispatchToProps)(MintPage);
