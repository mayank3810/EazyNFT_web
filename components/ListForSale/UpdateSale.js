import React, { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import styled from "styled-components";
import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import API from "../../services/API";
import Loading from "../Loading/Loading";
import { setConfetti, getCategories } from "../../redux/actions/main";
import { getTokenId } from "../../utils/web";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import NFTCard from "../NFTCard/NFTCard";
import { CHAINS } from "../../chains.ts";
import Web3 from "web3";

import { PolyoneNFTABI, MarketplaceContractABI } from "../../utils/abs/abs";
import CustomInput from "../Common/CustomInput";
import config from "../../config/config";

const FormSchema = Yup.object().shape({
  price: Yup.number("Price must be number"),
  royalty: Yup.number("Royalty must be number"),
  nftType: Yup.string().required("NFT Type is must"),
});

const CreateCollectionArea = (props) => {
  // const { library, account } = useActiveWeb3React();
  const { web3 } = props?.main;
  const { provider, account } = web3;
  const router = useRouter();
  const [state, setState] = useState(0);
  const [tokenDetails, setTokenDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [auctionList, setauctionList] = useState([]);
  const [fixedList, setfixedList] = useState([]);
  const [endDate, setEndDate] = useState(new Date());
  const [selectedDeal, setselectedDeal] = useState({});
  const { tokenId, type, index } = router?.query;
  const royalty =
    tokenDetails?.royalties && tokenDetails?.royalties.length
      ? tokenDetails?.royalties[0]?.ownersPercentage
      : 0;
  const formik = useFormik({
    initialValues: {
      royalty: royalty,
      price: selectedDeal?.priceThreshhold || tokenDetails?.currentPrice,
      nftType: type,
    },
    enableReinitialize: true,
    validationSchema: FormSchema,
    onSubmit: (values) => {
      handleSubmit();
    },
  });
  const { user } = props.userinfo;
  const desiredChainId = tokenDetails?.blockchainChainId || 1;

  useEffect(() => {
    if (tokenDetails?.contractTokenId) {
      getTokenListingDetails(tokenDetails?.contractTokenId);
    }
  }, [tokenDetails?.contractTokenId]);

  useEffect(() => {
    let list = [...auctionList, ...fixedList];
    let obj = {};
    for (let i = 0; i < list.length; i++) {
      if (list[i].type === type && list[i].index == index) {
        obj = list[i];
      }
    }
    if (obj.type == "timed-auction") {
      setEndDate(new Date(Number(obj.saleDuration)));
    }
    setselectedDeal(obj);
  }, [auctionList, fixedList]);

  const getTokenListingDetails = (contractTokenId) => {
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

  const handleSubmit = async () => {
    try {
      if (!standardTokenDetails?.length) return;
      let { price, nftType } = formik.values;
      const isTimeAuction = nftType === "timed-auction";
      if (isTimeAuction) return;
      price = Number(price);
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
        setState(1);
        const transaction = await contract.setApprovalForAll(
          config.contractDetails[desiredChainId].marketplaceContractAddress,
          true
        );
        await transaction.wait();
      }
      let contractTokenId = tokenDetails?.contractTokenId;
      if (!contractTokenId) {
        contractTokenId = await getTokenId(tokenDetails?.metaData?.etherScan);
      }
      setState(3);
      const marketContract = new ethers.Contract(
        config.contractDetails[desiredChainId].marketplaceContractAddress,
        MarketplaceContractABI,
        signer
      );
      const gweiValue = ethers.utils
        .parseEther(formik.values.price.toString())
        .toString();
      const marketTransaction =
        await marketContract.updateTokenPriceInStandardSale(
          contractTokenId,
          index,
          gweiValue
        );
      const _saveNFT = {
        walletAddress: user?.walletAddress,
        signature: user?.signature,
        tokenId: tokenDetails?.tokenId,
        price,
        contractTokenId,
        nftType,
        action: "sale",
        auctionEndAt: endDate.getTime(),
      };
      await API.saveNFT(_saveNFT);
      await marketTransaction.wait();
      getTokenDetails(tokenDetails?.tokenId);
      setState(4);
      toast.success("NFT updated successfully");
    } catch (error) {
      setState(0);
      if (typeof error?.message === "string") toast.error(error?.message);
      else toast.error(error?.response?.data?.msg || "Something went wrong");
    }
  };

  const handleCancel = async () => {
    try {
      if (!standardTokenDetails?.length) return;
      let { price, nftType } = formik.values;
      const isTimeAuction = nftType === "timed-auction";
      if (!price && !isTimeAuction) return;
      price = Number(price);
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
        setState(1);
        const transaction = await contract.setApprovalForAll(
          config.contractDetails[desiredChainId].marketplaceContractAddress,
          true
        );
        await transaction.wait();
      }
      let contractTokenId = tokenDetails?.contractTokenId;
      if (!contractTokenId) {
        contractTokenId = await getTokenId(tokenDetails?.metaData?.etherScan);
      }
      setState(3);
      const marketContract = new ethers.Contract(
        config.contractDetails[desiredChainId].marketplaceContractAddress,
        MarketplaceContractABI,
        signer
      );
      const method = isTimeAuction
        ? "cancelEnglishAuction"
        : "removeTokenFromStandardSale";
      const marketTransaction = await marketContract[method](
        contractTokenId,
        index
      );
      const _saveNFT = {
        walletAddress: user?.walletAddress,
        signature: user?.signature,
        tokenId: tokenDetails?.tokenId,
        price,
        contractTokenId,
        action: "delist",
      };
      await API.saveNFT(_saveNFT);
      await marketTransaction.wait();
      await API.updateNFTDetails(tokenDetails?.tokenId);
      getTokenDetails(tokenDetails?.tokenId);
      setState(5);
      toast.success("NFT delisted successfully");
    } catch (error) {
      setState(0);
      if (typeof error?.message === "string") toast.error(error?.message);
      else toast.error(error?.response?.data?.msg || "Something went wrong");
    }
  };

  useEffect(async () => {
    if (tokenId) {
      getTokenDetails(tokenId);
    }
  }, [tokenId]);

  const getTokenDetails = async (tokenId) => {
    setIsLoading(true);
    let token = await API.getCollectible(tokenId);
    setTokenDetails(token);
    setIsLoading(false);
  };

  const loadingSection = (state) => {
    switch (state) {
      case 1:
        return <h2 className="text-light">Approve Token</h2>;
      case 2:
        return <h2 className="text-light">Your Certificate is being escrowed</h2>;
      case 3:
        return <h2 className="text-light">Your Certificate is being listed</h2>;
      case 4:
        return (
          <>
            <h2 className="text-light">
              Your Certificate has been listed congratulations!
            </h2>
            <h3 className="text-light">You have successfully listed your NFT</h3>
            <div>
              <Link href={`/asset/${tokenDetails?.tokenId}`}>
                <button className="default-btn border-radius-5 mt-5">
                  View
                </button>
              </Link>
            </div>
          </>
        );
      case 5:
        return (
          <>
            <h2>Your Certificate has been delisted!</h2>
            <div>
              <Link href={`/asset/${tokenDetails?.tokenId}`}>
                <button className="default-btn border-radius-5 mt-5">
                  View
                </button>
              </Link>
            </div>
          </>
        );
    }
  };

  const loadingSectionValue = loadingSection(state);

  return (
    <>
      <div className="pt-100 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              {isLoading ? (
                <div className="mt-5 text-center">
                  <Loading />
                </div>
              ) : (
                <NFTCard token={tokenDetails} />
              )}
            </div>
            <div className="col-lg-1"></div>
            <div className="col-lg-7">
              {state ? (
                <LoadingWrapper>
                  {state < 4 && (
                    <div className="mb-5">
                      <Loading />
                    </div>
                  )}
                  <div className="mt-4 text-center">{loadingSectionValue}</div>
                </LoadingWrapper>
              ) : (
                <div>
                  <div className="section-title">
                    <div style={{ fontSize: "28px" }}>Publish Certificate</div>
                  </div>
                  <div>
                    <form onSubmit={formik.handleSubmit}>
                      <div className="row">
                        <div className="col-lg-6">
                          <CustomInput
                            type="text"
                            name="price"
                            id="price"
                            class="ez-input"
                            label={
                              type === "timed-auction"
                                ? `Minimum accepting price in ${CHAINS[desiredChainId].currency}`
                                : `Price in ${CHAINS[desiredChainId].currency}`
                            }
                            errors={formik.errors}
                            touched={formik.touched}
                            value={formik.values.price}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                        </div>
                        {type === "fixed-price" && (
                          <div className="col-lg-6">
                            <CustomInput
                              type="text"
                              name="copies"
                              id="copies"
                              class="ez-input"
                              label={"Number of copies to be listed"}
                              errors={formik.errors}
                              touched={formik.touched}
                              value={formik.values.copies}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              disabled={true}
                            />
                          </div>
                        )}
                        {formik?.values?.nftType === "timed-auction" && (
                          <div className="col-lg-6">
                            <CustomInput
                              type="date"
                              name="endTime"
                              id="endTime"
                              className="form-control"
                              placeholder="Enter Price"
                              label="Auction end time"
                              showTimeSelect
                              selected={endDate}
                              onChange={(date) => setEndDate(date)}
                            />
                          </div>
                        )}

                        {/* <div className="col-lg-12">
                          <div className="checkbox-method-area">
                            <div className="row">
                              {type == "fixed-price" && (
                                <div className="col-lg-4 col-md-12">
                                  <div className="checkbox-method">
                                    <p>
                                      <input
                                        type="radio"
                                        id="fixed-price"
                                        name="nftType"
                                        onChange={formik.handleChange}
                                        value={"fixed-price"}
                                        defaultChecked={true}
                                      />
                                      <label htmlFor="fixed-price">
                                        Fixed Price
                                      </label>
                                    </p>
                                  </div>
                                </div>
                              )}
                              {type == "timed-auction" && (
                                <div className="col-lg-4 col-md-12">
                                  <div className="checkbox-method">
                                    <p>
                                      <input
                                        type="radio"
                                        id="timed-auction"
                                        name="nftType"
                                        onChange={formik.handleChange}
                                        value={"timed-auction"}
                                        defaultChecked={true}
                                      />
                                      <label htmlFor="timed-auction">
                                        Timed Auction
                                      </label>
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div> */}

                        <div className="col-lg-12 col-md-12">
                          {tokenDetails.nftType === "fixed-price" && (
                            <button
                              type="submit"
                              className="default-btn border-radius-5"
                            >
                              Publish
                            </button>
                          )}
                          <button
                            className="default-btn border-radius-5"
                            style={{ marginLeft: "20px" }}
                            onClick={() => handleCancel()}
                          >
                            Cancel Listing
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px 0;
  min-height: 100%;
  min-width: 100%;
`;

const mapStateToProps = (state) => {
  return { name: state.main.name, userinfo: state.user, main: state.main };
};

const mapDispatchToProps = {
  setConfetti,
  getCategories,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateCollectionArea);
