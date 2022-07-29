import { useRouter } from "next/router";
import React, { useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";
import ItemDetailsDescription from "./ItemDetailsDescription";
import ItemDetailsHistory from "./ItemDetailsHistory";
import ItemDetailsUser from "./ItemDetailsUser";
import { toast } from "react-toastify";
import API from "../../services/API";
import Loading from "../Loading/Loading";
import CollectiblesList from "../Collection/CollectiblesList";
import { getAllUserMediaDetails } from "../../redux/actions/user";
import { debounce } from "lodash";
import Tabs from "./Tabs";
import Asset from "../Image/Asset";

const ItemDetailsArea = ({ userinfo, getAllUserMediaDetails }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState({});
  const tokenId = router?.query?.tokenId;
  const [userMedia, setuserMedia] = useState({});
  const [whishList, setwhishList] = useState({});
  const [selectedDeal, setselectedDeal] = useState({});
  const { user } = userinfo;

  useEffect(() => {
    setuserMedia(userinfo?.userMediaDetails);
    setwhishList(userinfo?.wishlistDetails);
  }, [userinfo?.userMediaDetails]);

  useEffect(async () => {
    if (router?.asPath == "asset") {
      setIsLoading(false);
    } else if (tokenId) {
      setIsLoading(true);
      fetchTokenDetails(tokenId);
    }
  }, [tokenId]);

  const updateLike = (data) => {
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
    let _new = !userMedia[token.tokenId];
    const _currentCount = (token.likeCount += _new ? 1 : -1);
    setuserMedia({ ...userMedia, [token.tokenId]: _new });
    setToken({ ...token, likeCount: _currentCount <= 0 ? 0 : _currentCount });
    debouncedProfiles({
      walletAddress: user?.walletAddress,
      signature: user?.signature,
      tokenId: token?.tokenId,
      action: {
        status: _new,
      },
      type: "like",
    });
  };

  const _handleSaveButton = () => {
    if (!user?.walletAddress) return;
    let _new = !whishList[token.tokenId];
    setwhishList({ ...whishList, [token.tokenId]: _new });
    debouncedProfiles({
      walletAddress: user?.walletAddress,
      signature: user?.signature,
      tokenId: token?.tokenId,
      action: {
        status: _new,
      },
      type: "wishlist",
    });
  };

  const fetchTokenDetails = async (tokenId) => {
    try {
      setIsLoading(true);
      const token = await API.getCollectible(tokenId);
      setIsLoading(false);
      if (token) setToken(token);
      else toast.error("Invalid Token ID");
    } catch (error) {
      setIsLoading(false);
      router.push("/404");
      toast.error("Invalid Token ID");
    }
  };

  return isLoading ? (
    <div className="text-center mt-5" style={{ marginBottom: "200px" }}>
      <Loading />
    </div>
  ) : (
    <>
      <div className="item-details-area m-4">
        <div className="row justify-content-between">
          <div
            className="col-lg-6 complete-center"
            style={{ justifyContent: "normal" }}
          >
            <div style={{ justifyContent: "center", display: "flex" }}>
              <div className="item-details-img">
                {userMedia && (
                  <span
                    className={
                      userMedia[token?.tokenId]
                        ? "like-btn-active"
                        : "like-btn-inactive"
                    }
                    onClick={() => _handleLikeButton()}
                    role="button"
                  >
                    <i className={"ri-heart-line"}></i> {token?.likeCount || ""}
                  </span>
                )}
                <Asset
                  type={token?.metaData?.type || "image"}
                  imageSrc={
                    process.env.NEXT_PUBLIC_IMAGE_URL +
                    "images/" +
                    token?.metaData?.preview
                  }
                  thumbnail={
                    process.env.NEXT_PUBLIC_IMAGE_URL +
                    "images/" +
                    token?.metaData?.preview
                  }
                  videoSrc={[
                    process.env.NEXT_PUBLIC_IMAGE_URL +
                      "images/" +
                      token?.metaData?.preview,
                  ]}
                  objectFit="cover"
                  controls={true}
                />
                {/* <img
                  src={
                    token?.metaData?.preview ||
                    "../images/Item-details/Item-details1.jpg"
                  }
                  alt="Images"
                /> */}
              </div>
            </div>
            <div className="w-100">
              {token.nftType === "timed-auction" && (
                <ItemDetailsUser
                  token={token}
                  fetchTokenDetails={fetchTokenDetails}
                />
              )}
              <ItemDetailsHistory token={token} />
            </div>
          </div>

          <div className="col-lg-5">
            <div className="item-details-dsce">
              <ItemDetailsDescription
                token={token}
                whishList={whishList}
                fetchTokenDetails={fetchTokenDetails}
                handleSaveButton={_handleSaveButton}
                updatesetselectedDeal={setselectedDeal}
              />
            </div>
          </div>
        </div>

        {/* <Tabs token={{ ...token, ...selectedDeal }} /> */}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userinfo: state.user,
  };
};

const mapDispatchToProps = { getAllUserMediaDetails };
export default connect(mapStateToProps, mapDispatchToProps)(ItemDetailsArea);
