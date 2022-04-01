import React, { useState } from "react";
import { connect } from "react-redux";
import { ethers } from "ethers";
import { toast } from "react-toastify";

import { setConfetti } from "../../redux/actions/main";
import { MarketplaceContractABI } from "../../utils/abs/abs";
import API from "../../services/API";
import config from "../../config/config";
import Loading from "../Loading/Loading";

function BuyNow(props) {
  const [isLoading, setisLoading] = useState(false);
  const token = props?.token;
  const { web3 } = props?.main;
  const { user } = props?.userinfo;
  const { provider, desiredChainId: chainId } = web3;
  const desiredChainId = token?.blockchainChainId || 1;

  const handleBuyNow = async () => {
    try {
      const standardTokenDetails = props.standardTokenDetails;
      if (!standardTokenDetails?.index) {
        toast.error("NFT index not found");
        return;
      }
      if (desiredChainId !== chainId) {
        toast.error(
          `Wrong Network: Please change network to ${CHAINS[desiredChainId].name}`
        );
        return;
      }
      setisLoading(true);
      const signer = provider.getSigner();
      const marketContract = new ethers.Contract(
        config.contractDetails[desiredChainId].marketplaceContractAddress,
        MarketplaceContractABI,
        signer
      );
      const transaction = await marketContract.buyToken(
        standardTokenDetails.tokenId,
        standardTokenDetails.index,
        { value: standardTokenDetails._currentPrice }
      );
      const _saveNFT = {
        walletAddress: user?.walletAddress,
        signature: user?.signature,
        tokenId: token?.tokenId,
        contractTokenId: token?.contractTokenId,
        action: "buy",
      };
      // await API.buyNFT(_saveNFT);
      await transaction.wait();
      API.updateNFTDetails(token?.tokenId);
      props.getTokenDetails(token?.contractTokenId);
      props.refresh(token?.tokenId);
      setisLoading(false);
      setConfetti(true);
    } catch (error) {
      if (typeof error?.message === "string") toast.error(error?.message);
      else toast.error(error?.response?.data?.msg || "Something went wrong");
      setisLoading(false);
    }
  };
  return (
    <div className="item-details-btn" role="button" onClick={handleBuyNow}>
      {isLoading ? (
        <div className="text-center mt-3 mb-3">
          <Loading />
        </div>
      ) : (
        <a className="default-btn border-radius-5 w-100">Buy Now</a>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return { name: state.main.name, userinfo: state.user, main: state.main };
};

const mapDispatchToProps = { setConfetti };
export default connect(mapStateToProps, mapDispatchToProps)(BuyNow);
