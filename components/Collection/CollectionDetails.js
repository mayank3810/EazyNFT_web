import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Pagination from "../Common/Pagination";
import { connect } from "react-redux";
import Link from "next/link";
import API from "../../services/API";
import { toast } from "react-toastify";
import Loading from "../Loading/Loading";
// import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import styled from "styled-components";
import CollectiblesList from "./CollectiblesList";

const Wrapper = styled.div`
  .collection-banner-img {
    height: 250px;
    width: 100%;
    border-radius: 15px;
  }
  .banner-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 15px;
  }
  .collection-logo-img {
    height: 160px;
    width: 160px;
    display: inline-block;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border: 4px solid white;
      border-radius: 50%;
      margin-top: -15px;
    }
  }
  .description-container {
    display: flex;

    .description-wrapper {
      margin-top: 20px;
      margin-left: 20px;
      max-width: calc(100% - 220px);
      width: calc(100% - 220px);
    }
  }
  .collection-description-text {
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* number of lines to show */
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .involved-card .social-link li a i {
    width: 32px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    font-size: 16px;
    color: var(--yellowColor);
    background-color: #f14d5d15;
    -webkit-transition: var(--transition);
    transition: var(--transition);
    display: inline-block;
    border-radius: 50px;
  }

  .form-control-collection {
    text-align: center;
    border: solid 1px #ccc;
    font-size: 14px;
    padding: 10px 5px;
    border-radius: 21px;
  }
  .artist-detail-section {
    background: #f8f8f8;
    box-shadow: 0 -13px 20px -16px rgb(0 0 0 / 30%);
    border-radius: 80px 80px 0 0;
    margin-top: -70px;
    position: relative;
    padding: 51px 7.8%;
  }
`;

const CollectionDetails = (props) => {
  // const { library, account } = useActiveWeb3React();
  const router = useRouter();
  const [collection, setcollection] = useState({});
  const [sort, setsort] = useState(2);
  const userHash = props?.userinfo?.allUsersHash || {};
  const user = props?.userinfo?.user;
  const [isLoading, setisLoading] = useState(false);
  const name = router?.query?.owner;

  useEffect(async () => {
    if (router?.asPath == "/collection") {
      toast.error("Collection name is missing");
      router.push("/404");
    } else if (name) {
      getAllCollectiable(name);
    }
  }, [name]);

  const getAllCollectiable = (name) => {
    if (isLoading) return;
    let data = {
      name,
    };
    window.scroll(0, 0);
    setisLoading(true);
    API.getCollection(data)
      .then((response) => {
        setcollection(response?.data);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.msg);
        router.push("/404");
      })
      .finally((f) => {
        setisLoading(false);
      });
  };

  return (
    <Wrapper>
      <div className="cover-container">
        <img src={collection?.banner} className="img-100" />
      </div>

      <div className="artist-detail-section">
        <div className="container">
          <div className="row">
            <div className="col-md-2 text-center">
              <div className="collection-logo-img">
                <img src={collection?.logo} />
              </div>
              <div className="text-center">{collection?.name}</div>
            </div>
            <div className="col-md-8">
              <div className="section-title mb-5 text-center">
                <div className="title-gradient2 title-h2 mb-4">
                  {collection?.name}
                </div>
              </div>
              <div className="text-center">
                <div className="rounded-corner-collection">
                  <div className="row">
                    {/* <div className="col-md-4">
                      <div className="text-shad">Owned By</div>
                      <div className="mt-2">
                        {userHash[collection.owner]?.name}
                      </div>
                    </div> */}
                    <div className="col-md-6">
                      <div className="text-shad">Floor Price</div>
                      <div className="mt-2"> - </div>
                    </div>
                    <div className="col-md-6">
                      <div className="text-shad">Total Sales</div>
                      <div className="mt-2"> - </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <div className="social-media-collection my-colle">
                <div
                  className="involved-card m-0 d-flex"
                  style={{
                    textAlign: "inherit",
                    display: "inline-block",
                    float: "right",
                  }}
                >
                  <ul
                    className="social-link"
                    style={{ backgroundColor: "transparent", padding: 0 }}
                  >
                    {collection?.socialmedia?.websiteURL && (
                      <li>
                        <a
                          href={collection?.socialmedia?.websiteURL}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="ri-global-fill"></i>
                        </a>
                      </li>
                    )}

                    {collection?.socialmedia?.facebook && (
                      <li>
                        <a
                          href={collection?.socialmedia?.facebook}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="ri-facebook-fill"></i>
                        </a>
                      </li>
                    )}
                    {collection?.socialmedia?.instagram && (
                      <li>
                        <a
                          href={collection?.socialmedia?.instagram}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="ri-instagram-fill"></i>
                        </a>
                      </li>
                    )}
                    {collection?.socialmedia?.medium && (
                      <li>
                        <a
                          href={collection?.socialmedia?.medium}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="ri-medium-fill"></i>
                        </a>
                      </li>
                    )}
                    {collection?.socialmedia?.telegram && (
                      <li>
                        <a
                          href={collection?.socialmedia?.telegram}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="ri-telegram-fill"></i>
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-md-2">
              <div>Created by</div>
              <div className="created-by-circle">
                <img
                  src={
                    user?.profilePic || "../images/featured/featured-user2.jpg"
                  }
                  alt="Images"
                  style={{ height: "30px", width: "30px", borderRadius: "50%" }}
                />
                <span style={{ fontSize: "12px" }}>
                  {userHash[collection.owner]?.name}
                </span>
              </div>
            </div>
            <div className="col-md-8 text-left">{collection?.description}</div>
            <div className="col-md-2">
              <select
                className="form-select form-control-collection form-control"
                value={sort}
                onChange={(e) => setsort(e?.target?.value)}
              >
                <option value={0}>Price: Low to High</option>
                <option value={1}>Price: High to Low</option>
                <option value={2}>Recently Listed</option>
                <option value={3}>Oldest</option>
                <option value={4}>Most Viewed</option>
              </select>
            </div>
          </div>
        </div>
        <div className="container">
          {isLoading ? (
            <div className="mt-5 mb-5 text-center">
              <Loading />
            </div>
          ) : (
            <div>
              <div className="mt-4 pt-70">
                <CollectiblesList name={name} hideSort={true} sort={sort} />
              </div>
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    main: state.main,
    userinfo: state.user,
    collectibles: state.collectibles,
  };
};

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(CollectionDetails);
