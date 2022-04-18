import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { connect } from "react-redux";
import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import { getAllUserMediaDetails } from "../../redux/actions/user";
import API from "../../services/API";
import Timer from "../Timer/Timer";
import { debounce } from "lodash";
import { useRouter } from "next/router";
import Asset from "../Image/Asset";

const NFTCard = ({ token, userinfo, getAllUserMediaDetails, main }) => {
  // const { account } = useActiveWeb3React();
  const { web3 } = main;
  const { provider, desiredChainId, account } = web3;
  const [tokenDetails, settokenDetails] = useState(token);
  const [userMedia, setuserMedia] = useState({});
  const { user, isUserEligible } = userinfo;
  const router = useRouter();

  useEffect(() => {
    const _token = { ...token };
    if (_token?.createdBy?.length) {
      _token.createdBy = _token?.createdBy[0];
    }
    settokenDetails(_token);
  }, [token]);

  useEffect(() => {
    setuserMedia(userinfo?.userMediaDetails);
  }, [userinfo?.userMediaDetails]);

  const updateLike = (status) => {
    let data = {
      walletAddress: user?.walletAddress,
      signature: user?.signature,
      tokenId: tokenDetails?.tokenId,
      type: "like",
      action: {
        status,
      },
    };
    API.updateUserMediaDetails(data)
      .then((response) => {
        let data = {
          walletAddress: user?.walletAddress,
          signature: user?.signature,
        };
        getAllUserMediaDetails(data);
      })
      .catch((error) => {});
  };

  const debouncedProfiles = useCallback(
    debounce((value) => updateLike(value), 1000),
    []
  );

  return (
    <div key={tokenDetails?.tokenId} className="featured-card box-shadow">
      <div className="featured-card-img">
        <a
          onClick={() => {
            if (isUserEligible) router.push(`/asset/${tokenDetails?.tokenId}`);
          }}
          style={{ height: "440px" }}
        >
          <Asset
            type={tokenDetails?.metaData?.type || "image"}
            imageSrc={tokenDetails?.metaData?.preview}
            thumbnail={tokenDetails?.metaData?.preview}
            videoSrc={[tokenDetails?.metaData?.preview]}
            objectFit="cover"
          />
        </a>

        {tokenDetails?.isMintOnSale && tokenDetails?.currentOwner !== account && (
          <button
            onClick={() => {
              if (isUserEligible)
                router.push(`/asset/${tokenDetails?.tokenId}`);
            }}
            type="button"
            className="default-btn border-radius-5"
          >
            {isUserEligible ? "Place Bid" : "Locked"}
          </button>
        )}
      </div>

      <div className="content">
        <h3>
          <a
            onClick={() => {
              if (isUserEligible)
                router.push(`/asset/${tokenDetails?.tokenId}`);
            }}
          >
            {tokenDetails?.title}
          </a>
        </h3>
        {tokenDetails?.isMintOnSale && (
          <div className="content-in">
            <div className="featured-card-left">
              <h4>
                ETH{" "}
                {tokenDetails?.nftType === "timed-auction"
                  ? (tokenDetails?.currentBid || 0).noExponents()
                  : tokenDetails?.price?.noExponents()}{" "}
              </h4>
            </div>

            <a
              onClick={() => {
                if (isUserEligible)
                  router.push(`/asset/${tokenDetails?.tokenId}`);
              }}
              className="featured-content-btn"
            >
              <i className="ri-arrow-right-line"></i>
            </a>
          </div>
        )}
     
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userinfo: state.user,
    main: state.main,
  };
};

const mapDispatchToProps = { getAllUserMediaDetails };
export default connect(mapStateToProps, mapDispatchToProps)(NFTCard);
