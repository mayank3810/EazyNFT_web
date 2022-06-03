import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { connect } from "react-redux";
import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import { getAllUserMediaDetails } from "../../redux/actions/user";
import Timer from "../Timer/Timer";
import { debounce } from "lodash";
import API from "../../services/API";
import { useRouter } from "next/router";
import Asset from "../Image/Asset";

const DashboardNFTCard = ({
  token,
  userinfo,
  getAllUserMediaDetails,
  main,
}) => {
  // const { account } = useActiveWeb3React();
  const { web3 } = main;
  const { provider, desiredChainId, account } = web3;
  const [tokenDetails, settokenDetails] = useState(token);
  const [userMedia, setuserMedia] = useState({});
  const { user } = userinfo;
  const router = useRouter();
  const isUserEligible = false;
  let random = Math.random();
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

  const _handleLikeButton = () => {
    if (!user?.walletAddress) return;
    let _new = !userMedia[tokenDetails.tokenId];
    const _currentCount = tokenDetails.likeCount + (_new ? 1 : -1);
    setuserMedia({ ...userMedia, [tokenDetails.tokenId]: _new });
    settokenDetails({
      ...tokenDetails,
      likeCount: _currentCount <= 0 ? 0 : _currentCount,
    });
    debouncedProfiles(_new);
  };

  const isVideo = tokenDetails?.metaData?.type?.includes("video");
  const _preview =
    isVideo && tokenDetails?.metaData?.thumbnail
      ? tokenDetails?.metaData?.thumbnail
      : tokenDetails?.metaData?.preview;
  return (
    <div
      key={`${tokenDetails?.tokenId}_${tokenDetails?.metaData?.preview}`}
      className="trending-item"
      role="button"
    >
      <div className="trending-img">
        <a
          onClick={() => {
            if (isUserEligible) router.push(`/asset/${tokenDetails?.tokenId}`);
          }}
          className="nft"
        >
          <Asset
            type={"image"}
            imageSrc={process.env.NEXT_PUBLIC_IMAGE_URL + 'images/' + _preview}
            thumbnail={process.env.NEXT_PUBLIC_IMAGE_URL + 'images/' + _preview}
            videoSrc={[process.env.NEXT_PUBLIC_IMAGE_URL + 'images/' + _preview]}
            id={`dashboard_${tokenDetails?.metaData?.preview}_${random}`}
            objectFit="cover"
          />
        </a>

        {/* <div className="trending-user">
          <Link href={`/artist/${tokenDetails?.createdBy?.walletAddress}`}>
            <a className="trending-user-option">
              <img
                src={
                  tokenDetails?.createdBy?.profilePic ||
                  "../images/trending/trending-user1.jpg"
                }
                alt="Images"
              />
              <span>Created by @{tokenDetails?.createdBy?.name}</span>
            </a>
          </Link>
        </div> */}
        {/* {tokenDetails?.isMintOnSale &&
          tokenDetails?.createdBy?.walletAddress !== account && ( */}
        <button
          onClick={() => {
            if (isUserEligible) router.push(`/asset/${tokenDetails?.tokenId}`);
          }}
          type="button"
          className="default-btn bid-btn"
        >
          {isUserEligible ? (
            <i class="ri-add-circle-fill"></i>
          ) : (
            <i className="ri-lock-2-fill"></i>
          )}
        </button>
        {/* )} */}
        {/* <div
          className="trending-title"
          style={{
            justifyContent:
              tokenDetails?.nftType === "timed-auction" ? "" : "center",
          }}
        >
          {tokenDetails?.nftType === "timed-auction" &&
            tokenDetails?.isMintOnSale && (
              <h3>
                <Timer token={tokenDetails} />{" "}
              </h3>
            )}

          <h3>
            Bid{" "}
            {tokenDetails?.nftType === "timed-auction"
              ? (tokenDetails?.currentBid || 0).noExponents() || 0
              : Number(tokenDetails?.price).noExponents() || 0}{" "}
            ETH
          </h3>
        </div> */}
      </div>

      {/* <div className="content">
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
        <span role="button" onClick={() => _handleLikeButton()}>
          {userMedia && (
            <i
              className={
                userMedia[tokenDetails.tokenId]
                  ? "ri-heart-fill"
                  : "ri-heart-line"
              }
            ></i>
          )}
          {tokenDetails?.likeCount || ""}
        </span>
      </div> */}
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
export default connect(mapStateToProps, mapDispatchToProps)(DashboardNFTCard);
