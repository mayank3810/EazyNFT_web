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
  const [collection, setcollection] = useState({});
  const [isLoading, setisLoading] = useState(false);
  const router = useRouter();
  const { query } = router;
  const { owner } = query;
  const { user } = props.userinfo;

  useEffect(async () => {
    if (router?.asPath == "/collection") {
      toast.error("Collection name is missing");
      router.push("/404");
    } else if (owner) {
      getAllCollectiable(owner);
    }
  }, [owner]);

  const getAllCollectiable = (owner) => {
    if (isLoading) return;
    let data = {
      name: owner,
    };
    window.scroll(0, 0);
    setisLoading(true);
    API.getCollection(data)
      .then((response) => {
        setcollection(response?.data);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.msg);
        // router.push("/404");
      })
      .finally((f) => {
        setisLoading(false);
      });
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
    <div>
      <div className="cover-container">
        <img src={collection?.banner} className="img-100" />
      </div>
      <div className="artist-detail-section">
        <div className="row">
          <div className="col-lg-3">
            <div className="artist-detail-section-wrapper">
              <div className="artist-avatar-warpper d-flex justify-content-center">
                <div className="artist-avatar position-relative">
                  {user?.owner === owner && (
                    <Link href={`edit-collection?name=My%20collection2`}>
                      <div className="artist-update-button complete-center text-dark">
                        <i class="ri-settings-line" />
                      </div>
                    </Link>
                  )}
                  <img
                    src={collection?.logo}
                    className="img-100"
                    style={{ borderRadius: "50%", overflow: "hidden" }}
                  />
                </div>
              </div>
              <div>
                <div className="artist-name">{collection?.name}</div>
                {/* <div>
                  <div
                    className="artist-address mt-2"
                    onClick={() => copyLink(collection?.owner)}
                  >
                    <span className="eth-logo complete-center">
                      <img src="../images/icons/ethRed.png" />
                    </span>
                    {walletShotener(collection?.owner)}
                  </div>
                </div> */}
              </div>
              {/* <div className="mt-5 text-center">
                {collection?.socialmedia?.websiteURL && (
                  <a
                    href={collection?.socialmedia?.websiteURL}
                    target={"_blank"}
                  >
                    <img src="/images/icons/web-white.png" role="button" />
                  </a>
                )}
                {collection?.socialmedia?.discord && (
                  <a href={collection?.socialmedia?.discord} target={"_blank"}>
                    <img
                      src="/images/icons/discord-white.png"
                      className="ml-3"
                      role="button"
                    />
                  </a>
                )}
                {collection?.socialmedia?.twitter && (
                  <a href={collection?.socialmedia?.twitter} target={"_blank"}>
                    <img
                      src="/images/icons/twitter-white.png"
                      className="ml-3"
                      role="button"
                    />
                  </a>
                )}
               
              </div> */}
            </div>
          </div>
          <div className="col-lg-1"></div>
          <div className="col-lg-8">
            <div className="profile-description-title">About</div>
            <div className="profile-description-value">
              {collection?.description}
            </div>
          </div>
        </div>
        {owner && <Tabs collection={collection} />}
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
