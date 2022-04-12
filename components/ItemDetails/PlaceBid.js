import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import styled from "styled-components";
import { ethers } from "ethers";
import Web3 from "web3";

import { PolyoneNFTABI, MarketplaceContractABI } from "../../utils/abs/abs";
import { setConfetti, getCategories } from "../../redux/actions/main";
import API from "../../services/API";
import { getTokenId } from "../../utils/web";
import CustomInput from "../Common/CustomInput";
import config from "../../config/config";
import { CHAINS } from "../../chains.ts";

const FormSchema = ({ minimum, currency }) =>
  Yup.object().shape({
    bid: Yup.number("Bid must be number")
      .min(minimum, `Bid must be more than ${minimum} ${currency}`)
      .required(`Your bid must be at least 0.0001 ${currency}`),
  });

const PlaceBid = (props) => {
  const { web3 } = props?.main;
  const { provider, account, desiredChainId: chainId } = web3;
  const [state, setState] = useState(0);
  const tokenDetails = props?.token;
  const desiredChainId = tokenDetails?.blockchainChainId || 1;
  let minBid = props?.selectedDeal?.currentPrice
    ? props?.selectedDeal?.isFirstBid
      ? props?.selectedDeal?.currentPrice
      : Math.ceil(
          (props?.selectedDeal?.currentPrice +
            props?.selectedDeal?.currentPrice * 0.1) *
            10000
        ) / 10000
    : 0.0001;
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
    validationSchema: FormSchema({
      minimum: minBid,
      currency: CHAINS[desiredChainId].currency,
    }),
    onSubmit: (values) => {
      handleSubmit();
    },
  });
  const { user } = props.userinfo;

  const handleSubmit = async () => {
    try {
      if (!props?.selectedDeal?.index) {
        toast.error("NFT index not found");
        return;
      }
      if (desiredChainId !== chainId) {
        toast.error(
          `Wrong Network: Please change network to ${CHAINS[desiredChainId].name}`
        );
        return;
      }
      let { bid } = formik.values;
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
      const gweiValue = ethers.utils.parseEther(bid.toString()).toString();
      const marketTransaction = await marketContract.createBid(
        contractTokenId,
        props?.selectedDeal?.index,
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
      // API.placeBid(_saveNFT);
      API.updateNFTDetails(tokenDetails?.tokenId);
      props.getTokenDetails(tokenDetails?.contractTokenId);
      // props.setConfetti(true);
      setState(4);
      setTimeout(() => {
        setState(0);
      }, 5000);
      toast.success("Bid placed successfully");
    } catch (error) {
      setState(0);
      if (typeof error?.response == "string") toast.error(error?.response);
      else toast.error(error?.response?.data?.msg || "Something went wrong");
    }
  };

  const loadingSection = (state) => {
    switch (state) {
      case 1:
        return <div className="f-18">Token Verification Approval</div>;
      case 2:
        return (
          <>
            <div className="f-18">Waiting for confirmation</div>
            <div className="f-14">
              Confirm the request that appeared just now.
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div className="f-18">Waiting for txn status</div>
            <div className="f-14">
              Your txn in pending state, waiting for success.
            </div>
          </>
        );
      case 4:
        return <div className="f-18">Your Bid placed successfully</div>;
    }
  };

  const loadingSectionValue = loadingSection(state);

  return (
    <>
      {state ? (
        <LoadingWrapper>
          <div className="mt-4 text-center">{loadingSectionValue}</div>
        </LoadingWrapper>
      ) : (
        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            type="number"
            name="bid"
            id="bid"
            class="ez-input"
            label={`Bid in ${CHAINS[desiredChainId].currency}`}
            errors={formik.errors}
            touched={formik.touched}
            value={formik.values.bid}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <div>
            <button type="submit" className="default-btn border-radius-5 w-100">
              Place Bid
            </button>
          </div>
        </form>
      )}
    </>
  );
};

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
export default connect(mapStateToProps, mapDispatchToProps)(PlaceBid);
