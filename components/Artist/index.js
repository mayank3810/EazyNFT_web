import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { debounce } from "lodash";

import { walletShotener } from "../../utils/wallet";
import { getFollowers } from "../../redux/actions/user";
import { useRouter } from "next/router";
import API from "../../services/API";
import Tabs from "./Tabs";
import Link from "next/link";

function index(props) {
  const [userDetails, setuserDetails] = useState({});
  const [isLoading, setisLoading] = useState(false);
  const [nftCount, setnftCount] = useState({});
  const [userFollow, setuserFollow] = useState({});
  const { query } = useRouter();
  const { artist } = query;
  const { followers, following = {}, user } = props.userinfo;

  useEffect(() => {
    if (artist) {
      getUserProfile();
      props.getFollowers(user?.walletAddress);
      handleUserFollow(artist);
      handleUserNFTCount();
    }
  }, [artist]);

  const handleUserFollow = async (artist) => {
    let result = await API.getUserFollowCount(artist);
    setuserFollow(result?.data || {});
  };

  const handleUserNFTCount = async () => {
    let result = await API.getUserNFTCount(artist);
    setnftCount(result?.data || {});
  };

  const getUserProfile = async () => {
    const response = await API.getUserProfile(artist);
    setuserDetails(response?.data);
  };

  const copyLink = (value) => {
    const el = document.createElement("textarea");
    el.value = value;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    toast.success("Address copied");
  };

  const updateFollowers = ({ userWallet, action, walletAddress }) => {
    if (isLoading) return;
    let data = {
      userWallet,
      action,
    };
    setisLoading(true);
    API.updateUserFollowers(data)
      .then((response) => {
        handleUserFollow(userWallet);
        props.getFollowers(walletAddress);
        setisLoading(false);
      })
      .catch((error) => {});
  };

  const debouncedFollowers = useCallback(
    debounce((value) => updateFollowers(value), 0),
    []
  );

  const handleFollowing = () => {
    debouncedFollowers({
      userWallet: artist,
      action: {
        status: !following[artist],
      },
      walletAddress: user?.walletAddress,
    });
  };

  return (
    <div>
      <div className="cover-container">
        <img src={userDetails?.coverPic} className="img-100" />
      </div>
      <div className="artist-detail-section">
        <div className="row">
          <div className="col-lg-3">
            <div className="artist-detail-section-wrapper">
              <div className="artist-avatar-warpper d-flex justify-content-center">
                <div className="artist-avatar position-relative">
                  {user?.walletAddress === artist && (
                    <Link href="/profile">
                      <div className="artist-update-button complete-center text-light">
                        <i class="ri-settings-line" />
                      </div>
                    </Link>
                  )}
                  <img
                    src={userDetails?.profilePic}
                    className="img-100"
                    style={{ borderRadius: "50%", overflow: "hidden" }}
                  />
                </div>
              </div>
              <div>
                <div className="artist-name">@{userDetails?.name}</div>
                <div>
                  <div
                    className="artist-address mt-1"
                    onClick={() => copyLink(userDetails?.walletAddress)}
                  >
                    <span className="eth-logo complete-center">
                      <img src="../images/icons/ethRed.png" />
                    </span>
                    {walletShotener(userDetails?.walletAddress)}
                  </div>
                </div>
              </div>
              <div className="follow-btn">
                <button
                  className="default-btn border-radius-5 w-100"
                  // onClick={handleFollowing}
                >
                  {following[artist] ? "Unfollow" : "Follow"}
                </button>
              </div>
              <div className="mt-5 text-center">
                <img src="/images/icons/web-white.png" role="button" />
                <img
                  src="/images/icons/discord-white.png"
                  className="ml-3"
                  role="button"
                />
                <img
                  src="/images/icons/twitter-white.png"
                  className="ml-3"
                  role="button"
                />
                <img
                  src="/images/icons/menu-white.png"
                  className="ml-3"
                  role="button"
                />
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="profile-description-title">About</div>
            <div className="profile-description-value">
              {userDetails?.aboutUser}
            </div>
          </div>
          <div className="col-lg-4">
            <div className="profile-d-section">
              <div className="row profile-d-section-top">
                <div className="col-5">
                  <div className="img">
                    <img src={userDetails?.profilePic} className="img-100" />
                  </div>
                  <div className="artist-name">@{userDetails?.name}</div>
                </div>
                <div className="col-7">
                  <div>
                    <button
                      className="default-btn border-radius-5 w-100"
                      // onClick={handleFollowing}
                    >
                      {following[artist] ? "Unfollow" : "Follow"}
                    </button>
                  </div>
                  <div>
                    <div className="row mt-4">
                      <div className="col-6">
                        <div>
                          <b>{nftCount?.created}</b>
                        </div>
                        <div>Created</div>
                      </div>
                      <div className="col-6">
                        <div>
                          <b>{nftCount?.owned}</b>
                        </div>
                        <div>Owned</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row profile-d-section-bottom">
                <div className="col-12 row text-center">
                  <div className="col-6">
                    <b>{userFollow?.following}</b>
                    <div>Following</div>
                  </div>
                  <div className="col-6">
                    <b>{userFollow?.followers}</b>
                    <div>Followers</div>
                  </div>
                </div>
                {/* <div className="col-4 d-flex">
                  <div className="profile-d-section-btn-wrapper complete-center">
                    <img src="../images/icons/download.png" role="button" />
                  </div>
                  <div className="profile-d-section-btn-wrapper complete-center ml-2">
                    <img
                      src="../images/icons/artistMenu.png"
                      role="button"
                      style={{ transform: "rotate(90deg)", height: "15px" }}
                    />
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        {artist && <Tabs />}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    main: state.main,
    userinfo: state.user,
    collectibles: state.collectibles,
  };
};

const mapDispatchToProps = { getFollowers };
export default connect(mapStateToProps, mapDispatchToProps)(index);
