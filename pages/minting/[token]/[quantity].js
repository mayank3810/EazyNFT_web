import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Link from "next/link";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Web3 from "web3";

// import useActiveWeb3React from "../../../hooks/useActiveWeb3React";
import config from "../../../config/config";
import {
  PreSaleMoonContractABI,
  PreSaleSunContractABI,
  PreSaleEarthContractABI,
} from "../../../utils/abs/abs";
import { setConfetti } from "../../../redux/actions/main";
import { openConnectModal } from "../../../redux/actions/main";
import Navbar from "../../../components/Layout/Navbar";
import Footer from "../../../components/Layout/Footer";
import Copyright from "../../../components/Common/Copyright";

const pic = {
  moon: "Rectangle",
  sun: "Rectangle",
  earth: "planet-2",
};

function Minting(props) {
  // const { account, library } = useActiveWeb3React();
  const [isLoading, setisLoading] = useState(false);
  const [isMinting, setisMinting] = useState(true);
  const [error, seterror] = useState("");
  const { query } = useRouter();

  const [remaining, seRemaining] = useState(0);
  const { user } = props.userinfo;
  const { web3 } = props?.main;
  const { provider, desiredChainId, account } = web3;

  const fetchRemainig = async (tokenId, chainId) => {
    let web3 = new Web3(config.infure[chainId]);
    const configs = getContractConfig(tokenId, chainId);
    let contract = await new web3.eth.Contract(configs.abi, configs.address);
    let data = await contract.methods.balance().call();
    data = data ? Number(data) : 0;
    data = 1112 - data;
    seRemaining(padLeadingZeros(data, 4 - data.toString().length));
  };

  function padLeadingZeros(num, size) {
    if (!size || size < 0) size = 0;
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }

  useEffect(() => {}, []);

  useEffect(async () => {
    if (
      query?.token &&
      query?.quantity &&
      provider &&
      desiredChainId &&
      account
    ) {
      handleBuy(desiredChainId, provider);
      fetchRemainig(query?.token, desiredChainId);
    }
  }, [query, provider, desiredChainId, account]);

  const handleBuy = async (chainId, _provider) => {
    try {
      if (isLoading) return;
      setisLoading(true);
      setisMinting(true);
      seterror("");
      const tokenQuantity = query?.quantity;
      let totalPrice = (tokenQuantity * 0.3).toString();
      const signer = _provider.getSigner();
      totalPrice = ethers.utils.parseEther(totalPrice);
      // let _web3 = new Web3(config.infure[chainId]);
      // let _bumba = Number(_web3.utils.fromWei(totalPrice.toString(), "ether"));
      const tx = {
        from: account,
        to: ethers.utils.getAddress(
          "0xcE187fEEF192c4D1c8aE7beC7Cd89e3278f8872D"
        ),
        value: totalPrice,
        nonce: await _provider.getTransactionCount(account, "latest"),
      };
      const transaction = await signer.sendTransaction(tx);
      // const _saveNFT = {
      //   walletAddress: user?.walletAddress,
      //   signature: user?.signature,
      //   tokenId: token?.tokenId,
      //   contractTokenId: token?.contractTokenId,
      //   action: "buy",
      // };
      // await API.buyNFT(_saveNFT);
      await transaction.wait();
      props.setConfetti(true);
      // fetchTokenDetails(token?.tokenId);
      toast.success("NFT reserved successfully");
      setisLoading(false);
      setisMinting(false);
    } catch (error) {
      setisLoading(false);
      setisMinting(false);
      console.log(error);
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

  const getContractConfig = (tokenId = "moon", chainId = 1) => {
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

  return (
    <>
      <Navbar />
      <section className="trending-area" style={{ minHeight: "70vh" }}>
        <div className="container margin-custom">
          <div className="row">
            <div className="col-12 d-flex mb-5">
              <div className="col-lg-6 ">
                <h3 className="minting-title text-center">
                  {query?.token} #{remaining}
                </h3>
              </div>
              <div className="col-lg-6"></div>
            </div>
            <div className="col-lg-6 d-flex justify-content-center">
              <div
                style={{
                  backgroundImage: `url(/images/landing-page/${
                    pic[query?.token]
                  }.png)`,
                }}
                className="card-container pre-sale-card-image d-flex"
              >
                <div className="card-custom">
                  <div className="card-header m-3">
                    <img src="/images/favicon.png" alt="Image"></img>
                  </div>
                  <a className="connect-btn-2">
                    Planet {query?.token} #{remaining}
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

            <div className="col-lg-6 d-flex justify-content-center">
              <div className="d-flex justify-content-center align-items-center">
                <div className="position-relative">
                  {isMinting ? (
                    <>
                      <h1 className="section-subtitle">
                        Your Certificate is being reserved
                      </h1>
                      <img
                        className="position-absolute underline"
                        src="/images/landing-page/line-2.svg"
                      ></img>
                    </>
                  ) : error ? (
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
                        onClick={() => handleBuy(desiredChainId, provider)}
                      >
                        Try Aagin
                      </button>
                      <Link href="/">
                        <button role="button" className="default-btn mt-5 ml-2">
                          Cancel
                        </button>
                      </Link>
                    </div>
                  ) : (
                    <div className="text-center">
                      <h1 className="section-subtitle">
                        Your Certificate is successfully reserved
                      </h1>
                      <Link href="/">
                        <button className="default-btn mt-5">Home</button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Copyright />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    name: state.main.name,
    userinfo: state.user,
    main: state.main,
    collection: state.collectibles,
  };
};

const mapDispatchToProps = {
  setConfetti,
  openConnectModal,
};
export default connect(mapStateToProps, mapDispatchToProps)(Minting);
