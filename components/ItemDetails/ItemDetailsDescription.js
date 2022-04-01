import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import moment from "moment";

import config from "../../config/config";
import { MarketplaceContractABI, PolyoneNFTABI } from "../../utils/abs/abs";
import { connect } from "react-redux";
import Web3 from "web3";
import { setConfetti, openConnectModal } from "../../redux/actions/main";
import { getAllUsers } from "../../redux/actions/user";
import Timer from "../Timer/Timer";
import { walletShotener } from "../../utils/wallet";
import { CHAINS } from "../../chains.ts";
import BuyNow from "./BuyNow";
import PlaceBid from "./PlaceBid";

const marketFilter = {
  "fixed-price": "Fixed Price",
  "timed-auction": "Timed Auction",
};

const ItemDetailsDescription = ({
  token,
  whishList,
  fetchTokenDetails,
  handleSaveButton,
  main,
  openConnectModal,
  userinfo,
  getAllUsers,
  updatesetselectedDeal,
}) => {
  const { web3, ethPrice } = main;
  const { provider, account } = web3;
  const [openObject, setopenObject] = useState({ listing: true });
  const [remianingListing, setremianingListing] = useState(0);
  const [listing, setlisting] = useState([]);
  const [auctionList, setauctionList] = useState([]);
  const [fixedList, setfixedList] = useState([]);
  const [selectedDeal, setselectedDeal] = useState({});
  const [avalablecount, setavalablecount] = useState(0);
  const { user, allUsersHash = {}, isUserEligible } = userinfo;
  const isOwner = account == selectedDeal?.owner;
  const desiredChainId = token?.blockchainChainId || 1;
  const _date = Date.now();
  const router = useRouter();
  const currentMoment = moment(_date);

  useEffect(() => {
    if (provider && token?.contractTokenId && user?.walletAddress) {
      handleGetListingBalance();
    }
  }, [provider, token?.contractTokenId, user?.walletAddress]);

  useEffect(() => {
    getTokenDetails(token?.contractTokenId);
  }, [token?.contractTokenId]);

  useEffect(() => {
    let list = [...auctionList, ...fixedList];
    list = list.sort((a, b) => a.currentPrice - b.currentPrice);

    if (list?.length) {
      setselectedDeal(list[0]);
      if (updatesetselectedDeal) updatesetselectedDeal(list[0]);
    }
    setlisting(list);
    let totalAvalable = 0;
    let newUserList = [];
    for (let i = 0; i < list?.length; i++) {
      totalAvalable += Number(list[i].quantity);
      if (!allUsersHash[list[i].owner]) newUserList.push(list[i].owner);
    }
    if (newUserList.length)
      getAllUsers({
        filter: {
          walletAddress: { $in: newUserList },
        },
      });
    setavalablecount(totalAvalable);
  }, [auctionList, fixedList]);

  const getTokenDetails = (contractTokenId) => {
    handleGetAllEnglishSaleItemsForToken(contractTokenId);
    handleGetAllStandardSaleItemsForToken(contractTokenId);
  };

  const handleGetAllStandardSaleItemsForToken = async (contractTokenId) => {
    try {
      let web3 = new Web3(config.infure[desiredChainId]);
      let contract = await new web3.eth.Contract(
        MarketplaceContractABI,
        config.contractDetails[desiredChainId].marketplaceContractAddress
      );
      let data = await contract.methods
        .getAllStandardSaleItemsForToken(contractTokenId)
        .call();

      let result = [];
      if (data?.length) {
        for (let i = 0; i < data?.length; i++) {
          let obj = [...data[i]];
          if (obj[5] != "0x0000000000000000000000000000000000000000") {
            obj[2] = Number(web3.utils.fromWei(obj[2], "ether"));
            result.push({
              quantity: obj[3],
              currentPrice: obj[2],
              _currentPrice: data[i][2],
              index: obj[4],
              isOrderActive: obj[6],
              owner: obj[5],
              timeOnsale: obj[1] * 1000,
              tokenId: obj[0],
              type: "fixed-price",
              id: Date.now() + Math.random() * 10000,
            });
          }
        }
      }
      setfixedList(result);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const handleGetAllEnglishSaleItemsForToken = async (contractTokenId) => {
    try {
      let currentTime = Date.now();
      let web3 = new Web3(config.infure[desiredChainId]);
      let contract = await new web3.eth.Contract(
        MarketplaceContractABI,
        config.contractDetails[desiredChainId].marketplaceContractAddress
      );
      let data = await contract.methods
        .getAllEnglishSaleItemsForToken(contractTokenId)
        .call();

      let result = [];
      if (data?.length) {
        for (let i = 0; i < data?.length; i++) {
          let obj = [...data[i]];
          if (
            obj[6] != "0x0000000000000000000000000000000000000000" &&
            Number(obj[2]) > currentTime
          ) {
            obj[4] = Number(web3.utils.fromWei(obj[4], "ether"));
            obj[3] = Number(web3.utils.fromWei(obj[3], "ether"));
            result.push({
              quantity: 1,
              currentBidder: obj[7],
              currentPrice: obj[4] || obj[3],
              index: obj[5],
              isOrderActive: obj[8],
              owner: obj[6],
              priceThreshhold: obj[3],
              priceThreshholdReached: obj[9],
              saleDuration: obj[2],
              timeOnsale: obj[1] * 1000,
              tokenId: obj[0],
              isFirstBid: obj[4] ? false : true,
              type: "timed-auction",
              id: Date.now() + Math.random() * 10000,
            });
          }
        }
      }
      setauctionList(result);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const handleGetListingBalance = async () => {
    let web3 = new Web3(config.infure[1]);
    let contract = await new web3.eth.Contract(
      PolyoneNFTABI,
      config.contractDetails[desiredChainId].polyoneContractAddress
    );
    let data = await contract.methods
      .balanceOf(user?.walletAddress, token?.contractTokenId)
      .call();
    setremianingListing(Number(data || 0));
  };

  const handleOpenObject = (key) => {
    const _openObject = { ...openObject };
    _openObject[key] = !_openObject[key];
    setopenObject(_openObject);
  };

  const handlesetselectedDeal = (value) => {
    setselectedDeal(value);
    if (updatesetselectedDeal) updatesetselectedDeal(list[0]);
    document.getElementById("main-container").scrollIntoView({
      behavior: "smooth",
    });
  };

  const isDropUpcoming = token.isDrop && _date < token?.dropDetails?.liveAt;

  return (
    <>
      <div id="main-container">
        <div className="position-relative d-flex">
          <div style={{ fontSize: "16px", fontWeight: 500 }}>
            {token?.isDrop
              ? "Drop"
              : marketFilter[token?.nftType] || "Open Editions"}
          </div>
          {whishList && (
            <div
              className={
                whishList[token?.tokenId]
                  ? "save-btn-inactive"
                  : "save-btn-active"
              }
              onClick={() => handleSaveButton()}
              role="button"
            >
              {whishList[token?.tokenId] ? "Unsave" : "Save"}
            </div>
          )}
        </div>
        <div className="nft-detail-title">{token?.title}</div>
      </div>

      <div className="row nft-detail-user-detail-section">
        <div className="col-lg-6">
          <div className="item-details-user m-0">
            <div className="content">
              <div>
                <div className="images">
                  <img
                    src={
                      token?.createdBy?.profilePic ||
                      "https://po-web-prod.vercel.app/images/profile-picture.webp"
                    }
                    alt="Artist"
                  />
                </div>
              </div>

              <Link href={`/artist/${token?.createdBy?.walletAddress}`}>
                <div>
                  <div className="f-18 font-weight-bold truncate" role="button">
                    {token?.createdBy?.username ||
                      token?.createdBy?.name ||
                      "Unnamed"}
                  </div>
                  <div className="font-weight-thin truncate f-14">
                    {allUsersHash[token?.createdBy?.walletAddress]?.followers ||
                      0}{" "}
                    followers
                  </div>
                </div>
              </Link>
            </div>
            <div className="f-14 ml-1 mt-2">Artist</div>
          </div>
        </div>
        {selectedDeal?.owner && (
          <div className="col-lg-6 _border">
            <div className="item-details-user m-0">
              <div className="content ">
                <div className="images">
                  <img
                    src={
                      allUsersHash[selectedDeal?.owner]?.profilePic ||
                      "https://po-web-prod.vercel.app/images/profile-picture.webp"
                    }
                    alt="Owner"
                  />
                </div>

                <Link href={`/artist/${token?.currentOwner?.walletAddress}`}>
                  <div>
                    <div
                      className="f-18 font-weight-bold truncate"
                      role="button"
                    >
                      {allUsersHash[selectedDeal?.owner]?.username ||
                        allUsersHash[selectedDeal?.owner]?.name ||
                        selectedDeal?.owner ||
                        "Unnamed"}
                    </div>
                    <div className="font-weight-thin truncate f-14">
                      {allUsersHash[selectedDeal?.owner]?.followers || 0}{" "}
                      followers
                    </div>
                  </div>
                </Link>
              </div>
              <div className="f-14 mt-2">Owner</div>
            </div>
          </div>
        )}
      </div>

      <div className="nft-detail-price-section">
        <div className="display-inline">
          <div className="f-14 mb-1">Available</div>
          <div>
            {avalablecount} of {token?.numberOfCopies || 1}
          </div>
        </div>
        {selectedDeal?.currentPrice && (
          <div className="display-inline">
            <div className="f-14 mb-1">
              {selectedDeal.type === "timed-auction"
                ? "Highest Bid"
                : "Current Price"}
            </div>
            <div>
              {Number(selectedDeal?.currentPrice).noExponents()}{" "}
              {CHAINS[desiredChainId].currency}{" "}
              <span className="text-light-green ml-2">
                {(
                  ethPrice[CHAINS[desiredChainId].currency] *
                  selectedDeal?.currentPrice
                ).toFixed(4)}{" "}
                USD
              </span>
            </div>
          </div>
        )}
      </div>

      <div
        className="nft-detail-price-section d-block"
        style={{ gridGap: "0" }}
      >
        {isDropUpcoming && (
          <div className="d-flex justify-content-between mb-2">
            <div style={{ minWidth: "130px" }}>
              <b>Auction Starts in</b>
            </div>
            <div role="button" className="truncate">
              <StartInTimer token={token} time={token?.dropDetails?.liveAt} />
            </div>
          </div>
        )}

        {selectedDeal?.saleDuration && selectedDeal?.type === "timed-auction" && (
          <div className="d-flex justify-content-between mb-2">
            <div style={{ minWidth: "130px" }}>
              <b>Auction Ends in</b>
            </div>
            <div role="button" className="truncate">
              <StartInTimer token={token} time={selectedDeal.saleDuration} />
            </div>
          </div>
        )}

        <div className="d-flex justify-content-between mb-2">
          <div style={{ minWidth: "130px" }}>
            <b>Collection</b>
          </div>
          <div
            role="button"
            className="truncate"
            onClick={() => router.push(`/collection/${token?.collectionName}`)}
          >
            {token?.collectionName}
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <div style={{ minWidth: "130px" }}>
            <b>Category</b>
          </div>
          <div
            className="truncate"
            role="button"
            onClick={() =>
              router.push(`/category?id=${token?.categories?.value}`)
            }
          >
            {token?.categories?.value}
          </div>
        </div>
      </div>

      {!!remianingListing && (
        <div className="mb-5">
          <div className="item-details-btn" role="button">
            <Link href={"/list-for-sale?tokenId=" + token?.tokenId}>
              <a className="default-btn border-radius-5 w-100">
                Complete Listing
              </a>
            </Link>
            <div className="f-12 mt-2">
              You have {remianingListing} remaning{" "}
              {remianingListing > 1 ? "copies" : "copy"} of NFT to be listed
            </div>
          </div>
        </div>
      )}

      <div className="mb-5">
        {!account ? (
          <div className="item-details-btn" role="button">
            <div onClick={() => openConnectModal(true)} role="button">
              <a className="default-btn border-radius-5 w-100"> Connect</a>
            </div>
          </div>
        ) : isDropUpcoming ? (
          <div className="item-details-btn" role="button">
            <div role="button">
              <a className="default-btn border-radius-5 w-100">Active Soon</a>
            </div>
          </div>
        ) : !isUserEligible ? (
          <div className="item-details-btn" role="button">
            <Link href={"/"}>
              <a className="default-btn border-radius-5 w-100">Locked</a>
            </Link>
          </div>
        ) : isOwner ? (
          <div className="item-details-btn" role="button">
            <Link
              href={`/update-listing?tokenId=${token?.tokenId}&type=${selectedDeal?.type}&index=${selectedDeal.index}`}
            >
              <a className="default-btn border-radius-5 w-100">
                {token.nftType === "timed-auction"
                  ? "Update Auction"
                  : "Update NFT"}
              </a>
            </Link>
          </div>
        ) : selectedDeal?.type ? (
          <>
            {selectedDeal?.type === "timed-auction" ? (
              <PlaceBid
                token={token}
                refresh={fetchTokenDetails}
                selectedDeal={selectedDeal}
                getTokenDetails={getTokenDetails}
              />
            ) : (
              <BuyNow
                token={token}
                refresh={fetchTokenDetails}
                standardTokenDetails={selectedDeal}
                getTokenDetails={getTokenDetails}
              />
            )}
          </>
        ) : null}
      </div>
      {listing?.length > 1 && (
        <div
          className="pb-3"
          style={{ borderBottom: "1px solid #e0e0e0", marginBottom: "35px" }}
        >
          <div className="nft-detail-subtitle d-flex justify-content-between">
            <b role="button" onClick={() => handleOpenObject("listing")}>
              Listings
            </b>
            <div role="button">
              <i
                onClick={() => handleOpenObject("listing")}
                className={
                  openObject?.listing ? "ri-subtract-line" : "ri-add-line"
                }
              />
            </div>
          </div>
          <div className="item-details-content m-0">
            {openObject?.listing && (
              <div className="item-details-into mb-3">
                <div className="row">
                  {listing.map((value, index) => {
                    let _expireMoment = moment(Number(value.saleDuration));
                    const diff = _expireMoment.diff(currentMoment);
                    const diffDuration = moment.duration(diff);
                    let printDiff = "";
                    if (value.type == "timed-auction") {
                      if (diffDuration.days())
                        printDiff = `${diffDuration.days()} days`;
                      else if (diffDuration.hours())
                        printDiff = `${diffDuration.hours()} hour`;
                      else if (diffDuration.minutes())
                        printDiff = `${diffDuration.minutes()} min`;
                    }
                    return (
                      <div keys={index} className="item-details-card">
                        <div className="d-flex" style={{ gridGap: "10px" }}>
                          <div className="item-details-card-img">
                            <img
                              src={
                                allUsersHash[value?.owner]?.profilePic ||
                                "/images/profile-picture.webp"
                              }
                              alt="Images"
                            />
                            {/* <i className="ri-check-line"></i> */}
                          </div>
                          <div className="item-details-card-content">
                            <h3
                              className="truncate f-14"
                              onClick={() => handlesetselectedDeal(value)}
                            >
                              {value.quantity} Item - {marketFilter[value.type]}{" "}
                              {value.buyer && (
                                <>
                                  to{" "}
                                  <Link
                                    href={`/artist/${value?.walletAddress}`}
                                  >
                                    <span role="button">@{value?.name}</span>
                                  </Link>
                                </>
                              )}
                            </h3>
                            <h6 className="text-dark f-14 m-0 truncate">
                              From{" "}
                              <Link href={`/artist/${value?.owner}`}>
                                <span role="button">
                                  @
                                  {allUsersHash[value?.owner]?.name ||
                                    walletShotener(value.owner, 5)}
                                </span>
                              </Link>
                            </h6>
                          </div>
                        </div>
                        <div
                          className="work-hours"
                          style={{ textAlign: "right" }}
                        >
                          <div
                            className="text-dark"
                            onClick={() => handlesetselectedDeal(value)}
                          >
                            {value.currentPrice}{" "}
                            {CHAINS[desiredChainId].currency}
                          </div>
                          <div
                            role="button"
                            onClick={() => handlesetselectedDeal(value)}
                            style={{
                              opacity:
                                selectedDeal.id === value.id ? "0.3" : "1",
                              padding: "8px 15px 6px",
                            }}
                            className={
                              selectedDeal.id === value.id
                                ? "default-btn border-radius-5 f-12"
                                : "default-btn border-radius-5 f-12 isActionButton"
                            }
                          >
                            Select
                          </div>
                          {!(selectedDeal.id === value.id) && (
                            <div className="f-12 hidden-hover-time">
                              {printDiff ? (
                                `Ends in ${printDiff}`
                              ) : (
                                <div>&nbsp;</div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="pb-3">
        <div className="nft-detail-subtitle d-flex justify-content-between">
          <b role="button" onClick={() => handleOpenObject("description")}>
            Description
          </b>
          <div role="button">
            <i
              onClick={() => handleOpenObject("description")}
              className={
                openObject?.description ? "ri-subtract-line" : "ri-add-line"
              }
            />
          </div>
        </div>
        {openObject?.description && (
          <div className="nft-detail-detail-value ">{token?.description}</div>
        )}
      </div>

      {!!token?.properties?.length && (
        <div className="nft-detail-price-section d-block pb-3">
          <div className="nft-detail-subtitle d-flex justify-content-between">
            <b role="button" onClick={() => handleOpenObject("properties")}>
              Properties
            </b>
            <div role="button">
              <i
                onClick={() => handleOpenObject("properties")}
                className={
                  openObject?.properties ? "ri-subtract-line" : "ri-add-line"
                }
              />
            </div>
          </div>
          {openObject?.properties && (
            <div className="nft-detail-detail-value grid-3">
              {token?.properties.map((value, index) => (
                <div key={index} className="nft-detail-property-card">
                  <div>
                    <b className="f-12">{value.key}</b>
                  </div>
                  <div>{value?.value}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="nft-detail-price-section d-block pb-3">
        <div className="nft-detail-subtitle d-flex justify-content-between">
          <b role="button" onClick={() => handleOpenObject("advance")}>
            Advance Details
          </b>
          <div role="button">
            <i
              onClick={() => handleOpenObject("advance")}
              className={
                openObject?.advance ? "ri-subtract-line" : "ri-add-line"
              }
            />
          </div>
        </div>
        {openObject?.advance && (
          <div className="nft-detail-detail-value">
            <div className="d-flex justify-content-between mb-2">
              <div className="f-14" style={{ minWidth: "130px" }}>
                <b>Contract Address</b>
              </div>
              <div role="button" className="truncate f-14">
                {walletShotener(token?.nftContractAddress, 8)}
              </div>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <div className="f-14" style={{ minWidth: "130px" }}>
                <b>Blockchain</b>
              </div>
              <div role="button" className="truncate f-14">
                {CHAINS[1].shortName}
              </div>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <div className="f-14" style={{ minWidth: "130px" }}>
                <b>Token Standard</b>
              </div>
              <div role="button" className="truncate f-14">
                {token?.tokenName || "ERC-115"}
              </div>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <div className="f-14" style={{ minWidth: "130px" }}>
                <b>Token ID</b>
              </div>
              <div role="button" className="truncate f-14">
                {token?.contractTokenId}
              </div>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <div className="f-14" style={{ minWidth: "130px" }}>
                <b>Metadata</b>
              </div>
              <div role="button" className="truncate">
                <a
                  target={"_blank"}
                  href={token?.metaData?.ipfs.replace(
                    "ipfs://",
                    "https://ipfs.io/ipfs/"
                  )}
                >
                  <i class="ri-external-link-line ri-lg" />
                </a>
              </div>
            </div>
            {token?.websiteURL && (
              <div className="d-flex justify-content-between mb-2">
                <div className="f-14" style={{ minWidth: "130px" }}>
                  <b>External Link</b>
                </div>
                <div role="button" className="truncate">
                  <a target={"_blank"} href={token?.websiteURL}>
                    <i class="ri-external-link-line ri-lg" />
                  </a>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

function StartInTimer({ token, time }) {
  const [tokenDetails, settokenDetails] = useState({});
  useEffect(() => {
    const _token = { ...token };
    if (_token?.isDrop) _token.auctionEndAt = Number(time || Date.now());
    settokenDetails(_token);
  }, [token]);

  return tokenDetails?.auctionEndAt ? <Timer token={tokenDetails} /> : null;
}

const mapStateToProps = (state) => {
  return { name: state.main.name, userinfo: state.user, main: state.main };
};

const mapDispatchToProps = { setConfetti, openConnectModal, getAllUsers };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemDetailsDescription);
