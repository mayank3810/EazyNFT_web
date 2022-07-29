import React, { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import styled from "styled-components";
import API from "../../services/API";
import Loading from "../Loading/Loading";
import { setConfetti, getCategories } from "../../redux/actions/main";
import { getTokenId } from "../../utils/web";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import NFTCard from "../NFTCard/NFTCard";

import { PolyoneNFTABI, MarketplaceContractABI } from "../../utils/abs/abs";
import CustomInput from "../Common/CustomInput";
import config from "../../config/config";
import { CHAINS } from "../../chains.ts";
import Web3 from "web3";

const FormSchema = () =>
  Yup.object().shape({
    price: Yup.number("Price must be number"),
    royalty: Yup.number("Royalty must be number"),
    nftType: Yup.string().required("NFT Type is must"),
  });

const CreateCollectionArea = (props) => {
  // const { library, account } = useActiveWeb3React();
  const { web3 } = props?.main;
  const {
    provider,
    account,
    desiredChainId: currentdesiredChainId,
    connector,
  } = web3;
  const router = useRouter();
  const [state, setState] = useState(0);
  const [tokenDetails, setTokenDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [endDate, setEndDate] = useState(new Date());
  const [remianingListing, setremianingListing] = useState(0);
  const tokenId = router?.query?.tokenId;
  const { user } = props.userinfo;

  const royalty =
    tokenDetails?.royalties && tokenDetails?.royalties.length
      ? tokenDetails?.royalties[0]?.ownersPercentage
      : 0;
  const formik = useFormik({
    initialValues: {
      royalty: royalty,
      price: "",
      nftType: "fixed-price",
      copies: remianingListing,
    },
    enableReinitialize: true,
    validationSchema: FormSchema(),
    onSubmit: (values) => {
      handleSubmit();
    },
  });
  const desiredChainId = tokenDetails?.blockchainChainId || 1;

  useEffect(() => {
    if (provider && tokenDetails?.contractTokenId && user?.walletAddress) {
      handleGetListingBalance();
    }
  }, [provider, tokenDetails?.contractTokenId, user?.walletAddress]);

  const handleGetListingBalance = async () => {
    let web3 = new Web3(config.infure[1]);
    let contract = await new web3.eth.Contract(
      PolyoneNFTABI,
      config.contractDetails[desiredChainId].polyoneContractAddress
    );
    let data = await contract.methods
      .balanceOf(user?.walletAddress, tokenDetails?.contractTokenId)
      .call();
      console.log(data);
    setremianingListing(Number(data || 0));
  };

  const handleSubmit = async () => {
    try {
      if (currentdesiredChainId != desiredChainId) {
        toast.error(
          `Wrong Network: Please connect to ${CHAINS[desiredChainId].name}`
        );
        setTimeout(() => {
          connector.activate(desiredChainId);
        }, 4000);
        return;
      }
      let { price, nftType, copies } = formik.values;
      if (nftType == "fixed-price" && copies > remianingListing) {
        toast.error("You do not own enough copies");
        return;
      }
      const isTimeAuction = nftType === "timed-auction";
      let contractTokenId = tokenDetails?.contractTokenId;
      if (!price && !isTimeAuction) return;

      if (!contractTokenId) {
        contractTokenId = await getTokenId(tokenDetails?.metaData?.etherScan);
      }
      let _web3 = new Web3(config.infure[desiredChainId]);
      let first_contract = await new _web3.eth.Contract(
        MarketplaceContractABI,
        config.contractDetails[desiredChainId].marketplaceContractAddress
      );

      let saleIndexFunction = "getStandardSaleIndexForToken";
      if (nftType === "timed-auction")
        saleIndexFunction = "getEnglishSaleIndexForToken";

      const first_contract_result = await first_contract.methods[
        saleIndexFunction
      ](contractTokenId).call();

      if (!first_contract_result || first_contract_result == 100) {
        toast.error("Token can not be listed at this time");
        return;
      }
      price = Number(price);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        config.contractDetails[desiredChainId].polyoneContractAddress,
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
      setState(3);
      const marketContract = new ethers.Contract(
        config.contractDetails[desiredChainId].marketplaceContractAddress,
        MarketplaceContractABI,
        signer
      );
      const gweiValue = ethers.utils.parseEther(formik.values.price).toString();
      let marketTransaction;
      if (nftType == "fixed-price") {
        marketTransaction = await marketContract.putTokenOnSale(
          contractTokenId,
          gweiValue,
          Number(copies),
          first_contract_result
        );
      } else if (nftType == "timed-auction") {
        marketTransaction = await marketContract.putTokenOnEnglishSale(
          contractTokenId,
          endDate.getTime(),
          gweiValue,
          first_contract_result
        );
      }

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
      await API.updateNFTDetails(tokenDetails?.tokenId);
      props.setConfetti(true);
      setState(4);
      toast.success("NFT listed successfully");
    } catch (error) {
      setState(0);
      if (typeof error?.message === "string") toast.error(error?.message);
      else toast.error(error?.response?.data?.msg || "Something went wrong");
    }
  };

  useEffect(async () => {
    if (tokenId) {
      setIsLoading(true);
      let token = await API.getCollectible(tokenId);
      setTokenDetails(token);
      setIsLoading(false);
    }
  }, [tokenId]);

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
            <h5 className="text-light mt-3">
              You have successfully listed your Certificate
            </h5>
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
                    <div style={{ fontSize: "28px" }}>NFT Listing</div>
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
                              formik?.values?.nftType === "timed-auction"
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
                        {formik?.values?.nftType === "fixed-price" && (
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
                            />
                          </div>
                        )}
                        {formik?.values?.nftType === "timed-auction" && (
                          <div className="col-lg-6">
                            <CustomInput
                              type="date"
                              name="endTime"
                              id="endTime"
                              class="ez-input"
                              label="Auction end time"
                              showTimeSelect
                              selected={endDate}
                              onChange={(date) => setEndDate(date)}
                            />
                          </div>
                        )}

                        {/* <div className="col-lg-6">
                          <CustomInput
                            type="text"
                            name="royalty"
                            id="royalty"
                            class="ez-input"
                            label="Royalty %"
                            errors={formik.errors}
                            touched={formik.touched}
                            value={formik.values.royalty || 0}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            disabled={true}
                          />
                        </div> */}

                        <div className="col-lg-12">
                          <div className="checkbox-method-area">
                            <div className="row">
                              <div className="col-lg-4 col-md-12">
                                <div className="checkbox-method">
                                  <p>
                                    <input
                                      type="radio"
                                      id="fixed-price"
                                      name="nftType"
                                      onChange={formik.handleChange}
                                      value={"fixed-price"}
                                      defaultChecked={
                                        formik?.values?.nftType ===
                                        "fixed-price"
                                      }
                                    />
                                    <label htmlFor="fixed-price">
                                      Fixed Price
                                    </label>
                                  </p>
                                </div>
                              </div>

                              <div className="col-lg-4 col-md-12">
                                <div className="checkbox-method">
                                  <p>
                                    <input
                                      type="radio"
                                      id="timed-auction"
                                      name="nftType"
                                      onChange={formik.handleChange}
                                      value={"timed-auction"}
                                      defaultChecked={
                                        formik?.values?.nftType ===
                                        "timed-auction"
                                      }
                                    />
                                    <label htmlFor="timed-auction">
                                      Timed Auction
                                    </label>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-12 col-md-12">
                          <button
                            type="submit"
                            className="default-btn border-radius-5"
                          >
                            Complete Listing
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
