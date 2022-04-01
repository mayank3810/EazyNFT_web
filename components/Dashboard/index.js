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
  const [nftCount, setnftCount] = useState({});
  const { user } = props?.userinfo;
  const artist = user?.walletAddress;

  useEffect(() => {
    if (artist) {
      handleUserNFTCount();
    }
  }, [artist]);

  const handleUserNFTCount = async () => {
    let result = await API.getUserNFTCount(artist);
    setnftCount(result?.data || {});
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

  return (
    <div className="artist-detail-section dashboard-detail-section">
      <div className="row mb-5">
        <div className="col-lg-3">
          <div className="artist-detail-section-wrapper" style={{ top: 0 }}>
            <div className="custom-heading" style={{ marginLeft: "45px" }}>
              <h1 className="mb-4">Dashboard</h1>
              <span className="">
                <img
                  src="/images/icons/ethRed.png"
                  style={{ height: "12px", width: "10px" }}
                />
              </span>
              <span
                className="f-14 ml-3"
                role="button"
                onClick={() => copyLink(artist)}
              >
                {walletShotener(artist)}
              </span>
            </div>
          </div>
        </div>
      </div>
      {artist && <Tabs />}
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
