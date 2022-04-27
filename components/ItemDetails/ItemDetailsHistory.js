import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { MarketplaceContractABI } from "../../utils/abs/abs";
import config from "../../config/config";
import { useRouter } from "next/router";
import moment from "moment";
import { CHAINS } from "../../chains.ts";
import Link from "next/link";
import { walletShotener } from "../../utils/wallet";

const ItemDetailsHistory = ({ token, userinfo, main }) => {
  const [history, sethistory] = useState([]);
  const router = useRouter();
  const { user, allUsersHash } = userinfo;
  const { web3 } = main;
  const { provider, account } = web3;
  const desiredChainId = token?.blockchainChainId || 1;

  const fetchTokenSold = async (contractTokenId, event) => {
    try {
      let web3 = new Web3(config.infure[desiredChainId]);
      let contract = await new web3.eth.Contract(
        MarketplaceContractABI,
        config.contractDetails[desiredChainId].marketplaceContractAddress
      );
      let data = await contract.getPastEvents(event, {
        filter: { tokenId: contractTokenId },
        fromBlock: 10292848,
        toBlock: "latest",
      });
      if (data?.length) return data;
      return [];
    } catch (error) {
      if (typeof error?.message === "string") toast.error(error?.message);
      else toast.error(error?.response?.data?.msg || "Something went wrong");
    }
  };

  const handleHistory = async (contractTokenId) => {
    let TokenListed = await fetchTokenSold(contractTokenId, "TokenListed");
    let TokenDelisted = await fetchTokenSold(contractTokenId, "TokenDelisted");
    let PlaceBid = await fetchTokenSold(contractTokenId, "PlaceBid");
    let TokenSold = await fetchTokenSold(contractTokenId, "TokenSold");
    let array = [...TokenListed, ...TokenDelisted, ...PlaceBid, ...TokenSold];
    array = array.sort((a, b) => b.blockNumber - a.blockNumber);
    sethistory(array);
  };

  useEffect(() => {
    if (token?.contractTokenId) handleHistory(token?.contractTokenId);
  }, [token?.contractTokenId]);

  if (!history?.length) return null;
  return (
    <>
      <div className="item-details-content">
        <h3 className="text-light">History</h3>
        <div className="item-details-into">
          <div className="row">
            {history.map((value, index) => (
              <>
                {value?.event === "TokenSold" && (
                  <TokenSoldView
                    key={index}
                    value={value}
                    chainId={desiredChainId}
                    allUsersHash={allUsersHash}
                  />
                )}
                {value?.event === "TokenListed" && (
                  <ListView
                    key={index}
                    value={value}
                    chainId={desiredChainId}
                    allUsersHash={allUsersHash}
                  />
                )}
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

function ListView({ value, chainId, allUsersHash }) {
  let web3 = new Web3(config.infure[chainId]);
  let props = {
    event: `Listing on: ${
      value?.returnValues?.saleType === "0" ? "Fixed Price" : "Timed Auction"
    }`,
    key: value?.blockNumber,
    avatar: allUsersHash[value?.returnValues?.tokenOwner]?.profilePic,
    time: moment(
      Number(value?.returnValues?.timeSold || 0) * 1000 || Date.now()
    ).format("HH:MM  MMMM DD, YYYY"),
    currency: CHAINS[chainId]?.currency,
    seller: {
      name: allUsersHash[value?.returnValues?.tokenOwner]
        ? allUsersHash[value?.returnValues?.tokenOwner].name
        : walletShotener(value?.returnValues?.tokenOwner),
      walletAddress: value?.returnValues?.tokenOwner,
    },
  };
  return <Details {...props} />;
}

function TokenSoldView({ value, chainId, allUsersHash }) {
  let web3 = new Web3(config.infure[chainId]);
  let props = {
    event: "Transfer",
    key: value?.blockNumber,
    avatar: allUsersHash[value?.returnValues?.toAddress]?.profilePic,
    time: moment(
      Number(value?.returnValues?.timeSold || 0) * 1000 || Date.now()
    ).format("HH:MM  MMMM DD, YYYY"),
    currency: CHAINS[chainId]?.currency,
    price: Number(web3.utils.fromWei(value?.returnValues?.value, "ether")),
    buyer: {
      name: allUsersHash[value?.returnValues?.toAddress]
        ? allUsersHash[value?.returnValues?.toAddress].name
        : walletShotener(value?.returnValues?.toAddress, 5),
      walletAddress: value?.returnValues?.toAddress,
    },
    seller: {
      name: allUsersHash[value?.returnValues?.fromAddress]
        ? allUsersHash[value?.returnValues?.fromAddress].name
        : walletShotener(value?.returnValues?.fromAddress, 5),
      walletAddress: value?.returnValues?.fromAddress,
    },
  };
  return <Details {...props} />;
}

function Details({ avatar, key, event, time, currency, seller, buyer, price }) {
  return (
    <div keys={key} className="item-details-card">
      <div className="d-flex" style={{ gridGap: "10px" }}>
        <div className="item-details-card-img">
          <img src={avatar || "/images/profile-picture.webp"} alt="Images" />
          {/* <i className="ri-check-line"></i> */}
        </div>
        <div className="item-details-card-content">
          <h3 className="truncate">
            {event}{" "}
            {buyer && (
              <>
                to{" "}
                <Link href={`/artist/${buyer?.walletAddress}`}>
                  <span role="button">@{buyer?.name}</span>
                </Link>
              </>
            )}
          </h3>
          <h6 className="text-light f-14 m-0 truncate">
            From{" "}
            <Link href={`/artist/${seller?.walletAddress}`}>
              <span role="button">@{seller?.name}</span>
            </Link>
          </h6>
        </div>
      </div>
      <div className="work-hours" style={{ textAlign: "right" }}>
        <div>{price ? `${price} ${currency}` : <div>&nbsp;</div>}</div>
        <div className="f-12">{time}</div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userinfo: state.user,
    main: state.main,
  };
};

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(ItemDetailsHistory);
