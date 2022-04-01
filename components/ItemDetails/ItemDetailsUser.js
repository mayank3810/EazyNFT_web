import React, { useEffect, useState } from "react";
import Web3 from "web3";
import Link from "next/link";
import { MarketplaceContractABI, PolyoneNFTABI } from "../../utils/abs/abs";
import config from "../../config/config";
import { connect } from "react-redux";
import { setConfetti } from "../../redux/actions/main";
import { getTokenId } from "../../utils/web";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import API from "../../services/API";
import Loading from "../Loading/Loading";
import moment from "moment";

const ItemDetailsUser = ({ token, userInfo, fetchTokenDetails, main }) => {
  // const { library, account } = useActiveWeb3React();
  const { web3 } = main;
  const { provider, account } = web3;
  const [bidList, setbidList] = useState([]);
  const [state, setState] = useState(0);
  const [selectedIndex, setselectedIndex] = useState();
  const [isLoading, setisLoading] = useState(false);
  const { allUsersHash, user } = userInfo;
  const desiredChainId = 1;

  const getTokenDetails = async (contractTokenId) => {
    try {
      let web3 = new Web3(config.infure[desiredChainId]);
      let contract = await new web3.eth.Contract(
        MarketplaceContractABI,
        config.contractDetails[desiredChainId].marketplaceContractAddress
      );
      let data = await contract.methods
        .getAllBidsForToken(contractTokenId)
        .call();
      return data || [];
    } catch (error) {
      return false;
    }
  };

  const updateTokenBids = async (contractTokenId) => {
    let array = await getTokenDetails(contractTokenId);
    if (!array) return;
    let result = [];
    let web3 = new Web3(config.infure[desiredChainId]);
    for (let i = 0; i < array.length; i++) {
      if (Number(array[i]?.timeCreated)) {
        const price = web3.utils.fromWei(array[i][1], "ether");
        result.push({
          bidder: array[i][4],
          time: array[i][3],
          price: price,
          status: array[i][5],
          index: array[i][2],
          id: array[i][0],
        });
      }
    }
    setbidList(result.reverse());
  };

  useEffect(async () => {
    if (token?.contractTokenId) {
      updateTokenBids(token?.contractTokenId);
    }
  }, [token?.contractTokenId]);

  const findAuctionSaleIndex = async (contractTokenId) => {
    try {
      let web3 = new Web3(config.infure[desiredChainId]);
      let contract = await new web3.eth.Contract(
        MarketplaceContractABI,
        config.contractDetails[desiredChainId].marketplaceContractAddress
      );
      let data = await contract.methods
        .getAllEnglishSaleItemsForToken(contractTokenId)
        .call();
      if (data?.length) return data[0];
      return false;
    } catch (error) {
      if (typeof error?.message === "string") toast.error(error?.message);
      else toast.error(error?.response?.data?.msg || "Something went wrong");
      return false;
    }
  };

  const handleSettle = async (value, index) => {
    try {
      setselectedIndex(index);
      setisLoading(true);
      let contractTokenId = token?.contractTokenId;
      if (!contractTokenId)
        contractTokenId = await getTokenId(token?.metaData?.etherScan);

      // const provider = new ethers.providers.Web3Provider(library.provider);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        config?.contractDetails[desiredChainId].polyoneContractAddress,
        PolyoneNFTABI,
        signer
      );
      let isApprovalRequired = await contract.isApprovedForAll(
        account,
        config.contractDetails[desiredChainId].marketplaceContractAddress
      );
      if (!isApprovalRequired) {
        const transaction = await contract.setApprovalForAll(
          config.contractDetails[desiredChainId].marketplaceContractAddress,
          true
        );
        await transaction.wait();
      }

      const marketContract = new ethers.Contract(
        config.contractDetails[desiredChainId].marketplaceContractAddress,
        MarketplaceContractABI,
        signer
      );
      const auctionIndexData = await findAuctionSaleIndex(contractTokenId);
      if (!auctionIndexData?.length) return;
      const bidIndex = value?.index;
      const marketTransaction = await marketContract.acceptBid(
        contractTokenId,
        bidIndex,
        auctionIndexData[3]
      );
      let data = {
        walletAddress: user?.walletAddress,
        signature: user?.signature,
        tokenId: token?.tokenId,
        contractTokenId,
        price: value?.price,
        buyer: value?.bidder,
      };
      await API.settleAuction(data);
      await marketTransaction.wait();
      toast.success("Successfully settled auction");
      fetchTokenDetails(token?.tokenId);
      setisLoading(false);
    } catch (error) {
      console.log(error);
      setisLoading(false);
      if (typeof error?.message === "string") toast.error(error?.message);
      else toast.error(error?.response?.data?.msg || "Something went wrong");
    }
  };

  const handleCancelBid = async (value, index) => {
    try {
      setselectedIndex(index);
      setisLoading(true);
      // const provider = new ethers.providers.Web3Provider(library.provider);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        config.contractDetails[desiredChainId].marketplaceContractAddress,
        MarketplaceContractABI,
        signer
      );
      let cancelTxn = await contract.cancelBid(value.id, value.index);
      await cancelTxn.wait();
      updateTokenBids(token?.contractTokenId);
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
      console.log(error);
      if (typeof error?.message === "string") toast.error(error?.message);
      else toast.error(error?.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <>
      {!!bidList.length && (
        <div className="item-details-user-area">
          <h3>Latest Bids </h3>

          <div className="item-details-user-into">
            <div className="row">
              {bidList.map((value, index) => (
                <div key={index} className="col-lg-12">
                  <div className="item-details-user-card">
                    <div className="item-details-card-img">
                      <img
                        src={
                          allUsersHash[value?.bidder]?.profilePic ||
                          "/images/profile-picture.webp"
                        }
                        alt="Images"
                      />
                    </div>
                    <div className="item-details-card-content">
                      <h3>
                        By{" "}
                        <Link href={`/artist/${value?.bidder}`}>
                          <span style={{ cursor: "pointer" }}>
                            <b>
                              @{allUsersHash[value?.bidder]?.name || "Unnamed"}
                            </b>
                          </span>
                        </Link>
                      </h3>
                      <span>
                        Bid At <b> {value?.price} ETH</b>
                      </span>
                    </div>
                    <div className="item-details-card-right text-center">
                      {isLoading && selectedIndex === index ? (
                        <div className="item-details-user-card justify-content-center pt-3">
                          <div style={{ position: "relative", top: "15px" }}>
                            <Loading />
                          </div>
                        </div>
                      ) : account === token?.currentOwner ? (
                        <div
                          className="trending-btn text-end"
                          role="button"
                          onClick={() => handleSettle(value, index)}
                        >
                          <a className="default-btn border-radius-5 mt-2">
                            Settle
                          </a>
                        </div>
                      ) : (
                        <>
                          <h3>
                            {value?.bidder === account ? (
                              <a
                                className="btn-sm border-radius-5"
                                role="button"
                                onClick={() => handleCancelBid(value, index)}
                              >
                                Cancel Bid
                              </a>
                            ) : (
                              <span>{value?.price} ETH</span>
                            )}
                          </h3>
                          <span>
                            {moment(value.time * 1000).format("hh:mm A")}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return { userInfo: state.user, main: state.main };
};

const mapDispatchToProps = { setConfetti };
export default connect(mapStateToProps, mapDispatchToProps)(ItemDetailsUser);
