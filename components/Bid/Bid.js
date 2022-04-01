import React, { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import styled from "styled-components";
// import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import API from "../../services/API";
import Loading from "../Loading/Loading";
import { setConfetti, getCategories } from "../../redux/actions/main";
import { getTokenId } from "../../utils/web";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import Web3 from "web3";

import { PolyoneNFTABI, MarketplaceContractABI } from "../../utils/abs/abs";
import CustomInput from "../Common/CustomInput";
import config from "../../config/config";
import NFTCard from "../NFTCard/NFTCard";

const FormSchema = Yup.object().shape({
  bid: Yup.number("Bid must be number").required(
    "Your bid must be at least 0.00000001 ETH"
  ),
});

const CreateCollectionArea = (props) => {
  // const { library, account } = useActiveWeb3React();
  const { web3 } = props?.main;
  const { provider, desiredChainId, account } = web3;
  const router = useRouter();
  const [state, setState] = useState(0);
  const [tokenDetails, setTokenDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const tokenId = router?.query?.tokenId;
  const royalty =
    tokenDetails?.royalties && tokenDetails?.royalties.length
      ? tokenDetails?.royalties[0]?.ownersPercentage
      : 0;
  const formik = useFormik({
    initialValues: {
      royalty: royalty,
      bid: "",
      nftType: "fixed-bid",
    },
    enableReinitialize: true,
    validationSchema: FormSchema,
    onSubmit: (values) => {
      handleSubmit();
    },
  });
  const { user } = props.userinfo;

  const getTokenDetails = async (contractTokenId) => {
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
      console.log(error);
      return false;
    }
  };

  const handleSubmit = async () => {
    try {
      let { bid } = formik.values;
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
      setState(2);
      const marketContract = new ethers.Contract(
        config.contractDetails[desiredChainId].marketplaceContractAddress,
        MarketplaceContractABI,
        signer
      );
      const indexData = await getTokenDetails(contractTokenId);
      if (!indexData?.length) return;
      const gweiValue = ethers.utils.parseEther(bid.toString()).toString();
      const marketTransaction = await marketContract.createBid(
        contractTokenId,
        indexData[3],
        { value: gweiValue }
      );
      setState(3);
      await marketTransaction.wait();
      const _saveNFT = {
        walletAddress: user?.walletAddress,
        signature: user?.signature,
        tokenId: tokenDetails?.tokenId,
        contractTokenId,
      };
      API.placeBid(_saveNFT);
      // props.setConfetti(true);
      setState(4);
      toast.success("Bid placed successfully");
    } catch (error) {
      setState(0);
      if (typeof error?.response == "string") toast.error(error?.response);
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
        return <h2>Token Verification Approval</h2>;
      case 2:
        return (
          <>
            <h2>Waiting for confirmation</h2>
            <div>Confirm the request that appeared just now.</div>
            <div> If you are unable to see a request, open your wallet.</div>
          </>
        );
      case 3:
        return (
          <>
            <h2>Waiting for txn status</h2>
            <div>Your txn in pending state, waiting for success.</div>
          </>
        );
      case 4:
        return (
          <>
            <h2>Your Bid placed successfully</h2>
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
      <div className="collection-widget-area pt-100 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              {isLoading ? (
                <div className="mt-5 text-center">
                  <Loading />
                </div>
              ) : (
                <NFTCard token={tokenDetails} />
              )}
            </div>
            <div className="col-lg-1"></div>
            <div className="col-lg-8">
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
                <div className="collection-form-area">
                  <div className="section-title">
                    <h2>Place your bid</h2>
                  </div>
                  <div className="collection-form">
                    <form onSubmit={formik.handleSubmit}>
                      <div className="row">
                        <div className="col-lg-6">
                          <CustomInput
                            type="number"
                            name="bid"
                            id="bid"
                            className="form-control"
                            placeholder="Enter Bid"
                            label="Bid in ETH"
                            errors={formik.errors}
                            touched={formik.touched}
                            value={formik.values.bid}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                        </div>

                        <div className="col-lg-12 col-md-12">
                          <button
                            type="submit"
                            className="default-btn border-radius-5"
                          >
                            Place Bid
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
