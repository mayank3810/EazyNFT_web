import React, { useState, useEffect, useCallback } from "react";
import Pagination from "../Common/Pagination";
import DiscoverTopbar from "./DiscoverTopbar";
import { connect } from "react-redux";
import API from "../../services/API";
import { toast } from "react-toastify";
import Loading from "../Loading/Loading";
import NFTCard from "../../components/NFTCard/NFTCard";
import { debounce } from "lodash";

const DiscoverArea = (props) => {
  const [list, setlist] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [page, setpage] = useState(0);
  const [lastPage, setlastPage] = useState(0);
  const [filterSection, setfilterSection] = useState({});
  const [filterData, setfilterData] = useState({
    categories: [],
    currentOwner: [],
  });

  useEffect(() => {
    API.getFilterInfo()
      .then((response) => {
        setfilterData(response?.data);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.msg);
      });
  }, []);

  useEffect(() => {
    debounceCollectiables({ page, filterSection });
  }, [page, filterSection]);

  const debounceCollectiables = useCallback(
    debounce((q) => getAllCollectiables(q), 500),
    []
  );

  const getAllCollectiables = ({ page, filterSection }) => {
    let data = {
      page,
      ...filterSection,
    };
    window.scroll(0, 0);
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
    setfilterSection(params);
  };

  return (
    <>
      <div className="discover-area pb-20">
        <div className="section-title">
          <h2 style={{"display" : "inline"}}>All NFTs</h2>
          <a style={{"float" : "right"}} href="/create" className="default-btn btn pull-right" >Create New</a>
        </div>
        <div className="row pt-45" style={{"width" : "100%"}}>
          <div className="col-lg-12">
            <DiscoverTopbar
              handleChange={handleFilters}
              filterData={filterData}
            />
          </div>
          {isLoading ? (
            <div className="mt-5 mb-5 text-center">
              <Loading />
            </div>
          ) : (
            <div className="col-lg-12">
              <div className="row">
                {list.map((value, index) => (
                  <div key={index} className="col-lg-3 col-md-6">
                    <NFTCard token={value} />
                  </div>
                ))}
                {!isLoading && !!list.length && lastPage > 1 && (
                  <Pagination
                    onChange={handlePage}
                    page={page}
                    lastPage={lastPage}
                  />
                )}
                {!list.length && (
                  <div className="tabs_item">
                    <div className="row">
                      <div className="col-12">
                        <div className="error-area ptb-100">
                          <div className="d-table">
                            <div className="d-table-cell">
                              <div className="error-content">
                                <h3>No NFT Found</h3>
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
          )}
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
export default connect(mapStateToProps, mapDispatchToProps)(DiscoverArea);
