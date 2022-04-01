import React, { useState, useEffect } from "react";
import Pagination from "../Common/Pagination";
import { connect } from "react-redux";
import Link from "next/link";
import API from "../../services/API";
import { toast } from "react-toastify";
import Loading from "../Loading/Loading";
import NFTCard from "../NFTCard/NFTCard2";

const CollectiblesList = (props) => {
  const [list, setlist] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [page, setpage] = useState(0);
  const [lastPage, setlastPage] = useState(0);
  const [sort, setsort] = useState(props?.hideSort ? 4 : 2);
  const sortOperations = [
    { price: 1 },
    { price: -1 },
    { createdAt: -1 },
    { createdAt: 1 },
    { totalViews: -1 },
  ];

  useEffect(() => {
    getAllCollectiables();
  }, [page, sort, props?.avoidTokenId]);

  useEffect(() => {
    if (props.sort) {
      setsort(props.sort);
    }
  }, [props.sort]);

  const getAllCollectiables = () => {
    const filter = { collectionName: props.name };
    if (props?.avoidTokenId) {
      filter["tokenId"] = { $ne: props?.avoidTokenId };
    }
    let data = {
      page,
      filter,
      sort: sortOperations[sort],
      perPage: props.hideSort ? 8 : 12,
    };
    setisLoading(true);
    API.getAllCollectiables(data)
      .then((response) => {
        setlist(response?.data?.result);
        setlastPage(Math.ceil(response?.data?.total / 12));
      })
      .catch((error) => {
        toast.error(error?.response?.data?.msg);
      })
      .finally((f) => {
        setisLoading(false);
      });
  };

  const handlePage = (page) => {
    if (isLoading) return;
    setpage(page);
  };

  const handleFilters = (params) => {
    // setfilterSection(params);
  };

  return (
    <>
      <div className="discover-area pb-70">
        <div className="container">
          <div className="row">
            {isLoading ? (
              <div className="mt-5 mb-5 text-center">
                <Loading />
              </div>
            ) : (
              <div className="col-lg-12">
                {props.showMoreTitle && !!list.length && (
                  <div className="section-title mb-5">
                    <h3 style={{ display: "inline", fontSize: "26px" }}>
                      More From This Collection{" "}
                    </h3>
                    <Link href={`/collection/${props.name}`}>
                      <button
                        className="default-btn btn-sm border-radius-50"
                        style={{ float: "right", padding: "9px 15px 4px" }}
                      >
                        View All
                      </button>
                    </Link>
                  </div>
                )}
                {!(props?.hideSort || !list?.length) && (
                  <div className="row">
                    <div style={{ marginLeft: "auto" }} className="col-4">
                      <div className="side-bar-widget">
                        <h3 className="title">Sort By</h3>
                        <div className="form-group select-group">
                          <select
                            className="form-select form-control"
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
                  </div>
                )}

                <div className="row">
                  {list.map((value, index) => (
                    <div className="col-lg-3 col-md-6">
                      <NFTCard value={value} index={index} />
                    </div>
                  ))}
                  {!isLoading && !!list.length && lastPage > 1 && (
                    <Pagination
                      onChange={handlePage}
                      page={page}
                      lastPage={lastPage}
                    />
                  )}

                  {!list.length && props.page != "detail" && (
                    <div className="tabs_item">
                      <div className="row">
                        <div className="col-12">
                          <div className="error-area ptb-100">
                            <div className="d-table">
                              <div className="d-table-cell">
                                <div className="error-content">
                                  <h3>No NFT Found</h3>
                                  {/* <p>
                                    Try different filters. Start selling today!
                                  </p> */}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
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
export default connect(mapStateToProps, mapDispatchToProps)(CollectiblesList);
