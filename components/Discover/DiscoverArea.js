import React, { useState, useEffect, useCallback } from "react";
import Pagination from "../Common/Pagination";
import DiscoverTopbar from "./DiscoverTopbar";
import { connect } from "react-redux";
import API from "../../services/API";
import { toast } from "react-toastify";
import Loading from "../Loading/Loading";
import NFTCard from "../../components/NFTCard/NFTCard";
import { debounce } from "lodash";
import Moment from "moment";
import Link from "next/link";

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
      <div className="container discover-area pt-4">
        <div className="section-title">
          <h2 style={{ display: "inline" }}>All Tags</h2>
          <a
            style={{ float: "right" }}
            href="/create"
            className="default-btn btn pull-right"
          >
            Add new tag
          </a>
        </div>
        {isLoading ? (
          <div className="mt-5 mb-5 text-center">
            <Loading />
          </div>
        ) : (
          <table className="mt-5">
            <thead>
              <tr>
                <th>Virtual Image</th>
                <th>Tag </th>
                <th>Manufacture</th>
                <th style={{ width: "120px" }}>Status</th>
                <th>Owner</th>
                <th>Blockchain</th>
                <th style={{ width: "120px" }}>Price</th>
                <th style={{ width: "100px", paddingRight: "20px" }}>Detail</th>
              </tr>
            </thead>
            <tbody>
              {list.map((value, index) => (
                <tr className="tag-details">
                  <td>
                    <img
                      src={
                        process.env.NEXT_PUBLIC_IMAGE_URL +
                        "images/" +
                        value?.metaData?.preview
                      }
                      style={{ width: "100px" }}
                    />
                  </td>
                  <td>
                    <div className="details">
                      <span>Name</span> {value.title}
                    </div>
                    <div className="details">
                      <span>Serial</span> {value.tokenId}{" "}
                    </div>
                  </td>
                  <td>
                    <div className="details">
                      <span> on</span> {}
                    </div>
                    <div className="details">
                      <span> by</span> NIKE India
                    </div>
                    <div className="details">
                      <span> expiry</span> NEVER
                    </div>
                  </td>
                  <td>
                    <label className="minted-success">{value.status}</label>
                  </td>
                  <td>
                    <div className="details">
                      <span> Resale</span> Possible
                    </div>
                    <div className="details">
                      <span> Now</span> Manish Gautam
                    </div>
                    <div className="details">
                      <span> Past</span> Mayank Gautam
                    </div>
                  </td>
                  <td>
                    <div className="details">
                      <span> Verify</span>{" "}
                      <button className="btn btn-xs-gold">
                        {" "}
                        on Blockchain
                      </button>
                    </div>
                    <div className="details">
                      <span> Chain</span> Polygon
                    </div>
                    <div className="details">
                      <span> Address</span> 0x00251...
                    </div>
                  </td>
                  <td>{value.price && "ETH"}</td>
                  <td>
                    <Link href={"/asset/" + value.tokenId}>
                      <a className="btn-icon-only">
                        <i class="ri-arrow-right-s-line"></i>
                      </a>
                    </Link>
                  </td>
                </tr>
              ))}
              {!isLoading && !!list.length && lastPage > 1 && (
                <tr style={{ background: "transparent" }}>
                  <Pagination
                    onChange={handlePage}
                    page={page}
                    lastPage={lastPage}
                  />
                </tr>
              )}
            </tbody>
          </table>
        )}
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
