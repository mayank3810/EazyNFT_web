import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import Web3 from "web3";

// import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import { openConnectModal } from "../../redux/actions/main";
import {
  PreSaleMoonContractABI,
  PreSaleEarthContractABI,
  PreSaleSunContractABI,
} from "../../utils/abs/abs";
import config from "../../config/config";
import { CHAINS } from "../../chains.ts";
import API from "../../services/API";
import moment from "moment";
import Asset from "../Image/Asset";

function PlanetDetailCard({ token, openConnectModal, main, userinfo }) {
  const router = useRouter();
  const [tokenDetail, settokenDetail] = useState({});
  const { web3 } = main;
  const { user } = userinfo;
  const _currentTime = Date.now();

  useEffect(() => {
    if (token) fetchTokenDetails(token);
  }, []);

  const fetchTokenDetails = async (token) => {
    let response = await API.getPreLaunchToken(token);
    settokenDetail(response?.data);
  };

  const handleColor = () => {
    switch (token) {
      case "moon":
        return "violet";
      case "sun":
        return "orange";
      case "earth":
        return "pink";
    }
  };

  const handleClick = () => {
    if (!user?.walletAddress) {
      openConnectModal(true);
    } else if (web3.desiredChainId != tokenDetail?.blockchainChainId) {
      toast.error(
        `Wrong Network: Please change to ${
          CHAINS[tokenDetail?.blockchainChainId]?.name
        }`
      );
    } else if (user?.walletAddress) {
      if (true) router.push(`/mint-nft?id=${token}`);
    }
  };

  return (
    <>
      <div className="planet-card">
        <div
          // style={{
          //   backgroundImage: `url("${tokenDetail.contentSrc}")`,
          // }}
          className="planet-card-conatiner"
        >
          <Asset
            type={tokenDetail.contentType || "image"}
            imageSrc={tokenDetail.contentSrc}
            thumbnail={tokenDetail.contentSrc}
            videoSrc={[tokenDetail.contentSrc]}
            objectFit="cover"
          />
          <div className="planet-card-header">
            <img src="/images/favicon.png" className="planet-author-img"></img>
          </div>
          <div
            onClick={() => handleClick()}
            className="planet-card-footer cursor-pointer"
          >
            <span>
              <span className="text-capitalize">{token}</span>{" "}
              {tokenDetail?.price} {tokenDetail?.blockchainCurrency}
            </span>
          </div>
        </div>
      </div>
      <div className="pricing-table position-relative mt-5">
        <div className="price-tag mb-4">
          <span className={`tag ${handleColor()}`}>{token}</span>

          <span className="amount">{tokenDetail?.price}</span>
          <span className="after">{tokenDetail?.blockchainCurrency}</span>
        </div>

        <div className="pricing-features">
          <a
            className="button default-btn text-center border-radius-5 btn-reserve"
            onClick={() => handleClick()}
          >
            Reserve {token}
            <i className="ri-arrow-right-line icon"></i>
          </a>
        </div>
        <p className="feature text-center mt-5">
          <b>{tokenDetail?.available}</b> &nbsp; Planets left
        </p>
      </div>
      {tokenDetail?.saleStartAt && tokenDetail?.saleStartAt > _currentTime ? (
        <p className="message text-center mt-2">
          Sale Start on {moment(tokenDetail?.saleStartAt).format("MMMM Do")}
        </p>
      ) : (
        tokenDetail?.saleEndAt && (
          <p className="message text-center mt-3">
            Available Until {moment(tokenDetail?.saleEndAt).format("MMMM Do")}
          </p>
        )
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return { userinfo: state.user, main: state.main };
};

const mapDispatchToProps = {
  openConnectModal,
};
export default connect(mapStateToProps, mapDispatchToProps)(PlanetDetailCard);
