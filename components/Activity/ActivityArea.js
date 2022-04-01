import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import moment from "moment";

import Pagination from "../Common/Pagination";
import ActivitySidebar from "./ActivitySidebar";
import API from "../../services/API";
import Loading from "../Loading/Loading";
import Link from "next/link";
import Asset from "../Image/Asset";

const ActivityArea = (props) => {
  const [filter, setfilter] = useState({ search: "", selectedCategory: [] });
  const [isLoading, setisLoading] = useState(true);
  const [page, setpage] = useState(0);
  const [lastPage, setlastPage] = useState(0);
  const [list, setlist] = useState([]);
  const [filterData, setfilterData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    API.getFilterInfo({ isDrop: true })
      .then((response) => {
        setfilterData(response?.data?.categories);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.msg);
      });
  }, []);

  const handleUpdateFilter = (object) => {
    setfilter(object);
  };

  const getAllDrops = ({ page, filterSection }) => {
    let data = {
      page,
      ...filterSection,
    };
    window.scroll(0, 0);
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

  useEffect(() => {
    let obj = { filter: { isDrop: true } };
    if (filter?.search) {
      obj["filter"]["title"] = { $regex: `${filter?.search}`, $options: "i" };
    }
    if (filter?.selectedCategory?.length) {
      obj["filter"]["categories.key"] = { $in: filter?.selectedCategory };
    }
    getAllDrops({ page, filterSection: obj });
  }, [filter, page]);

  return (
    <>
      <div className="activity-area pt-150 pb-70">
        <div className="container">
          <div className="section-title">
            <h2>Drops</h2>
          </div>

          <div className="row pt-45">
            <div className="col-lg-9">
              <div className="row justify-content-center">
                {!list.length && isLoading && (
                  <div className="col-lg-12">
                    <Loading />
                  </div>
                )}
                {list.map((value, index) => (
                  <div key={index} className="col-lg-12">
                    <div className="activity-card">
                      <div className="activity-img" role="button">
                        <Link href={`/asset/${value?.tokenId}`}>
                          <Asset
                            type={value?.metaData?.type || "image"}
                            imageSrc={value?.metaData?.preview}
                            thumbnail={value?.metaData?.preview}
                            videoSrc={[value?.metaData?.preview]}
                            objectFit="cover"
                            id={`activity_drop_${value?.metaData?.preview}`}
                          />
                        </Link>
                      </div>

                      <div className="activity-content">
                        <p>
                          <i className="ri-calendar-2-line"></i>{" "}
                          {moment(value?.onSaleAt).format("DD MMMM YYYY")}
                        </p>
                        <span>
                          <i className="ri-time-line"></i>{" "}
                          {moment(value?.onSaleAt).format("hh:mm A")}
                        </span>
                      </div>

                      <div className="activity-into">
                        <h3
                          role="button"
                          onClick={() =>
                            router.push(`/asset/${value?.tokenId}`)
                          }
                        >
                          {value?.title}
                        </h3>
                        <span>
                          Listed By{" "}
                          <b
                            role="button"
                            onClick={() =>
                              router.push(
                                `/artist/${value?.createdBy[0]?.walletAddress}`
                              )
                            }
                          >
                            @{value?.createdBy?.[0]?.name}
                          </b>
                          {/* For <b>230 ETH</b> Each */}
                        </span>
                      </div>

                      {/* <div className="activity-btn">
                        <i className="ri-delete-bin-4-line"></i>
                      </div> */}
                    </div>
                  </div>
                ))}

                {!isLoading && !!list.length && lastPage > 1 && (
                  <Pagination
                    onChange={setpage}
                    page={page}
                    lastPage={lastPage}
                  />
                )}

                {!isLoading && !list.length && (
                  <div className="tabs_item">
                    <div className="row">
                      <div className="col-12">
                        <div className="error-area ptb-100">
                          <div className="d-table">
                            <div className="d-table-cell">
                              <div className="error-content">
                                <h3>No Drop Found</h3>
                                <p>
                                  Try different filters. Start selling today!
                                </p>
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

            <div className="col-lg-3">
              <ActivitySidebar
                filterData={filterData}
                updateFilter={handleUpdateFilter}
              />
            </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(ActivityArea);
